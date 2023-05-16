const { TrainerUser } = require('../models/models')
const ApiError = require('../error/apiError')


class TrainerUserController {
    async getAll(req, res) {
        let { trainerId, userId } = req.query
        let trainerUsers

        if (!trainerId && !userId) {
            trainerUsers = await TrainerUser.findAll()
        }

        if (trainerId && !userId) {
            trainerUsers = await TrainerUser.findAll({ where: { trainerId } })
        }

        if (!trainerId && userId) {
            trainerUsers = await TrainerUser.findAll({ where: { userId } })
        }

        if (trainerId && userId) {
            trainerUsers = await TrainerUser.findAll({ where: { trainerId, userId } })
        }

        return res.json(trainerUsers)
    }

    async create(req, res, next) {
        try {
            let { userId, trainerId } = req.body
            const usertrainer = await TrainerUser.create({ trainerId, userId });
            return res.json(usertrainer)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            let { trainerId, userId } = req.body
            const usertrainer = await TrainerUser.findOne({ where: { trainerId, userId  } })
            const del = usertrainer.destroy();
            return res.json(del)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TrainerUserController()