'use strict'
// Aqui se suben y gestionan las imagenes
// tenga una ruta
// post y get:
// POST:  guarde la imagen, parseé la ruta y la incluya a donde pertenece
// en la db
// GET: Obtenga la imagen
// DELETE: Elimine la imagen y la ruta en la db
// autentifique
// Path: /:titulo-corto-del-proyecto/:archivo?
const formidable = require('formidable')
const express = require('express')
const router = express.Router()
// const fs = require('fs')

router.route('/:project?/:files?')
  .all((req, res, next) => {
    console.log('Need auth middleware')
    next()
  })
  .get((req, res, next) => {
    res.json({'ok': 'ok'})
  })
  .post((req, res, next) => {
    let form = formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) res.json({'err': err.body})
      console.log(fields)
      res.json({'ok': 'ok'})
    })
  })

module.exports = router
