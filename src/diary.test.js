import { getDaysClosed, isDayClosed } from './diary'
import {
  fakeAppointments,
  multipleDaysClosed,
  closedOnThursdays
} from './fake-appointments'

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

  it('thursdays closed', () => {
    const dayClosed = isDayClosed(closedOnThursdays, new Date('2020-03-26'))
    expect(dayClosed).toBeDefined()
    expect(dayClosed).toBeTruthy()
  })

  it('wednesday not closed', () => {
    const dayClosed = isDayClosed(closedOnThursdays, new Date('2020-03-25'))
    expect(dayClosed).toBeDefined()
    expect(dayClosed).toBeFalsy()
  })
})
