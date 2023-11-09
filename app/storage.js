const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('./config/storage')

let blobServiceClient

if (config.useConnectionString) {
  console.log('Using connection string for BlobServiceClient')
  blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionString)
} else {
  console.log('Using DefaultAzureCredential for BlobServiceClient')
  const uri = `https://${config.storageAccount}.blob.core.windows.net`
  blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
}

const downloadRegisterBlob = async filename => {
  const container = blobServiceClient.getContainerClient(config.container)

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
