const util = require('util')
const { validate: validateRequest } = require('./import-request-schema')
const { validate: validateData } = require('./import-data-schema')
const { importRegister } = require('../../../register-import')
const { downloadRegisterBlob } = require('../../../storage')

const process = async (message, receiver) => {
  try {
    const importRequest = message.body

    validateRequest(importRequest)
    validateData(importRequest.data)

    const registerMetadata = importRequest.data

    console.log('Received register import request: ', util.inspect(importRequest, false, null, true))

    const register = await downloadRegisterBlob(registerMetadata.filename)
    await importRegister(register)

    await receiver.completeMessage(message)

    console.log('Completed register import request')
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to complete register import request: ', err)
  }
}

module.exports = process
