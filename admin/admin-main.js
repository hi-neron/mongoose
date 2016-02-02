'use strict'
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200)
  res.set('Content-type', 'application/json')
  res.end()
})

module.exports = router
