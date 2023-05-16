const Router = require('express')
const statisticController = require('../controllers/statisticController')
const router = new Router()

router.post('/', statisticController.create)
router.get('/', statisticController.getAll)
router.delete('/', statisticController.delete)

module.exports = router