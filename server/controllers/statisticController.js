const { Statistic } = require('../models/models')
const ApiError = require('../error/apiError')


class StatisticController {
    async create(req, res, next) {
        try {
            const { rate, materialId, userId } = req.body
            const statistic = await Statistic.create({ rate, materialId, userId })
            return res.json(statistic)
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }

    async getAll(req, res) {
        let { userId } = req.query
        let statistic

        if (!userId) {
            statistic = await Statistic.findAll()
        }

        if (userId) {
            statistic = await Statistic.findAll({ where: { userId } })
        }

        return res.json(statistic)
    }

    async delete(req, res, next) {
        try {
            let { materialId } = req.params
            const statistic = await Statistic.findOne({ where: { materialId } })
            const del = statistic.destroy()
            return res.json(del)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new StatisticController()