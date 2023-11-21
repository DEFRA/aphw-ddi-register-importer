jest.mock('../../../../app/messaging/inbound/register-import/import-request-schema')
const { validate: validateRequest } = require('../../../../app/messaging/inbound/register-import/import-request-schema')

jest.mock('../../../../app/messaging/inbound/register-import/import-data-schema')

jest.mock('../../../../app/register-import')
const { importRegister } = require('../../../../app/register-import')

jest.mock('../../../../app/storage/register-blob-repository')
const { downloadRegisterBlob } = require('../../../../app/storage/register-blob-repository')

jest.mock('../../../../app/storage/register-status-repository')
const { setProcessing, setComplete, setFailed } = require('../../../../app/storage/register-status-repository')

const receiver = require('../../../mocks/messaging/receiver')
const message = require('../../../mocks/messaging/import-request')

const processImportRequest = require('../../../../app/messaging/inbound/register-import/process-import-request')

describe('process import request message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should import register', async () => {
    await processImportRequest(message, receiver)

    expect(downloadRegisterBlob).toHaveBeenCalledWith(message.body.data.filename)
    expect(importRegister).toHaveBeenCalledTimes(1)
  })

  test('should complete message if processed successfully', async () => {
    await processImportRequest(message, receiver)

    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('should set import status to processing on valid message', async () => {
    await processImportRequest(message, receiver)

    expect(setProcessing).toHaveBeenCalledWith(message.body.data.filename)
  })

  test('should set import status to complete when payload correct', async () => {
    importRegister.mockResolvedValue({
      add: [],
      skipped: [],
      errors: []
    })

    await processImportRequest(message, receiver)

    expect(importRegister).toHaveBeenCalledTimes(1)
    expect(setComplete).toHaveBeenCalledWith(message.body.data.filename, {
      add: [],
      skipped: [],
      errors: []
    })
  })

  test('should not complete message if error during processing', async () => {
    validateRequest.mockImplementation(() => { throw new Error('test error') })

    await processImportRequest(message, receiver)

    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })

  test('eerror during processing should call setFailed', async () => {
    validateRequest.mockImplementation(() => { throw new Error('test error') })

    await processImportRequest(message, receiver)

    expect(setFailed).toHaveBeenCalledWith(message.body.data.filename)
  })

  test('error during processing should not call setFailed if no filename', async () => {
    const mockMessage = { ...message }

    delete mockMessage.body.data.filename

    validateRequest.mockImplementation(() => { throw new Error('test error') })

    await processImportRequest(mockMessage, receiver)

    expect(setFailed).not.toHaveBeenCalled()
  })

  test('error during processing should deadletter message', async () => {
    validateRequest.mockImplementation(() => { throw new Error('test error') })

    await processImportRequest(message, receiver)

    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
  })
})
