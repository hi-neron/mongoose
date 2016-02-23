const $ = require('jquery')

function getProjects (params, callback) {
  $.ajax('/project', {
    data: params,
    success: function (projects, textStatus, xhr) {
      callback(projects)
    }
  })
}

module.exports = getProjects

