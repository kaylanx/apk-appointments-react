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
  actualSchedule24Hours,
  actualScheduleWith1AppointmentBookedOn24March,
  actualScheduleWith2AppointmentsBookedOn24March,
  actualScheduleWithAllAppointmentsBookedOn24March
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
    expect(appointments).toStrictEqual([{ time: 10 }, { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }])
  })

  it('get appointments for a given day with 1 appointment already booked at 10am', () => {
    const appointments = getAppointmentsForDay(actualScheduleWith1AppointmentBookedOn24March, new Date('2020-03-24'))
    expect(appointments).not.toBeUndefined()
    expect(appointments).toBeInstanceOf(Array)
    expect(appointments).toStrictEqual([{ time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }])
  })

  it('get appointments for a given day with 2 appointments already booked at 10am and 11am', () => {
    const appointments = getAppointmentsForDay(actualScheduleWith2AppointmentsBookedOn24March, new Date('2020-03-24'))
    expect(appointments).not.toBeUndefined()
    expect(appointments).toBeInstanceOf(Array)
    expect(appointments).toStrictEqual([{ time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }])
  })

  it('get appointments for a given day with all appointments already booked', () => {
    const appointments = getAppointmentsForDay(actualScheduleWithAllAppointmentsBookedOn24March, new Date('2020-03-24'))
    expect(appointments).not.toBeUndefined()
    expect(appointments).toBeInstanceOf(Array)
    expect(appointments).toStrictEqual([])
  })

  it('display format not present defaults to 24 hours', () => {
    const diary = closedOnThursdays
    const time = { time: 13 }
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('13:00')
  })

  it('display format present and is 24 hours', () => {
    const diary = actualSchedule24Hours
    const time = { time: 13 }
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('13:00')
  })

  it('display format present and is 12 hours', () => {
    const diary = actualSchedule
    const time = { time: 13 }
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('1:00pm')
  })

  it('display format not present defaults to 24 hours and there is a fee', () => {
    const diary = closedOnThursdays
    const time = { time: 13, fee: '£20' }
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('13:00 (£20 booking fee)')
  })

  it('display format present and is 24 hours and there is a fee', () => {
    const diary = actualSchedule24Hours
    const time = { time: 13, fee: '£20' }
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('13:00 (£20 booking fee)')
  })

  it('display format present and is 12 hours and there is a fee', () => {
    const diary = actualSchedule
    const time = { time: 13, fee: '£20' }
    const formattedTime = getFormattedTime(diary, time)
    expect(formattedTime).toBe('1:00pm (£20 booking fee)')
  })
})
