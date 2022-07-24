const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const connectDB = require('./config/db')

// routes
const authRoutes = require('./routes/api/auth')
const exerciseRoutes = require('./routes/api/exercises')
const userRoutes = require('./routes/api/user')

// init app, server, socket
const app = express()
const server = http.createServer(app)
const io = new Server(server)

// cors
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

// http body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// serve client build
app.use(express.static('../client/build'))

// connect db
connectDB()

// routes
app.use('/api/auth', authRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/user', userRoutes)

// init port
const port = 8080
server.listen(port, () => {
    console.log('Server listening on port', port)
})