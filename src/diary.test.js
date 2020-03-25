import { getDaysClosed } from './diary'
import { fakeAppointments, multipleDaysClosed } from './fake-appointments'

describe('load appointments', () => {
  it('1 day closed', () => {
    const daysClosed = getDaysClosed(fakeAppointments)
    expect(daysClosed).toBeDefined()
    const expectedDates = [new Date('2020-10-24')]
    expect(daysClosed).toEqual(expectedDates)
  })

  it('multiple days closed', () => {
    const daysClosed = getDaysClosed(multipleDaysClosed)
    expect(daysClosed).toBeDefined()
    const expectedDates = [new Date('2020-02-27'), new Date('2020-11-11'), new Date('2020-10-24')]
    expect(daysClosed).toEqual(expectedDates)
  })
})
