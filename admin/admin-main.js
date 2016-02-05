'use strict'
const express = require('express')
const router = express.Router()
const dbAdmin = require('../db/queries/db-admin.js')

router.get('/login', (req, res, next) => {
  next()
})

router.route('/:opt?')
  .all((req, res, next) => {
    console.log('it has not been identified, but continue')
    next()
  })
  .post((req, res, next) => {
    let post = req.body
    dbAdmin.createPost(post, (err, data) => {
      if (err) return console.log(err)
      res.json(data)
    })
  })
  .put((req, res, next) => {
    let post = req.body
    let opt = req.params.opt
    // when use put request, add method adds arrays at the end
    // OVERWRITE overwrite all contents
    if (opt === 'add' || opt === 'overwrite') {
      post.method = opt
      dbAdmin.updatePost(post, (err, data) => {
        if (err) return res.json({'err': err})
        res.json(data)
      })
    } else {
      res.json({'err': 'A method was not specified'})
    }
  })
  .delete((req, res, next) => {
    let path = req.params.opt
    console.log(path)
    dbAdmin.deletePost(path, (err, params) => {
      if (err) return res.json({'err': err})
      res.json({'title': params, 'deleted': 'ok'})
      res.end()
    })
  })

module.exports = router
