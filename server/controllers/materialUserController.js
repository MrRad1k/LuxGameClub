const { MaterialUser } = require('../models/models')
const ApiError = require('../error/apiError')


class MaterialUserController {
    async create(req, res, next) {
        try {
            let { materialId, userId } = req.body
            const materialuser = await MaterialUser.create({ materialId, userId })
            return res.json(materialuser)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { materialId, userId } = req.query
        let materialuser

        if (!materialId && !userId) {
            materialuser = await MaterialUser.findAll()
        }

        if (materialId && !userId) {
            materialuser = await MaterialUser.findAll({ where: { materialId } })
        }

        if (!materialId && userId) {
            materialuser = await MaterialUser.findAll({ where: { userId } })
        }

        if (materialId && userId) {
            materialuser = await MaterialUser.findAll({ where: { materialId, userId } })
        }

        return res.json(materialuser)
    }
}

module.exports = new MaterialUserController()