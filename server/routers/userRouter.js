const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/regUser', userController.registration)
router.post('/loginUser', userController.login)
router.get('/authUser', authMiddleware, userController.checkUser)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.get('/auth/steam/:id', userController.redUrlSteam)
router.get('/auth/steam/authenticate/:id', userController.authSteam)
router.post('/:id', userController.origin)
router.get('/gamestatistic/:id', userController.getOneGameStatisticsUser)
router.post('/current_statistics/:id', userController.currentStatistics)

module.exports = router