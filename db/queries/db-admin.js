'use strict'

const Db = require('../db-main.js')
const dbGet = require('./db-get.js')
const _ = require('underscore')
const errors = require('../../lib/error.js')
const fs = require('fs-extra')

function arraysPush (method, oldData, newData) {
  let array = []
  if (method === 'add') {
    array = oldData.concat(newData)
    console.log(array)
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
    'released': params.released || false,
    'author': params.author,
    'images': params.images || [],
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

function imgBehavior (action, image, callback) {
  image[action]((err) => {
    if (err) return callback(err)
    callback(null)
  })
}

function createPost (params, callback) {
  dbGet.oneItem({'shortTitle': params.shortTitle}, (err, res) => { // Search item in DB
    if (err) return callback(errors.byCode('99', err.message), null) // Unknow error
    if (res) return callback(errors.byCode('01'), null) // Already item exists in DB
    // Template
    let template = constructTemplate(params)
    let newData = new Db(template)

    newData.save((err) => {
      if (err) return callback(errors.byCode('99', err.message), null)

      var error = null

      for (let i = 0 ; i < template.images.length; i++){
        imgBehavior('save', template.images[i], (err) => {
          if (err) {
            error = err
          }
          if (i == template.images.length - 1) {
            if (error) {
              deletePost(template.shortTitle, (err, params) => {
                if (err) error = err
              })
            }
            callback(error, template)
          }
        })
      }

    })
  })
}

function updatePost (params, callback) {
  let method = params.method
  delete params.method
  console.log(method)

  dbGet.oneItem({'shortTitle': params.shortTitle}, (err, project) => {
    if (err) return callback(errors.byCode('99', err.message), null)
    if (!project) return callback(errors.byCode('00'), null)

    let template = constructTemplate(params)

    for (let item in template) {
      if (typeof template[item] !== 'object') {
        project[item] = template[item]
      } else {
        if (Array.isArray(template[item])) {
          project[item] = arraysPush(method, project[item], template[item])
        } else {
          for (let sub in template[item]) {
            if (project[item][sub]) {
              if (Array.isArray(project[item][sub])) {
                project[item][sub] = arraysPush(method, project[item][sub], template[item][sub])
              } else {
                project[item][sub] = template[item][sub]
              }
            } else {
              return callback(errors.byCode('11'), null)
            }
          }
        }
      }
    }

    let error = null
    template.images.length

    for (let i = 0 ; i < template.images.length; i++){
      imgBehavior('save', template.images[i], (err) => {
        if (err) {
          error = err
        }
        if (i == template.images.length - 1) {
          if (error) {
            deletePost(template.shortTitle, (err, params) => {
              if (err) error = err
            })
          }
          project.save(function(err) {
            if (err) return callback(errors.byCode('99', err.message), null)
            callback(error, template)
          })
        }
      })
    }
  })
}

function deletePost (params, callback) {
  dbGet.oneItem({'shortTitle': params}, (err, project) => {
    if (err) return callback(errors.byCode('99', err.message), null)

    if (project) {
      fs.remove(project.images[0].path, (err) => {
        if (err) return callback(errors.byCode('11'), null)
        console.log(`${project.shortTitle} image dir was delete`)
      })

      Db.remove({'shortTitle': project.shortTitle}, (err) => {
        if (err) return callback(errors.byCode('99', err.message), null)
        return callback(null, params)
      })
    } else {
      callback(errors.byCode('11'), null)
    }
  })
}

function changeReleased (params, callback){
  dbGet.oneItem(params, (err, project) => {
    if (err) return callback(errors.byCode('99', err.message))
    if (project) {
      project.released = project.released ? false : true
      project.save()
      callback(null, {
        'shortTitle': project.shortTitle,
        'newReleasedStatus': project.released
      })
    } else {
      callback(errors.byCode('00'), null)
    }
  })
}

module.exports = {
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
  changeReleased: changeReleased
}
