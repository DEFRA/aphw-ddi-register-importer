const util = require('util')
const { validate: validateRequest } = require('./import-request-schema')
const { validate: validateData } = require('./import-data-schema')
const { importRegister } = require('../../../register-import')
const { downloadRegisterBlob } = require('../../../storage/register-blob-repository')
const { setProcessing, setComplete, setFailed } = require('../../../storage/register-status-repository')

const process = async (message, receiver) => {
  try {
    const importRequest = message.body

    validateRequest(importRequest)
    validateData(importRequest.data)

    await setProcessing(importRequest.data.filename)

    const registerMetadata = importRequest.data

    console.log('Received register import request: ', util.inspect(importRequest, false, null, true))

    const register = await downloadRegisterBlob(registerMetadata.filename)
    await importRegister(register)

    await setComplete(importRequest.data.filename)

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
