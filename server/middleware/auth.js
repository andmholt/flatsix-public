const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
    const token = req.header('X-Auth-Token')
    
    if (!token) {
        res.status(401).send({msg: 'No token; Authorization denied'})
    }

    try {
        const decrypted = jwt.verify(token, config.get('jwtSecret'))

        req.userID = decrypted.userID
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
}

module.exports = auth