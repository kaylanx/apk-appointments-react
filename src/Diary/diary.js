
export const getDaysClosed = (diary) => {
  return diary.appointments
    .filter(appointment => appointment.closed === true)
    .flatMap(appointment => new Date(appointment.date))
}

export const isDayClosed = (diary, date) => {
  const day = getDayStringforDate(date.getDay())
  return dayIsDefined(diary, day) && diary.schedule[day].closed
}

export const getAppointmentsForDay = (diary, date) => {
  const dayKey = getDayStringforDate(date.getDay())
  if (!dayIsDefined(diary, dayKey)) {
    return []
  }
  if (diary.schedule[dayKey].closed) {
    return []
  }
  const available = diary.schedule[dayKey].availability
  const booked = getTimesAvailableForDate(diary, date)
  const remainingAvailable = findRemainingAvailable(available, booked)

  return remainingAvailable
}

const findRemainingAvailable = (available, booked) => {
  return available.filter(({ time: availableTime }) => !booked.some(({ time: bookedTime }) => availableTime === bookedTime))
}

const getTimesAvailableForDate = (diary, date) => {
  return diary.appointments
    .filter(appointment => appointment.closed === false && new Date(appointment.date).getTime() === date.getTime())
    .flatMap(appointment => appointment.times)
}

export const getFormattedTime = (diary, time) => {
  const displayTime = time.time

  if (diary === undefined || diary.schedule === undefined || diary.schedule.display === undefined || diary.schedule.display.format === undefined) {
    return formatTimeIn24HourFormat(displayTime)
  }

  switch (diary.schedule.display.format) {
    case 12:
      return formatTimeIn12HourFormat(displayTime)
    default:
      return formatTimeIn24HourFormat(displayTime)
  }
}

const formatTimeIn24HourFormat = (time) => {
  return (time < 10) ? '0' : '' + time + ':00'
}

const formatTimeIn12HourFormat = (time) => {
  var period = 'am'
  if (time >= 12) {
    if (time > 12) {
      time -= 12
    }
    period = 'pm'
  }
  return '' + time + ':00' + period
}

const dayIsDefined = (diary, day) => {
  return day !== undefined && diary !== undefined && diary.schedule !== undefined && diary.schedule[day] !== undefined
}

const getDayStringforDate = (day) => {
  const days = { 0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday' }
  return days[day]
}
