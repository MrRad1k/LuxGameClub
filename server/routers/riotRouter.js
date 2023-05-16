const Router = require('express')
const router = new Router()
const riotController = require('../controllers/riotController')

router.get('/', riotController.auth)
router.get('/oauth2-callback', riotController.callback)

module.exports = router