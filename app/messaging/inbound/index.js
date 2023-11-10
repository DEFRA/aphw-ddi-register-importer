const { MessageReceiver } = require('ffc-messaging')
const { importRequestQueue } = require('../../config/messaging/import-queue')
const processImportRequest = require('./register-import/process-import-request')

let importRequestReceiver

const start = async () => {
  const importAction = message => processImportRequest(message, importRequestReceiver)
  
  importRequestReceiver = new MessageReceiver(importRequestQueue, importAction)
  await importRequestReceiver.subscribe()

  console.info('Ready to receive import requests')
}

const stop = async () => {
  await importRequestReceiver.close()
}

module.exports = {
  start,
  stop
}
