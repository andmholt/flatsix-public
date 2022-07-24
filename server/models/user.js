const mongoose = require('mongoose')

// * ------------------------- *
// * -------- Levels -------- *
// * ------------------------- *

// keeps track of user levels data
const levelSchema = new mongoose.Schema({
    level: {
        type: Number,
        default: 1,
        required: true,
    },
    progress: {
        type: Number,
        default: 0,
        required: true,
    },
})

// * ------------------------- *
// * ------ Progression ------ *
// * ------------------------- *

// keeps track of user progression data
const notesProgressSchema = new mongoose.Schema({
    // notes available to practice with
    notes: {
        type: [Number],
        required: true,
        default: [0, 7]
    },
    // max num notes per phrase
    num: {
        type: Number,
        required: true,
        default: 2,
        min: 2,
        max: 6,
    },
})

const chordsProgressSchema = new mongoose.Schema({
    intervals: {
        type: [String],
        required: true,
        default: [],
    },
    chords: {
        type: [String],
        required: 'true',
        default: [],
    },
})

const rhythmProgressSchema = new mongoose.Schema({
    lengths: {
        type: [String],
        required: true,
        default: ['1', '1/2']
    },
    meters: {
        type: [String],
        required: true,
        default: ['4/4']
    }
})

// * ------------------------- *
// * --- Main User Schema --- *
// * ------------------------- *

// main user schema
const userSchema = new mongoose.Schema({

    // sign up data
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

    // levels
    levels: {
        overall: {
            type: levelSchema,
            required: true,
            default: {
                level: 1,
                progress: 0,
            },
        },
        notes: {
            type: levelSchema,
            required: true,
            default: {
                level: 1,
                progress: 0,
            },
        },
        chords: {
            type: levelSchema,
            required: true,
            default: {
                level: 1,
                progress: 0,
            },
        },
        rhythm: {
            type: levelSchema,
            required: true,
            default: {
                level: 1,
                progress: 0,
            },
        },
    },

    // preferences
    preferences: {
        noteNames: {
            type: String,
            required: true,
            default: 'solfege',
        },
        noteColors: {
            type: [String],
            required: true,
            default: [
                // do
                '#40b', // blue-purple

                // di/ra
                '#808', // purple

                // re
                '#fb0', // yellow-orange

                // ri/me
                '#ff0', // yellow

                // mi
                '#b04', // red-purple

                // fa
                '#8f0', //yellow-green

                // fi/se
                '#0f0', // green

                // so
                '#f00', // red

                // si/le
                '#f40', // red-orange

                // la
                '#088', // blue-green

                // li/te
                '#00f', // blue

                // ti
                '#f80', // orange
            ]
        },
    },

    // progress
    progress: {
        notes: {
            type: notesProgressSchema,
            required: true,
            default: {
                notes: [0, 7],
                num: 2,
            },
        },
        chords: {
            type: chordsProgressSchema,
            required: true,
            default: {
                intervals: [],
                chords: [],
            },
        },
        rhythm: {
            type: rhythmProgressSchema,
            required: true,
            default: {
                lengths: ['1', '1/2'],
                meters: ['4/4'],
            },
        },
    },
})

module.exports = mongoose.model('User', userSchema)