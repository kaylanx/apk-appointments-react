import {
  getDaysClosed,
  isDayClosed,
  getAppointmentsForDay,
  getFormattedTime
} from './diary'
import {
  fakeAppointments,
  multipleDaysClosed,
  closedOnThursdays,
  actualSchedule,
  actualSchedule24Hours
} from '../../test_data/fake-appointments'

describe('appointment utilities', () => {
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

  it('get appointments for a given day', () => {
    const appointments = getAppointmentsForDay(actualSchedule, new Date('2020-03-24'))
    expect(appointments).not.toBeUndefined()
    expect(appointments).toBeInstanceOf(Array)
    expect(appointments).toStrictEqual([10, 11, 12, 13, 14, 15, 16])
  })

  it('display format not present defaults to 24 hours', () => {
    const diary = closedOnThursdays
    const time = 13
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('13:00')
  })

  it('display format present and is 24 hours', () => {
    const diary = actualSchedule24Hours
    const time = 13
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('13:00')
  })

  it('display format present and is 12 hours', () => {
    const diary = actualSchedule
    const time = 13
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('1:00pm')
  })
})
