jest.mock('../../../../app/messaging/inbound/register-import/import-request-schema')
const { validate: validateRequest } = require('../../../../app/messaging/inbound/register-import/import-request-schema')

jest.mock('../../../../app/messaging/inbound/register-import/import-data-schema')

jest.mock('../../../../app/register-import')
const { importRegister: mockImportRegister } = require('../../../../app/register-import')

jest.mock('../../../../app/storage')
const { downloadRegisterBlob: mockDownloadRegisterBlob } = require('../../../../app/storage')

const receiver = require('../../../mocks/messaging/receiver')
const message = require('../../../mocks/messaging/import-request')

const processImportRequest = require('../../../../app/messaging/inbound/register-import/process-import-request')

describe('process import request message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should import register', async () => {
    await processImportRequest(message, receiver)

    expect(mockDownloadRegisterBlob).toHaveBeenCalledWith(message.body.data.filename)
    expect(mockImportRegister).toHaveBeenCalledTimes(1)
  })

  test('should complete message if processed successfully', async () => {
    await processImportRequest(message, receiver)

    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('should not complete message if error during processing', async () => {
    validateRequest.mockImplementation(() => { throw new Error('test error') })

    await processImportRequest(message, receiver)

    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })

  test('error during processing should deadletter message', async () => {
    validateRequest.mockImplementation(() => { throw new Error('test error') })

    await processImportRequest(message, receiver)

    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
  })
})
