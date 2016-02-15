'use strict'
// Aqui se suben y gestionan las imagenes
const test = require('tape')
const request = require('supertest')
const app = require('../app.js')

test.skip('Should found image path /files', (t) => {
  request(app)
    .get('/files')
    .set('Content-Type', 'multipart/form-data')
    .end((err, res) => {
      if (err) throw err
      t.ok(res.body, `should return a response \n ${JSON.stringify(res.body)}`)
      t.end()
    })
})

test.skip('Should upload an image at path /files ', (t) => {
  request(app)
    .post('/files/amigos_del_mal/')
    .field('project', 'Anabel')
    .attach('image', '/Users/mutatipo/Ejercicios/2016/mongoose/tests/test.jpg')
    .end((err, res) => {
      if (err) throw err
      t.ok(res.body, `should return a response \n ${JSON.stringify(res.body)}`)
      t.end()
    })
})
