'use strict'
const express = require('express')
const router = express.Router()
const dbAdmin = require('../db/queries/db-admin.js')
const dbGet = require('../db/queries/db-get.js')
const errors = require('../lib/error.js')
const _ = require('underscore')
const Image = require('../lib/image.js')
const S = require('string')

// formidable to parse form-data
const formidable = require('formidable')

function createImageArray(files, project, cb){
  let images = []
  if (files.images.length) {
    for (let i = 0 ; i < files.images.length; i++){
      if (files.images[i].name) {
        images.push(new Image(project, files.images[i]))
      } else {
        return cb(errors.byCode('12'), null)
        break
      }
    }
  } else {
    if (files.images.name){
      images.push(new Image(project, files.images))
    } else {
      return cb(errors.byCode('12'), null)
    }
  }
  cb(null, images)
}

// login route
router.get('/login', (req, res, next) => {
  next()
})

router.route('/:opt?/:mode?')
  .all((req, res, next) => {
    // Evaluate if it is autorized
    // if not > login
    // if true > render index.ejs
    console.log('it has not been identified, but while this module it is not ready you can continue')

    next()
  })

  .get((req, res, next) => {
    const ALIAS = ['Caramelo', 'Cocolin', 'Mi sol', 'Cantinflas']
    let params = {}
    params.shortTitle = req.params.opt
    if (!req.auth){
      params.released = true
    }
    let alias = Math.floor(Math.random() * ALIAS.length)
    dbGet.all(params, (err, projects) => {
      if (err) return res.json(errors.byCode('99'))
      res.render('main', {
        'name': 'Jose Luis',
        'alias': ALIAS[alias]
      })
    })
  })

  .post((req, res, next) => {
    let opt = req.params.opt
    let mode = req.params.mode
    let form = formidable.IncomingForm()
    form.multiples = true

    switch (opt) {
      case 'new':

        form.parse(req, (err, fields, files) => {
          if (err) return res.json(err)
          if (_.isEmpty(files)) return res.json(errors.byCode('15'))
          fields.shortTitle = S(fields.shortTitle)
            .trim()
            .collapseWhitespace()
            .strip('/', '.', "'", '"', '%', '¨', '{', '}', '`', '´', '>', '<', '\\', '(', ')', '[',']', '^')
            // .latinise()
            .s.toLowerCase();

          createImageArray(files, fields.shortTitle, function (err, data) {
            if (err) return res.json(err)
            fields.images = data
          })

          dbAdmin.createPost(fields, (error, data) => {
            if (error) {
              return res.json(error)
            } else {
              console.log(data.shortTitle + ' Saved!')
              res.json(data)
            }
          })
        })
        break;

      case 'update':
        form.parse(req, (err, fields, files) => {
          if (err) return res.json(err)
          fields.shortTitle = S(fields.shortTitle)
            .trim()
            .collapseWhitespace()
            .s.toLowerCase()

          if (!_.isEmpty(files)) {
            createImageArray(files, fields.shortTitle, function (err, data) {
              if (err) {
                if (err.errorCode = '12'){
                  fields.images = []
                } else {
                  return res.json(err)
                }
              }
              fields.images = data
            })
          }

          if (mode === 'add' || mode === 'overwrite') {
            fields.method = mode
            dbAdmin.updatePost(fields, (err, data) => {
              if (err) return res.json(err)
              res.json(data)
            })
          } else {
            res.json({'err': 'A method was not specified'})
          }
        })

        break;

      case 'released':
        form.parse(req, (err, fields, files) => {
          if (err) return res.json(errors.byCode('99', err.message))
          if (fields.shortTitle || fields.shortTitle !== '') {
            dbAdmin.changeReleased(fields, (err, data) => {
              if (err) return res.json(err)
              res.json(data)
            })
          } else {
            res.json(errors.byCode('14'))
          }
        })
        break;

      default:
        res.json(errors.byCode('10'))
    }
  })

  .delete((req, res, next) => {
    let path = req.params.opt
    path = S(path)
      .trim()
      .collapseWhitespace()
      .s.toLowerCase()

    dbAdmin.deletePost(path, (err, params) => {
      if (err) return res.json(err)
      res.json({'shortTitle': params, 'deleted': 'ok'})
    })
  })

module.exports = router
