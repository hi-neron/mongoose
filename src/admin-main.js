'use strict'
const $ = require('jquery')
const form = require('./form-container')
const getData = require('./to-obtain-data')
const imageForm = require('./image-form')
const render = require('./render-list-projects')

getData({}, (projects) => {
  render(projects)
})