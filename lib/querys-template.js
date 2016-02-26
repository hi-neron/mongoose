'use strict'

const express = require('express')
const router = express.Router()
const dbGet = require('../db/queries/db-get.js')
const errors = require('../lib/error.js')
const uri = require('../lib/filters/uri.js')

function get (req, res, next) {
  let params = {}
  params.shortTitle = req.params.id
  if (!req.auth){
    params.released = true
  }
  dbGet.all(params, (err, projects) => {
    if (err) return res.json(err)
    if (projects.length !== 0) {
      res.json(projects)
    } else {
      res.json(errors.byCode('404'))
    }
  })
}

// Return one item or a search of tags
function getOne(req, res, next) {
  let params = {}
  params.shortTitle = uri.reader(req.params.id)
  if (!req.auth){
    params.released = true
  }
  dbGet.oneItem(params, (err, project) => {
    if (err) return res.json(err)
    if (project) {
      res.json(project)
    } else {
      res.json(errors.byCode('404'))
    }
    // res.end()
  })
}

module.exports = {
  'get': get,
  'getOne': getOne
}