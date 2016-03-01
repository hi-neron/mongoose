'use strict'

const $ = require('jquery')
let $modal = $('body').find('.modal')


$modal.on('click','span.yes', function (ev) {
  const render = require('../render-list-projects')
  const getData = require('../to-obtain-data')
  let $this = $(this)
  let shortTitle = $modal.find('.dialog-message').text()

  let form = new FormData();
  form.append('shortTitle', shortTitle);

  $.ajax({
    'async': true,
    'url': `/admin/${shortTitle}`,
    'method': 'DELETE',
    'processData': false,
    'contentType': false,
    'mimeType': 'multipart/form-data',
    'data': form,
    success: function(data) {
      $modal.removeClass('show-this')
      getData({}, function(projects){
        render(projects)
      })
    }
  })
})

$modal.on('click','span.no', function (ev) {
  $modal.removeClass('show-this')
})

module.exports = $modal