const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const app = require('./app') // varsinainen Express-sovellus

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})