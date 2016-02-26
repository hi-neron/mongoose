'use strict'

const express = require('express')
const router = express.Router()
const queries = require('../lib/querys-template.js')

// Return all items
router.get('/:id?', queries.get)

// Return one item or a search of tags
router.get('/one/:id', queries.getOne)

module.exports = router
