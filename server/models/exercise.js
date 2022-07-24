const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    options: {
        type: [String],
        required: true,
    },
})

module.exports = mongoose.model('Exercise', exerciseSchema)