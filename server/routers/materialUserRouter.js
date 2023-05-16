const Router = require('express')
const router = new Router()
const materialUserController = require('../controllers/materialUserController')

router.post('/', materialUserController.create)
router.get('/', materialUserController.getAll)

module.exports = router