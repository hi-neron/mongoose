'use strict'
const $ = require('jquery')

let $projectsContainer = $('#app-container').find('.projects')

$projectsContainer.on('click', 'div.edit', function (ev) {
  let $this = $(this)
  let $project = $this.closest('.project')
  let shortTitle = $project.data('shortTitle')
  console.log(shortTitle)
})


module.exports = $projectsContainer