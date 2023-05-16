const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/regUser', userController.registration)
router.post('/loginUser', userController.login)
router.get('/authUser', authMiddleware, userController.checkUser)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/:id', userController.origin)

module.exports = router