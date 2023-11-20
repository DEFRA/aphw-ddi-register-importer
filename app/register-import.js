const readXlsxFile = require('read-excel-file/node')
const registerMap = require('./schema/register-map')
const { baseSchema } = require('./schema/register-schema')

const notApprovedMessage = 'Application not "Approved"'

const processRows = async (register, sheet, map, schema) => {
  const { rows } = await readXlsxFile(register, { sheet, map, dateFormat: 'dd/mm/yyyy' })

  const errors = []
  const skipped = []

  const registerMap = new Map()

  rows.forEach((row, index) => {
    const rowNum = index + 1

    const result = schema.validate(row)

    if (!result.isValid) {
      return errors.push({ rowNum, row, errors: result.errors.details })
    }

    const person = row.person
    const dog = row.dog

    if (dog.applicationStatus === undefined || dog.applicationStatus.toUpperCase() !== 'APPROVED') {
      return skipped.push({ rowNum, row, messages: [notApprovedMessage] })
    }

    const key = `${person.lastName}^${person.postcode}^${person.dateOfBirth}`

    const value = registerMap.get(key) || { ...person, dogs: [] }

    value.dogs.push(dog)

    registerMap.set(key, value)
  })

  const result = {
    add: [...registerMap.values()],
    skipped,
    errors
  }

  return result
}

const importRegister = async register => {
  const passed = await processRows(register, 'Passed', registerMap, baseSchema)

  return {
    add: [].concat(passed.add),
    skipped: [].concat(passed.skipped),
    errors: [].concat(passed.errors)
  }
}

module.exports = {
  importRegister
}
