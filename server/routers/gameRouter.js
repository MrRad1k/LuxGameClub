const Router = require('express')
const router = new Router()
const gameController = require('../controllers/gameController')

router.post('/', gameController.create)
router.get('/', gameController.getAll)

module.exports = router