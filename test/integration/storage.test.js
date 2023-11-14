const { BlobServiceClient } = require('@azure/storage-blob')
const { downloadRegisterBlob } = require('../../app/storage')

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)

describe('blob storage integration', () => {
  beforeAll(async () => {
    const container = blobServiceClient.getContainerClient('register-uploads')

    await container.createIfNotExists()

    const blobClient = container.getBlockBlobClient('test.txt')
    const data = Buffer.from('hello world')
    await blobClient.upload(data, data.length)
  }, 30000)

  test('should throw error if blob does not exist', async () => {
    await expect(downloadRegisterBlob('non-existent.txt')).rejects.toThrow('Register upload file (non-existent.txt) does not exist.')
  })

  test('should return buffer if blob found', async () => {
    const buffer = await downloadRegisterBlob('test.txt')

    expect(buffer.toString()).toEqual('hello world')
  })
})
