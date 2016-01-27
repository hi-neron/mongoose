'use strict'
const test = require('tape')
const start = require('../bin/www')
const request = require('supertest')
const app = require('../app.js')

test('Should create server', (t) => {
  t.ok(start, 'should exists server')
  t.end()
})

test('should work "/admin" path', (t) => {
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

test('Should serve public assets', (t) => {
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

test('Should show error 404 when the path do not exists', (t) => {
  request(app)
    .get('/notExist')
    .end((err, res) => {
      if (err) throw err
      t.equal(res.body, '{"status":404}', 'should be an error 404')
      t.equal(typeof res.body, 'string', 'should be an JSON')
      t.end()
    })
})

test.skip('Should create a server', (t) => {
})

test.skip('Should conect db', (t) => {
})

test.skip('Should be authenticate', (t) => {
})
