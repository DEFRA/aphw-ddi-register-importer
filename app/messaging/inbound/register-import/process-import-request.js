const util = require('util')
const { validate: validateRequest } = require('./import-request-schema')
const { validate: validateData } = require('./import-data-schema')
const { importRegister } = require('../../../register-import')
const { downloadRegisterBlob } = require('../../../storage/register-blob-repository')
const { setProcessing, setComplete, setFailed } = require('../../../storage/register-status-repository')

const process = async (message, receiver) => {
  try {
    const importRequest = message

    validateRequest(importRequest.body)
    validateData(importRequest.body.data)

    const registerMetadata = importRequest.body.data

    await setProcessing(registerMetadata.filename)

    console.log('Received register import request: ', util.inspect(importRequest.body, false, null, true))

    const register = await downloadRegisterBlob(registerMetadata.filename)
    const results = await importRegister(register)

    await setComplete(registerMetadata.filename, results)

    await receiver.completeMessage(message)

    console.log('Completed register import request')
  } catch (err) {
    await receiver.deadLetterMessage(message)

    const filename = message.body?.data?.filename

    if (filename !== undefined) {
      await setFailed(filename)
    }

    console.error('Unable to complete register import request: ', err)
  }
}

module.exports = process
