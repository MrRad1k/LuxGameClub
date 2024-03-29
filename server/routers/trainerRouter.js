const Router = require('express')
const router = new Router()
const trainerController = require('../controllers/trainerController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/regTrainer', trainerController.registration)
router.post('/loginTrainer', trainerController.login)
router.get('/authTrainer', authMiddleware, trainerController.checkTrainer)
router.get('/', trainerController.getAll)
router.get('/:id', trainerController.getOne)
router.get('/activate/:link/:email', trainerController.activate)
router.get('/auth/steam/:id', trainerController.redUrlSteam)
router.get('/auth/steam/authenticate/:id', trainerController.authSteam)
router.post('/:id', trainerController.origin)
router.get('/gamestatistic/:id', trainerController.getOneGameStatisticsTrainer)
router.post('/current_statistics/:id', trainerController.currentStatistics)

module.exports = router