const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/apiError')
const { User } = require('../models/models')
const NodeMailer = require('../services/nodemailer')


const generateJwt = (id, email, user) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    )
}

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

    async origin(req, res) {
        const { id } = req.params
        const { originName } = req.body
        const user = await User.findOne({ where: { id } })
        user.update({ originName: originName })
        return res.json(user)
    }
}

module.exports = new UserController()