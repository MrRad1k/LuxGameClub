const { User } = require('../models/models')
const ApiError = require('../error/apiError')

class RiotController {
    async auth(req, res) {
        const appCallbackUrl = process.env.API_URL + "/" + process.env.RIOT_CALLBACK_URL

        const link = process.env.RIOT_AUTH_URL
            + "?redirect_uri=" + appCallbackUrl
            + "&client_id=" + process.env.RIOT_CLIENT_ID
            + "&response_type=code"
            + "&scope=openid";

        return res.redirect(link)
    }

    async callback(req, res) {

    }

    async test(req, res) {
      
    }
}

module.exports = new RiotController()