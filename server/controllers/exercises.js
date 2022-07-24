const Exercise = require('../models/exercise')

// get all exercises
const getExercises = async (req, res) => {
    // return list of exercises which have category 'chords'
    try {
        const exercises = await Exercise.find()
        console.log(exercises)
        res.json(exercises)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

// load exercise
const load = async (req, res) => {
    // find exercise by title
    try {
        const exercise = await Exercise.findOne({ title: req.params.exercise })
        res.json(exercise)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {
    getExercises,
    load,
}