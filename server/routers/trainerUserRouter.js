const Router = require('express')
const router = new Router()
const trainerUserController = require('../controllers/trainerUserController')

router.get('/', trainerUserController.getAll)

module.exports = router