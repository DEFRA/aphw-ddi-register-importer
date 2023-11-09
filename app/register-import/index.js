const readXlsxFile = require('read-excel-file/node')
const registerSchema = require('./schema/register')

const importRegister = async data => {
  return await readXlsxFile(data, { schema: registerSchema })
}

module.exports = {
  importRegister
}
