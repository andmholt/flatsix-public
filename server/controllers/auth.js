const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const sendgrid = require('@sendgrid/mail')
const { validationResult } = require('express-validator')

const User = require('../models/user')

sendgrid.setApiKey(config.get('sendgridAPIKey'))

// load user
const load = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json(errors)
    }

    // get and return user
    try {
        const user = await User.findById(req.userID)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

// log in user
const logIn = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json(errors)
    }

    const { email, password } = req.body

    // attempt to get user from db
    let user
    try {
        user = await User.findOne({ $or: [ {email: email}, {username: email} ] })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

    // create and send access token
    const accessToken = jwt.sign(
        { userID: user.id },
        config.get('jwtSecret'),
        { expiresIn: '5d' }
    )
    res.status(200).json({ token: accessToken })
}

const signUp = async (req, res) => {
    // if errors in data sent through req
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json(errors)
    }
    
    // save new user data
    const { name, username, email, password } = req.body

    // encrypt password
    let encryptedPass
    try {
        encryptedPass = await bcrypt.hash(password, 12)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

    const userData = {
        name: name,
        username: username,
        email: email,
        password: encryptedPass,
    }

    // create email verification link
    verifyLink = config.get('serverURL') + '/api/auth/verify/' + jwt.sign(userData, config.get('jwtSecret'))

    const msg = {
        to: userData.email,
        from: config.get('sendgridVerifiedSender'),
        subject: 'Verify Your Email',
        text: "Verify Your Email: " + verifyLink,
    }

    // send verification email
    try {
        await sendgrid.send(msg)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

    // success
    res.status(200).send({ msg: 'A verification email has been sent'})
}

// verify email
const verify = async (req, res) => {
    // if errors in data sent through req
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json(errors)
    }

    // get verification token from url
    const verificationToken = req.params.verificationToken

    // if token is authentic, get user data
    let userData
    jwt.verify(verificationToken, config.get('jwtSecret'), (error, decoded) => {
        if (error)
            return res.status(400).json(error)
        else {
            userData = decoded
        }
    })

    // create new user
    const newUser = new User({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
    })

    // save new data to mongo
    try {
        await newUser.save()
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

    // success
    res.status(200).send()
}

module.exports = {
    load,
    logIn,
    signUp,
    verify,
}