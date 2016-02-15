'use strict'

const Db = require('../db-main.js')
const publicDb = require('./db-public.js')
const _ = require('underscore')
const errors = require('../../lib/error.js')

function arraysPush (method, oldData, newData) {
  let array = []
  if (method === 'add') {
    array = oldData.concat(newData)
  } else {
    array = newData
  }
  return _.uniq(array)
}

function constructTemplate (params) {
  let newTitle = null
  if (params.newTitle) {
    newTitle = params.newTitle
  }

  let template = {
    'shortTitle': newTitle || params.shortTitle,
    'released': params.released || 'not',
    'author': params.author,
    'images': params.image || [],
    'social': params.social || [],
    'ESP': {
      'shortTitle': params.shortTitle,
      'title': params.title,
      'entrance': params.entrance,
      'content': params.content,
      'tags': params.tags || []
    },
    'ENG': {
      'shortTitle': params.en_shortTitle || params.shortTitle,
      'title': params.en_title || params.title,
      'entrance': params.en_entrance || params.entrance,
      'content': params.en_content || params.content,
      'tags': params.en_tags || params.tags || []
    }
  }
  return template
}

function createPost (params, callback) {
  publicDb.oneItem({'shortTitle': params.shortTitle}, (err, res) => { // Search item in DB
    if (err) return callback(errors.byCode('99'), null) // Unknow error
    if (res) return callback(errors.byCode('01'), null) // Already item exists in DB
    // Template
    let template = constructTemplate(params)
    let newData = new Db(template)
    newData.save((err) => {
      if (err) return callback(errors.byCode('02'), null)
      console.log(params.shortTitle + ' Saved!')
      callback(null, params)
    })
  })
}

function updatePost (params, callback) {
  let method = params.method
  delete params.method

  publicDb.oneItem({'shortTitle': params.shortTitle}, (err, project) => {
    if (err) return callback(errors.byCode('99', err.message), null)
    if (!project) return callback(errors.byCode('00'), null)

    params = constructTemplate(params)

    for (let item in params) {
      if (typeof params[item] !== 'object') {
        if (project[item]) {
          project[item] = params[item]
        } else {
          return callback(errors.byCode('11'), null)
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
              return callback(errors.byCode('11'), null)
            }
          }
        }
      }
    }

    project.save()
    callback(null, project)
  })
}

function deletePost (params, callback) {
  publicDb.oneItem({'shortTitle': params}, (err, project) => {
    if (err) return callback(errors.byCode('99', err.message), null)
    if (project) {
      Db.remove({'shortTitle': project.shortTitle}, (err) => {
        if (err) return callback(errors.byCode('99', err.message), null)
        return callback(null, params)
      })
    } else {
      callback(errors.byCode('11'), null)
    }
  })
}

module.exports = {
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost
}
