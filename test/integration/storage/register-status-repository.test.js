const { tableClient } = require('../../../app/storage/get-table-client')
const { getLatestUpdate, setProcessing } = require('../../../app/storage/register-status-repository')

describe('register status table repository', () => {
  beforeAll(async () => {
    jest.resetAllMocks()

    await tableClient.createTable()

    jest.useFakeTimers()
  })

  test('getLatestUpdate should return last inserted status update', async () => {
    const filename = 'test-latest-update'

    await tableClient.createEntity({
      PartitionKey: filename,
      RowKey: '0008638299856901000',
      status: 'uploaded',
      email: 'test@example.com',
      createdOn: '2023-11-16T13:58:19.000Z',
      updatedAt: '2023-11-16T13:58:19.000Z'
    })

    jest.setSystemTime(new Date('2023-11-16T13:58:20.000Z'))
    await setProcessing(filename, 'test@example.com')

    const update = await getLatestUpdate(filename)

    expect(update).toBeDefined()
    expect(update.updatedAt).toBe('2023-11-16T13:58:20.000Z')
  })

  test('setProcessing should insert update with processing status', async () => {
    const filename = 'test-processing-update'

    await tableClient.createEntity({
      PartitionKey: filename,
      RowKey: '0008638299856901000',
      status: 'uploaded',
      email: 'test@example.com',
      createdOn: '2023-11-16T13:58:19.000Z',
      updatedAt: '2023-11-16T13:58:19.000Z'
    })

    jest.setSystemTime(new Date('2023-11-16T13:58:20.000Z'))
    await setProcessing(filename, 'test@example.com')

    const update = await getLatestUpdate(filename)

    expect(update).toBeDefined()
    expect(update).toMatchObject({
      partitionKey: 'test-processing-update',
      rowKey: '0008638299856900000',
      status: 'processing',
      email: 'test@example.com',
      createdOn: '2023-11-16T13:58:19.000Z',
      updatedAt: '2023-11-16T13:58:20.000Z'
    })
  })

  test('getLatestUpdate should throw error if filename is not found', async () => {
    const filename = 'test-not-found'

    await expect(getLatestUpdate(filename)).rejects.toThrow(`No table entry found for ${filename}`)
  })

  afterAll(async () => {
    jest.useRealTimers()

    await tableClient.deleteTable()
  })
})
