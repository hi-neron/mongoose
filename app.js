'use strict'
const express = require('express')
const app = express()
const admin = require('./admin/main-admin.js')
const bodyParser = require('body-parser')
const errors = require('./errors/errors-index.js')

const path = require('path')

app.use(bodyParser.json())
app.use('/admin', admin)
app.use(express.static(path.join(__dirname + '/public')))

app.use(errors.path)

// app.get('/', (req, res) => {
//   res.end('hello moto')
// })

module.exports = app
