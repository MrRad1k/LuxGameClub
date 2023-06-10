const Router = require('express')
const router = new Router()
const materialController = require('../controllers/materialController')

router.post('/', materialController.create)
router.get('/', materialController.getAll)
router.get('/:id', materialController.getOne)
router.delete('/:id', materialController.delete)
router.post('/:id', materialController.update)

module.exports = router