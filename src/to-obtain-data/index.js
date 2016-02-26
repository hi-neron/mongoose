const $ = require('jquery')
const $data = require('../projects-container')

function getProjects (params, callback) {
  $.ajax('/projects', {
    data: params,
    success: function (projects, textStatus, xhr) {
      $data.find('.item').remove()
      callback(projects)
    }
  })
}

module.exports = getProjects

