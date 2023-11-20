const { odata } = require('@azure/data-tables')
const { tableClient } = require('./get-table-client')
const { PROCESSING, COMPLETE, FAILED } = require('../constants/import-status')

const maxDate = new Date(8640000000000000)

const invertTimestamp = (timestamp) => {
  const inverted = `${maxDate - timestamp}`

  return inverted.padStart(19, '0')
}

const createUpdate = (lastUpdate, status, results) => {
  const now = new Date()

  const entity = {
    PartitionKey: lastUpdate.partitionKey,
    RowKey: invertTimestamp(now),
    status,
    email: lastUpdate.email,
    createdOn: lastUpdate.createdOn,
    updatedAt: now.toISOString()
  }

  if (results?.add) {
    entity.add = JSON.stringify(results.add)
  }

  if (results?.skipped) {
    entity.skipped = JSON.stringify(results.skipped)
  }

  if (results?.errors !== undefined) {
    entity.errors = JSON.stringify(results.errors)
  }

  return entity
}

const addToTable = async (filename, status, results) => {
  await tableClient.createTable()

  const lastUpdate = await getLatestUpdate(filename)

  const update = createUpdate(lastUpdate, status, results)

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

const setComplete = async (filename, results) => await addToTable(filename, COMPLETE, results)

const setFailed = async (filename, results) => await addToTable(filename, FAILED, results)

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
