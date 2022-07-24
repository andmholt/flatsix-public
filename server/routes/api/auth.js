const router = require('express').Router()

const auth = require('../../middleware/auth')
const { logIn, load, signUp, verify } = require('../../controllers/auth')

// load user
router.get('/load', auth, load)

// log in user
router.post('/logIn', logIn)

// sign up user
router.post('/signUp', signUp)

// verify email
router.get('/verify/:verificationToken', verify)

module.exports = router