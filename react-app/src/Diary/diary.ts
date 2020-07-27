/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Display {
  format: number;
}

export interface Day {
  closed: boolean;
  availability?: Array<Time>;
}

export interface Time {
  time: number;
  fee?: string;
}

export interface Schedule {
  display: Display;
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}

export interface Appointment {
  date: string;
  times: Array<Time>;
  closed: boolean;
}

export interface Diary {
   schedule: Schedule;
   appointments: Array<Appointment>;
}

export const isClosedOnDate = (diary: Diary, date: Date): boolean => {
  const dates = diary.appointments
    .filter((appointment: Appointment) => appointment.closed === true)
    .flatMap((appointment: Appointment) => new Date(appointment.date))
    .filter((appointmentDate: Date) => appointmentDate.toLocaleDateString() === date.toLocaleDateString())
  return dates.length > 0
}

const getDayStringforDate = (day: number): keyof Schedule => {
  const days: Array<keyof Schedule> = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ]

  return days[day]
}

export const isDayClosed = (
  diary: Diary,
  date: Date
): boolean => {
  const day = getDayStringforDate(date.getDay())
  if (day === 'display') { return false } // TODO: figure out how to not have to do this!
  return diary.schedule[day].closed
}

const findRemainingAvailable = (available: Array<Time>, booked: Array<Time>): Array<Time> => {
  return available.filter(
    ({ time: availableTime }) => !booked.some(({ time: bookedTime }) => availableTime === bookedTime)
  )
}

const findAppointmentsBooked = (
  diary: Diary,
  date: Date
): Array<Time> => {
  return diary.appointments
    .filter((appointment: Appointment) => appointment.closed === false &&
      new Date(appointment.date).toLocaleDateString() === date.toLocaleDateString()
    )
    .flatMap((appointment: Appointment) => appointment.times)
}

export const getAppointmentsForDay = (
  diary: Diary,
  date: Date | null
): Array<Time> => {
  if (date === null) { return [] }

  const dayKey = getDayStringforDate(date.getDay())

  if (dayKey === 'display') { return [] } // TODO: figure out how to not have to do this!
  if (diary.schedule === undefined) { return [] }

  if (diary.schedule[dayKey].closed) {
    return []
  }
  const available = diary.schedule[dayKey].availability
  const booked = findAppointmentsBooked(diary, date)
  const remainingAvailable = findRemainingAvailable(available ?? new Array<Time>(), booked)

  return remainingAvailable
}

const formatTimeIn24HourFormat = (time: number): string => {
  return time < 10 ? '0' : '' + time + ':00'
}

const formatTimeIn12HourFormat = (time: number): string => {
  let period = 'am'
  if (time >= 12) {
    if (time > 12) {
      time -= 12
    }
    period = 'pm'
  }
  return '' + time + ':00' + period
}

const formatTimeWithFee = (
  formattedTime: string,
  fee: string | null | undefined
): string => {
  if (fee !== undefined && fee !== null && fee !== '') {
    return formattedTime + ' (' + fee + ' booking fee)'
  }
  return formattedTime
}

export const getFormattedTime = (
  diary: Diary,
  time: Time
): string => {
  const displayTime = time.time

  switch (diary?.schedule?.display?.format) {
    case 12:
      return formatTimeWithFee(formatTimeIn12HourFormat(displayTime), time.fee)
    default:
      return formatTimeWithFee(formatTimeIn24HourFormat(displayTime), time.fee)
  }
}
