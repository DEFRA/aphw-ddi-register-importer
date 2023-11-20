module.exports = {
  body: {
    specversion: '1.0',
    id: '123e4567-e89b-12d3-a456-426655440000',
    time: '2020-01-01T12:00:00Z',
    subject: 'RegisterImport',
    datacontenttype: 'text/json',
    data: {
      filename: 'test.xlsx',
      email: 'test@example.com'
    }
  },
  type: 'uk.gov.defra.aphw-ddi.event.register-import',
  source: 'aphw-ddi-portal'
}
