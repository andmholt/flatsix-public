const router = require('express').Router()

const auth = require('../../middleware/auth')
const { get, getLevels, setPreferences } = require('../../controllers/user')

// get user levels
router.get('/getLevels/:userID', auth, getLevels)

router.post('/setPreferences', auth, setPreferences)

module.exports = router