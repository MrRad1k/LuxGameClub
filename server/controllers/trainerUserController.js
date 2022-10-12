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
}

module.exports = new TrainerUserController()