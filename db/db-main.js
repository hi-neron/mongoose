'use strict'

const mongoose = require('mongoose')
const postTemplate = require('./schemas/posts.js')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/hiNeron')

// schemas for models
const PostSchema = new Schema(postTemplate)

// Instanciate models
var Post = mongoose.model('Posts', PostSchema)

// Clae que hereda del modelo mongoose y aplica el crud
module.exports = Post
