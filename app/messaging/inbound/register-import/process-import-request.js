const { validate: validateRequest } = require('./import-request-schema')
const { validate: validateData } = require('./import-data-schema')
const { importRegister } = require('../../../register-import')
const { downloadRegisterBlob } = require('../../../storage')

const process = async (message, receiver) => {
  try {
    const body = message.body

    validateRequest(body)
    validateData(body.data)

    const registerMetadata = body.data

    console.log('Received register import request: ', JSON.stringify(body))
    
    const register = await downloadRegisterBlob(registerMetadata.filename)
    await importRegister(register)

    await receiver.completeMessage(message)
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to complete register import request: ', err)
  }
}

module.exports = process
