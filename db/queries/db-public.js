'use strict'

const Db = require('../db-main.js')

function all (params, callback) {
  Db.find(params, (err, projects) => {
    return callback(err, projects)
  })
}

function oneItem (params, callback) {
  Db.findOne(params, (err, project) => {
    return callback(err, project)
  })
}

module.exports = {
  all: all,
  oneItem: oneItem

}
