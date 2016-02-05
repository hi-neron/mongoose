'use strict'
const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const DbPost = require('../db/db-main.js')
const mongoose = require('mongoose')

var object = {'title': 'Dilian Maria', 'content': 'era una mañana sola'}
var object1 = {'title': 'Alquimia', 'content': 'era una mañana sola'}
var object2 = {'title': 'Fatalina Maria', 'content': 'era una mañana sola'}
var object3 = {'title': 'Diana', 'content': 'era una mañana sola'}

let post = new DbPost(object)
let post1 = new DbPost(object1)
let post2 = new DbPost(object2)
let post3 = new DbPost(object3)

post.save()
post1.save()
post2.save()
post3.save()

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

// ********   CRUD    *********
// --------   API PUBLIC     ----------
test('Should retrieve all projects to public from /project', (t) => {
  request(app)
    .get('/project')
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      t.ok(Array.isArray(res.body), 'response should be an Array')
      t.equal(res.body[0].title, post.title, 'Should be an item from DB')
      t.end()
    })
})

test("Should retrieve one project from /project/:id('hello')", (t) => {
  request(app)
  .get('/project/one/Diana')
  .expect(200)
  .end((err, res) => {
    if (err) throw err
    t.equal(typeof res.body, 'object', 'response should be an object')
    t.equal(res.body.title, object3.title, 'Should be an item from DB')
    t.end()
  })
})

test('Should retrieve list of projects from /project/:id', (t) => {
  request(app)
  .get('/project/Maria')
  .expect(200)
  .end((err, res) => {
    if (err) throw err
    t.ok(Array.isArray(res.body), 'response should be list of arrays')
    t.equal(res.body[0].title, object.title, 'Should be an item from DB')
    t.end()
  })
})

test("Should return error when it haven't found anything from /project/:id", (t) => {
  request(app)
  .get('/project/plop')
  .expect(200)
  .end((err, res) => {
    if (err) throw err
    t.equal(res.body.error, 'There are not items to show', 'Show error')
    t.end()
  })
})

// ----------    PRIVATE CRUD     ------------

test.skip('Should be authenticate', (t) => {})

test('Should create new item at path POST:/admin/:name', (t) => {
  let object = {'title': 'Anabel', 'content': 'era una mañana sola'}

  request(app)
    .post('/admin')
    .set('Content-type', 'application/json')
    .send(object)
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      t.equal(res.body.title, object.title, 'should be equal')
      DbPost.find({'title': object.title}, (err, res) => {
        if (err) console.log(err)
        t.equal(object.title, res[0].title, 'Response should be the same at DB')
        t.end()
      })
    })
})

test('Should return error when title is already in DB POST:/admin/:name', (t) => {
  let object = {'title': 'Anabel', 'content': 'era una mañana sola'}

  request(app)
    .post('/admin')
    .set('Content-type', 'application/json')
    .send(object)
    .end((err, res) => {
      t.equal(res.body.error, 'Item already exists', 'should return error -already exists-')
      if (err) console.log(err)
      t.end()
    })
})

test('Should update an item PUT:/admin/:name', (t) => {
  let object = {
    'title': 'dilian',
    'ESP': {'content': 'era una mañana sola'},
    'ENG': {'tags': ['gustav', 'french']},
    'images': [{'name': 'cero', 'src': 'url://pepe'}]
  }

  let sendData = {
    'title': 'dilian',
    'ENG': {'content': 'ha cambiado', 'tags': ['marte', 'jupiter', 'french']},
    'images': [{'name': 'one', 'src': 'http://imagen.com'}],
    'newTitle': 'doris'
  }

  let post = new DbPost(object)
  post.save()

  request(app)
    .put('/admin/add')
    .set('Content-type', 'application/json')
    .send(sendData)
    .end((err, res) => {
      if (err) console.log(err)
      t.ok(typeof res.body, 'object', 'Should be an object')
      DbPost.findOne({'title': sendData.newTitle}, (err, project) => {
        if (err) console.log(err)
        t.equal(object['ESP'].content, project['ESP'].content, 'Item in DB should have to change')
        t.end()
      })
    })
})

test('Should return an error when try update an item that not exists PUT:/admin/:name', (t) => {
  let sendData = {
    'title': 'Ana maria',
    'content': 'hola mundo'
  }

  request(app)
    .put('/admin/add')
    .set('Content-type', 'application/json')
    .send(sendData)
    .end((err, res) => {
      if (err) console.log(err)
      t.ok(typeof res.body.error, 'object', 'Should be an object')
      t.equal(res.body.error, 'item does not exists', 'Should be an Error')
      t.end()
    })
})

test('Should delete an item', (t) => {
  request(app)
    .delete('/admin/Dilian Maria')
    .expect(200)
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      DbPost.findOne({'title': 'Dilian Maria'}, (err, project) => {
        if (err) console.log(err)
        console.log(project)
        t.equal(project, null, 'Return an null object')
        t.end()
      })
    })
})

test('Should return an error when try delete an item that not exists', (t) => {
  request(app)
    .delete('/admin/petra')
    .expect(200)
    .end((err, res) => {
      if (err) console.log(err)
      t.ok(res.body.err, 'Response should be an error')
      t.end()
    })
})

test.skip('Should upload one picture', (t) => {})

test.skip('Shuld use the errors handler', (t) => {})

test('DB had end with nothing', (t) => {
  DbPost.remove(function (err) {
    if (err) throw err
  }).exec()

  request(app)
    .get('/project')
    .end((err, res) => {
      if (err) console.log(err)
      t.equal(res.body.error, 'There are not items to show', 'Should that items not found')
      t.end()
    })
})

