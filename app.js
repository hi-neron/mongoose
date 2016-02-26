'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

// Errors handler
const errors = require('./lib/error.js')

// AUTH
// const passport = require('passport')
// const twitter = require('passport-twitter')

// Administrator route
const admin = require('./admin/admin.js')

// Public rutes API
const projects = require('./routes/public-routes.js')

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// this lines need be erase
app.use((req, res, next) => {
  req.auth = true
  console.log(`door is open? ${req.auth}`)
  next()
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/projects', projects)
app.use('/admin', admin)
app.use(express.static(path.join(__dirname + '/public')))

app.use(errors.path)

// app.get('/', (req, res) => {
//   res.end('hello moto')
// })

module.exports = app
