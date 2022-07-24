const router = require('express').Router()

const auth = require('../../middleware/auth')
const { getExercises, load } = require('../../controllers/exercises')

// get all exercises
router.get('/get', getExercises)

router.get('/load/:exercise', load)

module.exports = router