const readXlsxFile = require('read-excel-file/node')
const registerMap = require('./schema/register-map')
const { baseSchema, manualSchema } = require('./schema/register-schema')
const { parse } = require('date-fns')

const processRows = async (register, sheet, map, schema) => {
  const { rows } = await readXlsxFile(register, { sheet, map, dateFormat: 'dd/mm/yyyy' })

  const errors = []

  const registerMap = new Map()

  rows.forEach((row, index) => {
    const rowNum = index + 1

    const result = schema.validate(row)

    if (!result.isValid) {
      return errors.push({ rowNum, row, errors: result.errors.details })
    }

    console.log(row)

    const person = row.person
    const dog = row.dog

    person.dateOfBirth = parse(person.dateOfBirth, 'dd/MM/yyyy', new Date())
    dog.dateOfBirth = parse(dog.dateOfBirth, 'dd/MM/yyyy', new Date())

    console.log(person.dateOfBirth)

    const key = `${person.lastName}^${person.postcode}^${person.dateOfBirth}`

    const value = registerMap.get(key) || { ...person, dogs: [] }

    value.dogs.push(dog)

    registerMap.set(key, value)
  })

  const result = {
    add: [...registerMap.values()],
    errors
  }

  return result
}

const importRegister = async register => {
  const passed = await processRows(register, 'Passed', registerMap, baseSchema)
  const manual = await processRows(register, 'Manual', registerMap, manualSchema)

  return {
    add: [].concat(passed.add, manual.add),
    errors: [].concat(passed.errors, manual.errors)
  }
}

module.exports = {
  importRegister
}
