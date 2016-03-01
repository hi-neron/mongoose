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
      '12': 'Invalid image',
      '13': 'Image type is not supported',
      '14': 'Please enter a valid id',
      '15': 'New content need an image',
      '16': 'Size of one picture is too large',
      '20': "Can't create dir",
      '21': "Can't create path to dir",
      '22': "Can't create the uploaded file",
      '23': "Succesfull deleted dir of bad POST request",
      '99': 'Unknow error',
      '404': 'Not found'
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
  res.json(throwError('404'))
}

module.exports = {
  path: path,
  byCode: throwError
}
