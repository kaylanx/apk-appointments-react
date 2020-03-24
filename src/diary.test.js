import { getDaysClosed } from './diary'
import { fakeAppointments } from './fake-appointments'

describe('load appointments', () => {
  it('daysclosed', () => {
    const daysClosed = getDaysClosed(fakeAppointments)
    expect(daysClosed).toBeDefined()
    const expectedDates = [new Date('2020-10-24')]
    expect(expectedDates).toEqual(daysClosed)
  })
})
