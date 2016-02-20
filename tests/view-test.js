'use strict'

const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const start = require('../bin/www')

test.skip('Should return an html item', (t) => {
  request(app)
    .get('/admin')
    .end((err, res) => {
      if (err) console.log(err)
      t.equal(res.header['content-type'], 'text/html; charset=utf-8', 'Should be an html')
      t.end()
      start.close()
    })
})
