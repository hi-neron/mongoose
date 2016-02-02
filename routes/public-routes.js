'use strict'

const express = require('express')
const router = express.Router()
const dbPublic = require('../db/queries/db-public.js')

// Return all items
router.get('/', (req, res, next) => {
  dbPublic.all({}, (err, data) => {
    if (err) return res.end(err)
    res.json(data)
    res.end()
    next
  })
})

// Return one item or a search of tags
router.get('/:id', (req, res, next) => {
  let params = req.params.id
  dbPublic.oneItem({'title': params}, (err, project) => {
    if (err) return res.json(err)
    if (project) {
      res.json(project)
    } else {
      dbPublic.all({
        'title': {'$regex': params, '$options': 'i'}
      }, (err, projects) => {
        if (err) return res.json(err)
        if (projects.length !== 0) {
          console.log(projects)
          res.json(projects)
        } else {
          res.json({'error': 404})
        }
      })
    }
    // res.end()
  })
})

module.exports = router
