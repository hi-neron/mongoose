'use strict'
const author = 'Hi-neron'
const metaString = {type: String, required: true}
const protoString = {type: String, required: true, unique: true}
const normalString = {type: String}

module.exports = {
  shortTitle: protoString,
  released: {type: Boolean, default: false, required: true},
  author: {type: String, default: author},
  images: [{
    name: normalString,
    src: normalString,
    path: normalString,
    url: normalString,
    alt: normalString
  }],
  date: {type: Date, default: Date.now, required: true},
  social: [{
    name: String,
    counter: Number
  }],
  ESP: {
    shortTitle: protoString,
    title: metaString,
    entrance: metaString,
    content: metaString,
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

