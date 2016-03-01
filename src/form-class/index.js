'use strict'
const $ = require('jquery')
const getData = require('../to-obtain-data/')
const render = require('../render-list-projects/')

class Forms {
  constructor(action) {
    this.action = action
  }

  send (action, formData, cb){
    this.action = action
    if (this.action === 'new' || this.action === 'update') {
      if (this.action === 'update'){
        this.action = `${this.action}/overwrite`
      }

      $.ajax({
        url: `/admin/${this.action}`,
        type: "post",
        data: formData,
        cache: false,
        contentType: false,
        processData:false,
        success: (data) => {
          // !! need to add one modal window
          console.log(data)
          getData({}, (projects) => {
            render(projects)
            cb(null, {resCode: 'success'})
          })
        }
      })
    } else {
      cb({
        'errCode':'11',
        'errMessage':'Invalid Action',
      }, null)
    }
  }
}

let myForm = new Forms('new')

module.exports = myForm