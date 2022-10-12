const Router = require('express')
const router = new Router()
const trainerRouter = require('./trainerRouter')
const gameRouter = require('./gameRouter')
const userRouter = require('./userRouter')
const trainerUserRouter = require('./trainerUserRouter')

router.use('/trainer', trainerRouter)
router.use('/game', gameRouter)
router.use('/user', userRouter)
router.use('/trainer_user', trainerUserRouter)

module.exports = router