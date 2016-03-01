'use strict'
// Class image

const path = require('path')
const fs = require('fs-extra')
const errors = require('../lib/error.js')
const S = require('string')

class Image {
  constructor (project, file) {
    this.project = project
    this.file = file
    this.type = file.type
    this.name = S(this.project)
      .slugify()
      .camelize()
      .s
     + '-' + S(file.name)
      .trim()
      .camelize()
      .collapseWhitespace()
      .s

    this.size = file.size
    this.alt = `${this.name} is part of project ${this.project}`
    this.src = path.join(path.dirname(__dirname), 'public', 'images', `/${this.project}/${this.name}`)
    this.path = path.dirname(this.src)
    this.url = path.join('images', `/${this.project}/${this.name}`)
  }

  createDir (callback) {
    fs.ensureDir(this.path, (err) => {
      if (err) return callback(err)
      callback(null)
    })
  }

  moveUploadFile (callback) {
    if (this.type === 'image/svg+xml' || this.type === 'image/jpeg' || this.type === 'image/gif' || this.type === 'image/png' ){
      if (this.size < 1000000){
        fs.rename(this.file.path, this.src, (err) => {
          if (err) return callback(errors.byCode('22'))
          console.log(this.file.path)
          console.log(this.src)
          callback(null)
        })
      } else {
        callback(errors.byCode('16')) // too large image
      }
    } else {
      callback(errors.byCode('13')) // type not supported
    }
  }

  save (callback) {
    this.createDir((err) => {
      if (err) return callback(errors.byCode('20'))
      this.moveUploadFile((err) => {
        if (err) return callback(err)
        console.log(`${this.name} type ${this.type} was be created`)
        callback(null)
      })
    })

  }
}

module.exports = Image
