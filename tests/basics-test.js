'use strict'
const test = require('tape')
const start = require('../bin/www')
const request = require('supertest')
const app = require('../app.js')

test.skip('Should create server', (t) => {
  t.ok(start, 'should exists server')
  start.close()
  t.end()
})

test.skip('should work "/admin" path', (t) => {
  request(app)
    .get('/admin')
    .end((err, res) => {
      if (err) throw err
      t.equal(res.status, 200, 'should be stauts 200')
      t.equal(typeof res, 'object', 'should be JSON')
      t.equal(res.type, 'application/json', 'header should be json')
      t.end()
    })
})

test.skip('Should serve public assets', (t) => {
  request(app)
    .get('/')
    .end((err, res) => {
      if (err) throw err
      t.equal(res.type, 'text/html', 'should serve an index html')
      t.equal(res.status, 200, 'should be status 200')
    })

  request(app)
    .get('/css/main.css')
    .end((err, res) => {
      if (err) throw err
      t.equal(res.type, 'text/css', 'should serve a css')
      t.equal(res.status, 200, 'should be status 200')
      t.end()
    })
})

test('Should be an error when project does not exists', (t) => {
  request(app)
    .get('/project/one/pepe')
    .end((err, res) => {
      if (err) throw err
      console.log(res.body)
      t.equal(res.body.errCode, '404', 'should be an error')
      t.end()
    })
})

test('Should show error 404 when the path do not exists', (t) => {
  request(app)
    .get('/notExist')
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      t.equal(res.body.errCode, '404', 'should retrieve an error 404')
      // t.equal(typeof res.body, 'string', 'response should be an JSON stringify')
      t.end()
    })
})
