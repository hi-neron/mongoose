'use strict'
const test = require('tape')
const start = require('../bin/www')
const request = require('supertest')
const app = require('../app.js')
const DbPost = require('../db/db-main.js')
const mongoose = require('mongoose')

test('Should create server', (t) => {
  t.ok(start, 'should exists server')
  start.close()
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
      t.equal(res.body, '{"status":404}', 'should retrieve an error 404')
      t.equal(typeof res.body, 'string', 'response should be an JSON stringify')
      t.end()
    })
})

// ********   CRUD    *********
// --------   API     ----------
test.skip('Should retrieve all projects to public from /project', (t) => {
  let post = new DbPost({'title': 'bell'})
  post.save()

  request(app)
    .get('/project')
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      t.ok(Array.isArray(res.body), 'response should be an Array')
      t.equal(res.body[0].title, post.title, 'Should be an item from DB')
      t.end()
    })
  DbPost.remove({'title': 'hello world'}).exec()
  mongoose.connection.close()
})

test.skip('Should retrieve one project from /project/:id', (t) => {
  let post = new DbPost({'title': 'hello'})
  post.save()

  request(app)
  .get('/project/hello')
  .expect(200)
  .end((err, res) => {
    if (err) throw err
    console.log(res.body)
    t.equal(typeof res.body, 'object', 'response should be an object')
    t.equal(res.body.title, post.title, 'Should be an item from DB')
    t.end()
  })
  DbPost.remove({'title': 'hello world'}).exec()
})

test.skip('Should retrieve list of projects from /project/:id', (t) => {
  let post = new DbPost({'title': 'bell'})
  let post1 = new DbPost({'title': 'bell rice mand'})
  let post2 = new DbPost({'title': 'black bells'})
  post.save()
  post1.save()
  post2.save()

  request(app)
  .get('/project/rice')
  .expect(200)
  .end((err, res) => {
    if (err) throw err
    t.ok(Array.isArray(res.body), 'response should be list of arrays')
    t.equal(res.body[0].title, post1.title, 'Should be an item from DB')
    t.end()
  })

  DbPost.remove({}, function (err) {
    if (err) throw err
  }).exec()
})

test.skip("Should return error when it haven't found anything from /project/:id", (t) => {
  let post = new DbPost({'title': 'bell'})
  let post1 = new DbPost({'title': 'bell rice mand'})
  let post2 = new DbPost({'title': 'black bells'})
  post.save()
  post1.save()
  post2.save()

  request(app)
  .get('/project/plop')
  .expect(200)
  .end((err, res) => {
    if (err) throw err
    t.equal(res.body.error, 404, 'Show error')
    t.end()
  })

  DbPost.remove({}, function (err) {
    if (err) throw err
  }).exec()
})

// ---------     DB     ----------
test.skip('Should conect db', (t) => {
  let post = new DbPost({'title': 'hello world'})

  post.save(function (err) {
    if (err) return err
    DbPost.remove({'title': 'hello world'}).exec()
  })

  t.equal(typeof DbPost.find(function (err, data) {
    if (err) return err
  }), 'object', 'should be retrieve JSON from db')

  mongoose.connection.close()
  t.end()
})

test.skip('Should be authenticate', (t) => {})

// ----------    PRIVATE CRUD     ------------
test.skip('Should apply private CRUD to db', (t) => {
  // POST
  // GET
  // UPDATE
  // DELETE
})

test.skip('Should upload one picture', (t) => {})
