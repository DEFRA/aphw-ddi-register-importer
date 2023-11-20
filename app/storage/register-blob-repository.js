const { blobServiceClient } = require('./get-blob-client')
const { blobConfig } = require('../config/storage')

const downloadRegisterBlob = async filename => {
  const container = blobServiceClient.getContainerClient(blobConfig.registerContainer)

  await container.createIfNotExists()

  const blobClient = container.getBlockBlobClient(filename)

  if (!await blobClient.exists()) {
    throw new Error(`Register upload file (${filename}) does not exist.`)
  }

  return await blobClient.downloadToBuffer()
}

module.exports = {
  downloadRegisterBlob
}
