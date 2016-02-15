'use strict'
const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const DbPost = require('../db/db-main.js')
const mongoose = require('mongoose')
const errors = require('../lib/error.js')

var object = {
  'shortTitle': 'Dilian Maria',
  'content': 'era una mañana sola',
  'ESP': {
    'shortTitle': 'Mundo',
    'title': 'LAses',
    'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
    'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'tags': ['meta', 'casa', 'life']
  }
}

var object1 = {
  'shortTitle': 'Fatalina Maria',
  'content': 'era una mañana sola',
  'ESP': {
    'shortTitle': 'Mundo',
    'title': 'LAses',
    'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
    'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'tags': ['meta', 'casa', 'life']
  }
}

var object2 = {
  'shortTitle': 'calidose',
  'content': 'era una mañana sola',
  'ESP': {
    'shortTitle': 'Mundo',
    'title': 'LAses',
    'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
    'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'tags': ['meta', 'casa', 'life']
  }
}

var object3 = {
  'shortTitle': 'Alquimia',
  'content': 'era una mañana sola',
  'ESP': {
    'shortTitle': 'Mundo',
    'title': 'LAses',
    'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
    'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'tags': ['meta', 'casa', 'life']
  }
}

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
  let post = new DbPost({'shortTitle': 'hello world'})

  post.save(function (err) {
    if (err) return err
    DbPost.remove({'shortTitle': 'hello world'}).exec()
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
      t.equal(res.body.length, 4, 'Should be an item from DB')
      t.end()
    })
})

test("Should retrieve one project from /project/:id('alquimia')", (t) => {
  request(app)
  .get('/project/one/Alquimia')
  .expect(200)
  .end((err, res) => {
    if (err) throw err
    t.equal(typeof res.body, 'object', 'response should be an object')
    t.equal(res.body.shortTitle, object3.shortTitle, 'Should be an item from DB')
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
    t.equal(res.body[0].shortTitle, object.shortTitle, 'Should be an item from DB')
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

// test('Should be authenticate', (t) => {})

// --------- POST ---------------

test('Should create new item at path POST:/admin/:name', (t) => {
  var object = {
    'shortTitle': 'Mema',
    'content': 'era una mañana sola',
    'ESP': {
      'shortTitle': 'Mundo',
      'title': 'LAses',
      'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
      'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
      'tags': ['meta', 'casa', 'life']
    },
    'ENG': {
      'shortTitle': 'Eng Mundo',
      'title': 'eng',
      'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
      'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
      'tags': ['meta', 'casa', 'life']
    }
  }

  request(app)
    .post('/admin')
    .field('shortTitle', object.shortTitle)
    .field('content', object.content)
    .field('entrance', object['ESP'].entrance)
    .field('title', object['ESP'].title)
    .attach('image', '/Users/mutatipo/Ejercicios/2016/mongoose/tests/test.jpg')
    .attach('image1', '/Users/mutatipo/Ejercicios/2016/mongoose/tests/test2.jpg')
    .end((err, res) => {
      if (err) console.log(err)
      t.equal(res.body.shortTitle, object.shortTitle, 'should be equal')
      DbPost.find({'shortTitle': object.shortTitle}, (err, res) => {
        if (err) console.log(err)
        t.equal(object.shortTitle, res[0].shortTitle, 'Response should be the same at DB')
        t.end()
      })
    })
})

test('Should return error when shortTitle is already in DB POST:/admin/:name', (t) => {
  var object = {
    'shortTitle': 'Mema',
    'content': 'era una mañana sola',
    'ESP': {
      'shortTitle': 'Mundo',
      'title': 'LAses',
      'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
      'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
      'tags': ['meta', 'casa', 'life']
    }
  }

  request(app)
    .post('/admin')
    .field('shortTitle', object.shortTitle)
    .field('content', object.content)
    .field('entrance', object['ESP'].entrance)
    .field('title', object['ESP'].title)
    .attach('image', '/Users/mutatipo/Ejercicios/2016/mongoose/tests/test.jpg')
    .end((err, res) => {
      t.equal(res.body.errMsg, 'It already exists', 'should return error -already exists-')
      t.equal(res.body.errCode, '01', 'Should retrieve code 01')
      if (err) console.log(err)
      t.end()
    })
})

test('Should return error when new post does not have img POST:/admin/:name', (t) => {
  var object = {
    'shortTitle': 'Mema',
    'content': 'era una mañana sola',
    'ESP': {
      'shortTitle': 'Mundo',
      'title': 'LAses',
      'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
      'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
      'tags': ['meta', 'casa', 'life']
    }
  }

  request(app)
    .post('/admin')
    .field('shortTitle', object.shortTitle)
    .field('content', object.content)
    .field('entrance', object['ESP'].entrance)
    .field('title', object['ESP'].title)
    // .attach('image', '/Users/mutatipo/Ejercicios/2016/mongoose/tests/test.skip.jpg')
    .end((err, res) => {
      t.equal(res.body.errMsg, errors.byCode('15').errMsg, `should return - error ${errors.byCode('15').errMsg} -`)
      t.equal(res.body.errCode, '15', 'Should return an error (15) because it does not have img')
      if (err) console.log(err)
      t.end()
    })
})

// --------- PUT ---------------

test('Should update an item PUT:/admin/:name', (t) => {
  var sendData = {
    'shortTitle': 'Mema',
    'newTitle': 'Memin',
    'ESP': {
      'shortTitle': 'Cambio mundo',
      'title': 'cambio esto rambien',
      'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
      'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
      'tags': ['meta', 'casa', 'life']
    }
  }

  var object = {
    'shortTitle': 'Mema',
    'ESP': {
      'shortTitle': 'Mundo',
      'title': 'LAses',
      'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
      'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
      'tags': ['meta', 'casa', 'life']
    },
    'ENG': {
      'shortTitle': 'Eng Mundo',
      'title': 'eng',
      'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
      'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
      'tags': ['meta', 'casa', 'life']
    }
  }

  let post = new DbPost(object)
  post.save()

  request(app)
    .put('/admin/add')
    .field('shortTitle', sendData.shortTitle)
    .field('newTitle', sendData.newTitle)
    .field('entrance', sendData['ESP'].entrance)
    .field('content', sendData['ESP'].content)
    .field('title', sendData['ESP'].title)
    .end((err, res) => {
      if (err) console.log(err)
      t.ok(typeof res.body, 'object', 'Should be an object')
      DbPost.findOne({'shortTitle': sendData.newTitle}, (err, project) => {
        if (err) console.log(err)
        t.equal(object['ESP'].content, project['ESP'].content, 'Item in DB should have to change')
        t.end()
      })
    })
})

test('Should return an error when try update an item that not exists PUT:/admin/:name', (t) => {
  let sendData = {
    'shortTitle': 'Ana maria',
    'content': 'hola mundo'
  }

  request(app)
    .put('/admin/add')
    .field('shortTitle', sendData.shortTitle)
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      t.equal(res.body.errCode, '00', 'Should be code 00 not found')
      t.equal(res.body.errMsg, errors.byCode('00').errMsg, 'Should be an Error')
      t.end()
    })
})

// --------- DELETE ---------------

test('Should delete an item', (t) => {
  request(app)
    .delete('/admin/Memin')
    .expect(200)
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      DbPost.findOne({'shortTitle': 'Mema'}, (err, project) => {
        if (err) console.log(err)
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
      t.equal(res.body.errCode, '11', 'File not found')
      t.end()
    })
})

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
