'use strict'
const express = require('express')
const router = express.Router()
const dbAdmin = require('../db/queries/db-admin.js')
const errors = require('../lib/error.js')
const _ = require('underscore')
const Image = require('../lib/image.js')

// formidable to parse form-data
const formidable = require('formidable')

// login route
router.get('/login', (req, res, next) => {
  next()
})

router.route('/:opt?')
  .all((req, res, next) => {
    console.log('it has not been identified, but while this module it is not ready you can continue')
    next()
  })

  .post((req, res, next) => {
    let form = formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) return res.json(err)
      if (_.isEmpty(files)) return res.json(errors.byCode('15'))

      fields.images = []
      for (let item in files) {
        fields.images.push(new Image(fields.shortTitle, files[item]))
      }

      dbAdmin.createPost(fields, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
      })
    })
  })

  .put((req, res, next) => {
    let opt = req.params.opt
    let form = formidable.IncomingForm()
    // when use put request, add method adds arrays at the end
    // OVERWRITE overwrite all contents

    form.parse(req, (err, fields, files) => {
      if (err) return res.json(err)
      if (!files) return res.json()

      if (opt === 'add' || opt === 'overwrite') {
        fields.method = opt
        dbAdmin.updatePost(fields, (err, data) => {
          if (err) return res.json(err)
          res.json(data)
        })
      } else {
        res.json({'err': 'A method was not specified'})
      }
    })
  })

  .delete((req, res, next) => {
    let path = req.params.opt
    dbAdmin.deletePost(path, (err, params) => {
      if (err) return res.json(err)
      res.json({'shortTitle': params, 'deleted': 'ok'})
    })
  })

module.exports = router
