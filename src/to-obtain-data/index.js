'use strict'

const $ = require('jquery')
const $container = require('../projects-container')

function getProjects (params, callback) {
  $.ajax('/projects', {
    data: params,
    success: function (projects, textStatus, xhr) {
      $container.find('.item').remove()
      callback(projects)
    }
  })
}

module.exports = getProjects

