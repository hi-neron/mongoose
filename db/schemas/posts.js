'use strict'
const author = 'Hi-neron'
const protoString = {type: String, required: true, unique: true, default: 'empty'}

module.exports = {
  title: protoString,
  released: {type: Boolean, default: false, required: true, unique: true},
  autor: {type: String, default: author, required: true, unique: true},
  images: [{
    name: protoString,
    src: protoString
  }],
  date: {type: Date, default: Date.now, required: true},
  social: [{
    name: String,
    counter: Number
  }],
  ESP: {
    shortTitle: protoString,
    title: protoString,
    entrance: protoString,
    content: protoString,
    tags: [String]
  },
  ENG: {
    shortTitle: protoString,
    title: protoString,
    entrance: protoString,
    content: protoString,
    tags: [String]
  }
}

