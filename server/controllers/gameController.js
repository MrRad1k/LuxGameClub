const { Game } = require('../models/models')
const ApiError = require('../error/apiError')


class GameController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const game = await Game.create({ name })
            return res.json(game)
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }

    async getAll(req, res) {
        const games = await Game.findAll()
        return res.json(games)
    }
}

module.exports = new GameController()