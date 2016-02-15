'use strict'

class Error {
  constructor (code, message) {
    let messages = {
      '00': 'It does not exists',
      '01': 'It already exists',
      '02': 'Post validation failed, need one or more fields',
      '03': '',
      '10': 'Invalid value',
      '11': 'Not found',
      '15': 'New content need an image',
      '20': "Can't create dir",
      '21': "Can't create path to dir",
      '22': "Can't create the uploaded file",
      '99': 'Unknow error'
    }

    this.errorCode = code
    this.errorMsg = message

    if (!message) {
      this.errorMsg = messages[this.errorCode] ? messages[this.errorCode] : messages['99']
    }

    this.body = {
      'errCode': this.errorCode,
      'errMsg': this.errorMsg
    }
  }
}

function throwError (code, message) {
  message = message || null
  let error = new Error(code, message)
  return (error.body)
}

function path (req, res, next) {
  res.status(200)
  res.json({status: 404})
  res.end()
}

module.exports = {
  path: path,
  byCode: throwError
}
