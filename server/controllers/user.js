const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const User = require('../models/user')

// return user levels data
const getLevels = (req, res) => {
    // check for clean data
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json(errors)
    }

    // find user in mongo
    const userID = req.userID
    
}

const setPreferences = async (req, res) => {
    // check for clean data
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json(errors)
    }

    // find user in mongo
    try {
        await User.findByIdAndUpdate(
            req.userID,
            { $set: {
                preferences: req.body,
            }}
        )
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

    // success
    res.status(200).send()
}

module.exports = {
    getLevels,
    setPreferences,
}