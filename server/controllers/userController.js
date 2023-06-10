const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')
const fetch = require('node-fetch')
const ApiError = require('../error/apiError')
const { User, GameStatistic } = require('../models/models')
const NodeMailer = require('../services/nodemailer')
const steam = require('../services/steamUser')


const generateJwt = (id, email, user) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    )
}

var globalid;

const headers = { 'TRN-Api-Key': process.env.TRN_API_KEY }


class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, name, city, old } = req.body
            const { photo } = req.files

            let fileName = uuid.v4() + ".jpg"
            photo.mv(path.resolve(__dirname, '..', 'static', fileName))

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }

            const candidate = await User.findOne({ where: { email } })

            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, password: hashPassword, name, photo: fileName, city, old })
            const token = generateJwt(user.id, user.email)

            NodeMailer.mailer(email, password)

            return res.json({ token })
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }


    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.email)

        return res.json({ token })
    }


    async checkUser(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({ token })
    }


    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }


    async getOne(req, res) {
        const { id } = req.params
        const user = await User.findOne({ where: { id } })
        return res.json(user)
    }


    async redUrlSteam(req, res) {
        const { id } = req.params
        globalid = id

        const redirectUrl = await steam.getRedirectUrl();
        return res.redirect(redirectUrl);
    }


    async authSteam(req, res, next) {
        try {
            const userSteam = await steam.authenticate(req);

            const user = await User.findOne({ where: { id: globalid } })
            await user.update({
                steamId: userSteam.steamid,
                steamName: userSteam.username,
                steamAvatar: userSteam.avatar.large
            })

            const gameStatistic = await GameStatistic.findOne({ where: { userId: globalid } })

            const response = await fetch('https://public-api.tracker.gg/v2/csgo/standard/profile/steam/' + userSteam.steamid,
                { headers }
            )

            const data = await response.json();
            const statistic = data.data.segments[0].stats;

            if (gameStatistic === null) {
                await GameStatistic.create({
                    csgoTimePlayed: statistic.timePlayed.displayValue,
                    csgoKd: statistic.kd.displayValue,
                    csgoMvp: statistic.mvp.value,
                    csgoMatchesPlayed: statistic.matchesPlayed.value,
                    csgoWlPercentage: statistic.wlPercentage.value,
                    csgoHeadshotPct: statistic.headshotPct.value,
                    userId: globalid,
                    gameId: 1
                })
            } else {
                await gameStatistic.update({
                    csgoTimePlayed: statistic.timePlayed.displayValue,
                    csgoKd: statistic.kd.displayValue,
                    csgoMvp: statistic.mvp.value,
                    csgoMatchesPlayed: statistic.matchesPlayed.value,
                    csgoWlPercentage: statistic.wlPercentage.value,
                    csgoHeadshotPct: statistic.headshotPct.value,
                })
            }

            return res.redirect(process.env.CLIENT_URL + '/user/' + globalid)
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }


    async origin(req, res, next) {
        try {
            const { id } = req.params
            const { originName } = req.body
            const user = await User.findOne({ where: { id } })
            const gameStatistic = await GameStatistic.findOne({ where: { userId: id } })

            const response = await fetch('https://public-api.tracker.gg/v2/apex/standard/profile/origin/' + originName,
                { headers }
            )

            const data = await response.json();
            const statistic = data.data.segments[0].stats;

            await user.update({
                originName: originName,
                originAvatar: data.data.platformInfo.avatarUrl
            })

            if (gameStatistic === null) {
                await GameStatistic.create({
                    apexLevel: statistic.level.value,
                    apexKills: statistic.kills.value,
                    apexRankScore: statistic.rankScore.value,
                    apexRankScoreIcon: statistic.rankScore.metadata.iconUrl,
                    apexRankScoreName: statistic.rankScore.metadata.rankName,
                    userId: id,
                    gameId: 2
                })
            } else {
                await gameStatistic.update({
                    apexLevel: statistic.level.value,
                    apexKills: statistic.kills.value,
                    apexRankScore: statistic.rankScore.value,
                    apexRankScoreIcon: statistic.rankScore.metadata.iconUrl,
                    apexRankScoreName: statistic.rankScore.metadata.rankName,
                })
            }

            return res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getOneGameStatisticsUser(req, res, next) {
        const { id } = req.params
        const gameStatisticUser = await GameStatistic.findOne({ where: { userId: id } })
        return res.json(gameStatisticUser)
    }


    async currentStatistics(req, res, next) {
        try {
            const { id } = req.params
            const { originName } = req.body

            const trainer = await User.findOne({ where: { id } })

            const responseOrigin = await fetch('https://public-api.tracker.gg/v2/apex/standard/profile/origin/' + originName,
                { headers }
            )
            const responseSteam = await fetch('https://public-api.tracker.gg/v2/csgo/standard/profile/steam/' + trainer.steamId,
                { headers }
            )

            const dataSteam = await responseSteam.json();
            const dataOrigin = await responseOrigin.json();

            return res.json({ dataOrigin, dataSteam });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()