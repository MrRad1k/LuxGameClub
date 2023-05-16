const Router = require('express')
const router = new Router()
const steamController = require('../controllers/steamController')

router.get('/auth/steam/:id', steamController.redUrl)
router.get('/auth/steam/authenticate/:id', steamController.auth)

module.exports = router