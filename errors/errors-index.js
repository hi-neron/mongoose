'use strict'

function path (req, res, next) {
  res.status(200)
  res.json(JSON.stringify({status: 404}))
  res.end()
}

module.exports = { path: path }

