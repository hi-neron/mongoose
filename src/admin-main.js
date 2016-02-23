'use strict'
const $ = require('jquery')
const form = require('./new-data-form')
const getData = require('./to-obtain-data')
const imageForm = require('./image-form')

getData({}, (projects) => {
  console.log(projects)
})