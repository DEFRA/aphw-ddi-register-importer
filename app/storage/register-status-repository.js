const { odata } = require('@azure/data-tables')
const { tableClient } = require('./get-table-client')
const { PROCESSING, COMPLETE, FAILED } = require('../constants/import-status')

const maxDate = new Date(8640000000000000)

const invertTimestamp = (timestamp) => {
  const inverted = `${maxDate - timestamp}`

  return inverted.padStart(19, '0')
}

const createUpdate = (lastUpdate, status) => {
  const now = new Date()

  return {
    PartitionKey: lastUpdate.partitionKey,
    RowKey: invertTimestamp(now),
    status,
    email: lastUpdate.email,
    createdOn: lastUpdate.createdOn,
    updatedAt: now.toISOString()
  }
}

const addToTable = async (filename, status) => {
  await tableClient.createTable()

  const lastUpdate = await getLatestUpdate(filename)

  const update = createUpdate(lastUpdate, status)

  await tableClient.createEntity(update)
}

const queryImportsByPartition = async (filename, additionalOptions) => {
  await tableClient.createTable()

  const results = tableClient.listEntities({
    queryOptions: {
      ...additionalOptions,
      filter: odata`PartitionKey eq ${filename}`
    }
  })

  return results
}

const setProcessing = async (filename) => await addToTable(filename, PROCESSING)

const setComplete = async (filename) => await addToTable(filename, COMPLETE)

const setFailed = async (filename) => await addToTable(filename, FAILED)

const getLatestUpdate = async (filename) => {
  const results = await queryImportsByPartition(filename, { top: 1 })

  const { value: update } = await results[Symbol.asyncIterator]().next()

  if (!update) {
    throw new Error(`No table entry found for ${filename}`)
  }

  return update
}

module.exports = {
  setProcessing,
  setComplete,
  setFailed,
  getLatestUpdate
}
