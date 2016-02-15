'use strict'
const autor = 'Hi-neron'
const protoString = {type: String, required: true, unique: true}
const normalString = {type: String}

module.exports = {
  shortTitle: protoString,
  released: {type: Boolean, default: 'not', required: true, unique: true},
  author: {type: String, default: autor, unique: true},
  images: [{
    name: normalString,
    src: normalString,
    path: normalString
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
    shortTitle: normalString,
    title: normalString,
    entrance: normalString,
    content: normalString,
    tags: [String]
  }
}

