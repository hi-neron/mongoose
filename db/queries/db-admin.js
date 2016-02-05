'use strict'

const Db = require('../db-main.js')
const publicDb = require('./db-public.js')
const _ = require('underscore')

function arraysPush (method, oldData, newData) {
  let array = []
  if (method === 'add') {
    array = oldData.concat(newData)
  } else {
    array = newData
  }
  return _.uniq(array)
}

function createPost (params, callback) {
  publicDb.oneItem({'title': params.title}, (err, res) => {
    if (err) return callback(err, {'error': err.body})
    if (res) return callback(err, {'error': 'Item already exists'})
    let newData = new Db(params)
    newData.save((err) => {
      if (err) return callback(err, res)
      console.log(params.title + ' Saved!')
      callback(err, params)
    })
  })
}

function updatePost (params, callback) {
  let method = params.method
  delete params.method

  publicDb.oneItem({'title': params.title}, (err, project) => {
    if (err) return callback(err, {'error': err})
    if (!project) return callback(err, {'error': 'item does not exists'})

    for (let item in params) {
      if (typeof params[item] !== 'object') {
        if (project[item] || item === 'newTitle') {
          if (item === 'newTitle') project.title = params.newTitle
          project[item] = params[item]
        } else {
          return callback({'error': `${item} invalid value`})
        }
      } else {
        if (Array.isArray(params[item])) {
          project[item] = arraysPush(method, project[item], params[item])
        } else {
          for (let sub in params[item]) {
            if (project[item][sub]) {
              if (Array.isArray(project[item][sub])) {
                project[item][sub] = arraysPush(method, project[item][sub], params[item][sub])
              } else {
                project[item][sub] = params[item][sub]
              }
            } else {
              return callback({'error': `${sub} in ${item} was an invalid value`})
            }
          }
        }
      }
    }
    project.save()
    callback(err, project)
  })
}

function deletePost (params, callback) {
  publicDb.oneItem({'title': params}, (err, project) => {
    if (err) return callback(err, {'err': err})
    if (project) {
      Db.remove({'title': project.title}, (err) => {
        if (err) return callback(err, {'err': err})
        return callback(err, params)
      })
    } else {
      callback({'error': `${params} not found`}, {'ok': 'ok'})
    }
  })
}

module.exports = {
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost
}
