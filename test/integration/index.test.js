jest.mock('../../app/messaging/inbound')
const { start } = require('../../app/messaging/inbound')

describe('app start', () => {
  beforeEach(() => {
    require('../../app')
  })

  test('starts messaging', async () => {
    expect(start).toHaveBeenCalledTimes(1)
  })
})
