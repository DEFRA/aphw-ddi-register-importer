const { ddiApiConfig } = require('../../config/api')
const wreck = require('@hapi/wreck')

const baseUrl = ddiApiConfig.baseUrl

const options = {
  json: true
}

const get = async endpoint => {
  const { payload } = await wreck.get(`${baseUrl}/${endpoint}`, options)

  return payload
}

const post = async (endpoint, data) => {
  const { payload } = await wreck.post(`${baseUrl}/${endpoint}`, {
    payload: data
  })

  return JSON.parse(payload)
}

module.exports = {
  get,
  post
}
