'use strict'
const $ = require('jquery')
const $modal = require('../modal-window')

const $projectsContainer = $('#app-container').find('.projects')
const $newProject = $('#app-container').find('.new')

$newProject.on('click', function(ev) {
  const $form = require('../form-container')
  $form.data('action', 'new')
  console.log($form.data('action'))
})

$projectsContainer.on('click', 'div.edit', function (ev) {
  const $form = require('../form-container')
  let $this = $(this)
  let $project = $this.closest('.project')
  let shortTitle = $project.data('shortTitle')
  $form.data('action', 'update')
  $.ajax({
    'url': `/projects/one/${shortTitle}`,
    success: function(project, textStatus, xhr){
      console.log(project)
    }
  })
})

$projectsContainer.on('click', 'div.delete', function (ev) {
  let $this = $(this)
  let $project = $this.closest('.project')
  let shortTitle = $project.data('shortTitle')
  $modal.addClass('show-this')
  // are you sure?
  $modal.find('.dialog-message').text(shortTitle)
  // delete
})


$projectsContainer.on('click', 'div.publicated', function (ev) {
  let $this = $(this)
  let $project = $this.closest('.project')
  let shortTitle = $project.data('shortTitle')
  let data = {'shortTitle': shortTitle}

  let form = new FormData();
  form.append('shortTitle', shortTitle);

  $.ajax({
    'async': true,
    'url': '/admin/released',
    'method': 'POST',
    'processData': false,
    'contentType': false,
    'mimeType': 'multipart/form-data',
    'data': form,
    success: (data) => {
      data = $.parseJSON(data)
      $this.toggleClass('yellow-p');
      console.log(data)
    }
  })
})


module.exports = $projectsContainer