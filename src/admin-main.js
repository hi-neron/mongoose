'use strict'
const $ = require('jquery')
const form = require('./new-data-form')
const getData = require('./to-obtain-data')
const imageForm = require('./image-form')
const render = require('./render-list-projects')

getData({}, (projects) => {
  render(projects)
})