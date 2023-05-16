const Router = require('express')
const router = new Router()
const trainerUserController = require('../controllers/trainerUserController')

router.get('/', trainerUserController.getAll)
router.post('/', trainerUserController.create)
router.delete('/delete', trainerUserController.delete)

module.exports = router