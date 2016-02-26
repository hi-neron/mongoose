'use strict'

const Db = require('../db-main.js')

// Retrieve all data or list of items with a parameter
function all (params, callback) {
  if (!params.shortTitle || params.shortTitle === '') {
    delete params.shortTitle
  } else {
    params.shortTitle = {'$regex': params.shortTitle, '$options': 'i'}
  }
  Db.find(params, (err, projects) => {
    return callback(err, projects)
  })
}

// Retrieve one item
function oneItem (params, callback) {
  Db.findOne(params, (err, project) => {
    return callback(err, project)
  })
}

module.exports = {
  all: all,
  oneItem: oneItem
}
