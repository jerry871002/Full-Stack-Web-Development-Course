const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blog')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app