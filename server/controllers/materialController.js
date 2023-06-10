const { Material } = require('../models/models')
const ApiError = require('../error/apiError')


class MaterialController {
    async create(req, res, next) {
        try {
            const { title,  content, trainerId } = req.body
            const material = await Material.create({ title, content, trainerId })
            return res.json(material)
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }

    async getAll(req, res) {
        let { trainerId } = req.query
        let material

        if (!trainerId) {
            material = await Material.findAll()
        }

        if (trainerId) {
            material = await Material.findAll({ where: { trainerId } })
        }

        return res.json(material)
    }

    async getOne(req, res) {
        const { id } = req.params
        const material = await Material.findOne({ where: { id } })
        return res.json(material)
    }

    async delete(req, res, next) {
        try {
            let { id } = req.params
            const material = await Material.findOne({ where: { id } })
            const del = material.destroy()
            return res.json(del)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { title,  content } = req.body
            const material = await Material.findOne({ where: { id } })
            const materialUpdate = await material.update({ title, content })
            return res.json(materialUpdate)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new MaterialController()