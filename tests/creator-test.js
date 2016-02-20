'use strict'
const request = require('supertest')
const app = require('../app.js')
const test = require('tape')
const start = require('../bin/www')

var object = {
  'shortTitle': 'alaram',
  'content': 'era una mañana sola',
  'ESP': {
    'shortTitle': 'Mundo',
    'title': 'no lo peudo creer',
    'entrance': 'Lorem ipsum Tempor commodo labore sit sunt deserunt cillum aliquip in sunt mollit pariatur.',
    'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'tags': ['meta', 'casa', 'life']
  },
  'ENG': {
    'en_shortTitle': 'Eng Mundo',
    'en_title': 'eng',
    'en_entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
    'en_content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'en_tags': ['meta', 'casa', 'life']
  }
}

var object2 = {
  'shortTitle': 'Colombia Tierrita',
  'content': 'no le creo a sumerce',
  'ESP': {
    'shortTitle': 'Mundo',
    'title': 'Feista es lo mejor',
    'entrance': 'Lorem ipsum Aliquip ea ullamco qui fugiat in ea labore in ut dolor ullamco Ut est Duis ullamco aute magna irure occaecat.',
    'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'tags': ['meta', 'casa', 'life']
  },
  'ENG': {
    'en_shortTitle': 'Eng Mundo',
    'en_title': 'eng',
    'en_entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
    'en_content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'en_tags': ['meta', 'casa', 'life']
  }
}

var object3 = {
  'shortTitle': 'como sonaba es marimba',
  'content': 'era una manana sola',
  'ESP': {
    'shortTitle': 'Mundo',
    'title': 'marta es lo mejor',
    'entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
    'content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'tags': ['meta', 'casa', 'life']
  },
  'ENG': {
    'en_shortTitle': 'Eng Mundo',
    'en_title': 'eng',
    'en_entrance': 'Lorem ipsum Adipisicing officia dolore esse dolor ad nostrud pariatur in sed labore.',
    'en_content': 'Lorem ipsum Tempor reprehenderit aliquip sunt aliquip do in proident in cupidatat labore et in in in minim consectetur ad dolor aliqua elit dolore irure nulla Ut magna reprehenderit.',
    'en_tags': ['meta', 'casa', 'life']
  }
}

test('should create one item in db', (t) => {
  request(app)
    .post('/admin')
    .field('shortTitle', object.shortTitle)
    .field('content', object.content)
    .field('entrance', object['ESP'].entrance)
    .field('title', object['ESP'].title)
    .attach('image', '/Users/mutatipo/Ejercicios/2016/mongoose/tests/test.jpg')
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      t.end()
    })
})

test('should create one item in db', (t) => {
  request(app)
    .post('/admin')
    .field('shortTitle', object2.shortTitle)
    .field('content', object2.content)
    .field('entrance', object2['ESP'].entrance)
    .field('title', object2['ESP'].title)
    .field('released', 'true')
    .attach('image2', '/Users/mutatipo/Ejercicios/2016/mongoose/tests/test2.jpg')
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      t.end()
    })
})

test('should create one item in db', (t) => {
  request(app)
    .post('/admin')
    .field('shortTitle', object3.shortTitle)
    .field('content', object3.content)
    .field('entrance', object3['ESP'].entrance)
    .field('title', object3['ESP'].title)
    .attach('image3', '/Users/mutatipo/Ejercicios/2016/mongoose/tests/test3.jpg')
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      start.close()
      t.end()
    })
})
