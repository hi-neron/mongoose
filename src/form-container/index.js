'use strict'
const $ = require('jquery')
const getData = require('../to-obtain-data')
const render = require('../render-list-projects')
const f = require('../form-class')

const $form = $('#edit-form').find('form')

$form.submit(function(ev) {
  ev.preventDefault()
  if ( $('.required').val().length === 0 ){
    alert('Hay un campo necesario vacio')
  } else {
    var formData = new FormData($(this)[0]);
    let action = $form.data('action')
    f.send(action, formData, function (err, res) {
      if (err) return console.log(err)
      console.log(res)
    })
  }
});

module.exports = $form


