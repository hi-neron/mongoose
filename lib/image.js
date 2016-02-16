'use strict'
// add db path
// save image
const path = require('path')
const fs = require('fs-extra')
const errors = require('../lib/error.js')

class Image {
  constructor (project, file) {
    this.project = project
    this.file = file
    this.name = file.name
    this.size = file.size
    this.type = file.type
    this.src = path.join(path.dirname(__dirname), 'public', 'images', `/${this.project}/${this.name}`)
    this.path = path.dirname(this.src)
  }

  createDir (callback) {
    fs.ensureDir(this.path, (err) => {
      if (err) return callback(err)
      callback(null)
    })
  }

  moveUploadFile (callback) {
    fs.rename(this.file.path, this.src, (err) => {
      if (err) return callback(errors.byCode('22'))
    })
    callback(null)
  }

  save (callback) {
    this.createDir((err) => {
      if (err) return callback(errors.byCode('20'))
      this.moveUploadFile((err) => {
        if (err) return callback(errors.byCode('22'))
        console.log(`${this.name} was be created`)
      })
    })

    callback(null)
  }
}

module.exports = Image
