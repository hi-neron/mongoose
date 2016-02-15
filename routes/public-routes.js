'use strict'

const express = require('express')
const router = express.Router()
const dbPublic = require('../db/queries/db-public.js')
const errors = require('../lib/error.js')

// Return all items
router.get('/:id?', (req, res, next) => {
  let params = req.params.id
  dbPublic.all(params, (err, projects) => {
    if (err) return res.json(err)
    if (projects.length !== 0) {
      res.json(projects)
    } else {
      res.json(errors.byCode('404'))
    }
  })
})

// Return one item or a search of tags
router.get('/one/:id', (req, res, next) => {
  let params = req.params.id
  dbPublic.oneItem({'shortTitle': params}, (err, project) => {
    if (err) return res.json(err)
    if (project) {
      res.json(project)
    } else {
      res.json(errors.byCode('404'))
    }
    // res.end()
  })
})

module.exports = router
