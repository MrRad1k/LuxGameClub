const { User } = require('../models/models')
const ApiError = require('../error/apiError')
const steam = require('../steam')

var globalid;

class SteamController {
    async redUrl(req, res) {
        const { id } = req.params
        globalid = id

        const redirectUrl = await steam.getRedirectUrl();
        return res.redirect(redirectUrl);
    }

    async auth(req, res, next) {
        try {
            const userSteam = await steam.authenticate(req);

            const user = await User.findOne({ where: { id: globalid } })
            user.update({ steamId: userSteam.steamid })

            return res.redirect(process.env.CLIENT_URL + '/user/' + globalid)
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }

    // async id(req, res) {
    //     return globalid
    // }
}

module.exports = new SteamController()