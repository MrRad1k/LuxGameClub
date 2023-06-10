require('dotenv').config()
const uuid = require('uuid')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const ApiError = require('../error/apiError')
const { Trainer, GameStatistic } = require('../models/models')
const mailService = require('../services/mailService')
const trainerAcrivate = require('../services/trainerActivate')
const mailTrainerActivate = require('../services/mailTrainerActivate')
const steam = require('../services/steamTrainer')


const generateJwt = (id, emailTrainer, isActivated) => {
    return jwt.sign(
        { id, emailTrainer, isActivated },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    )
}

var globalid;

const headers = { 'TRN-Api-Key': process.env.TRN_API_KEY }


class TrainerController {
    async registration(req, res, next) {
        try {
            const { emailTrainer, password, name, city, old, about, gameId } = req.body
            const { photo } = req.files

            let fileName = uuid.v4() + ".jpg"
            photo.mv(path.resolve(__dirname, '..', 'static', fileName))

            if (!emailTrainer || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }

            const candidate = await Trainer.findOne({ where: { emailTrainer } })

            if (candidate) {
                return next(ApiError.badRequest('Тренер с таким email уже существует'))
            }

            if (gameId == 0) {
                return next(ApiError.badRequest("Выберите игру"))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const activationLink = uuid.v4()
            const trainer = await Trainer.create({ emailTrainer, password: hashPassword, name, photo: fileName, city, old, about, gameId, activationLink })

            await mailService.sendActivationMail(`${process.env.API_URL}/api/trainer/activate/${activationLink}/${emailTrainer}`, emailTrainer, name, fileName, city, old, about)

            const token = generateJwt(trainer.id, trainer.emailTrainer, trainer.isActivated)

            if (!trainer.isActivated) {
                return next(ApiError.internal('Заявка на расмотрении'))
            } else {
                return res.json({ token })
            }
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }


    async login(req, res, next) {
        const { emailTrainer, password } = req.body
        const trainer = await Trainer.findOne({ where: { emailTrainer } })

        if (!trainer) {
            return next(ApiError.internal('Тренер не найден'))
        }

        if (!trainer.isActivated) {
            return next(ApiError.internal('Заявка на расмотрении'))
        } else {
            let comparePassword = bcrypt.compareSync(password, trainer.password)

            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }

            const token = generateJwt(trainer.id, trainer.emailTrainer, trainer.isActivated)

            return res.json({ token })
        }
    }


    async checkTrainer(req, res, next) {
        const token = generateJwt(req.trainer.id, req.trainer.emailTrainer, req.trainer.isActivated)

        if (!req.trainer.isActivated) {
            return next(ApiError.internal('Заявка на расмотрении'))
        } else {
            return res.json({ token })
        }
    }

    async getAll(req, res) {
        const { gameId } = req.query

        let trainers

        if (!gameId) {
            trainers = await Trainer.findAll()
        }

        if (gameId) {
            trainers = await Trainer.findAll({ where: { gameId } })
        }

        return res.json(trainers)
    }

    async getOne(req, res) {
        const { id } = req.params
        const trainer = await Trainer.findOne({ where: { id } })
        return res.json(trainer)
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            const email = req.params.email
            await trainerAcrivate.activate(activationLink)
            mailTrainerActivate.mailer(email)

            return res.redirect(process.env.CLIENT_URL + '/activate/' + activationLink + '/' + email)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async redUrlSteam(req, res) {
        const { id } = req.params
        globalid = id

        const redirectUrl = await steam.getRedirectUrl();
        return res.redirect(redirectUrl);
    }


    async authSteam(req, res, next) {
        try {
            const trainerSteam = await steam.authenticate(req);

            const trainer = await Trainer.findOne({ where: { id: globalid } })
            trainer.update({
                steamId: trainerSteam.steamid,
                steamName: trainerSteam.username,
                steamAvatar: trainerSteam.avatar.large
            })

            const gameStatistic = await GameStatistic.findOne({ where: { trainerId: globalid } })

            const response = await fetch('https://public-api.tracker.gg/v2/csgo/standard/profile/steam/' + trainerSteam.steamid,
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
                    trainer: globalid,
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

            return res.redirect(process.env.CLIENT_URL + '/trainer/' + globalid)
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }


    async origin(req, res, next) {
        try {
            const { id } = req.params
            const { originName } = req.body
            const trainer = await Trainer.findOne({ where: { id } })
            const gameStatistic = await GameStatistic.findOne({ where: { trainerId: id } })

            const response = await fetch('https://public-api.tracker.gg/v2/apex/standard/profile/origin/' + originName,
                { headers }
            )
            const data = await response.json();
            const statistic = data.data.segments[0].stats;

            await trainer.update({
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
                    trainerId: id,
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


    async getOneGameStatisticsTrainer(req, res, next) {
        const { id } = req.params
        const gameStatisticUser = await GameStatistic.findOne({ where: { trainerId: id } })
        return res.json(gameStatisticUser)
    }


    async currentStatistics(req, res, next) {
        try {
            const { id } = req.params
            const { originName } = req.body

            const trainer = await Trainer.findOne({ where: { id } })

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

module.exports = new TrainerController()