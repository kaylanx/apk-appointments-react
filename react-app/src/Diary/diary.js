
export const isClosedOnDate = (diary, date) => {
  const dates = diary.appointments
    .filter(appointment => appointment.closed === true)
    .flatMap(appointment => new Date(appointment.date))
    .filter(appointmentDate => appointmentDate.toLocaleDateString() === date.toLocaleDateString())

  return dates.length > 0
}

export const isDayClosed = (diary, date) => {
  const day = getDayStringforDate(date.getDay())
  return dayIsDefined(diary, day) && diary.schedule[day].closed
}

export const getAppointmentsForDay = (diary, date) => {
  if (date === null) {
    return []
  }
  const dayKey = getDayStringforDate(date.getDay())
  if (!dayIsDefined(diary, dayKey)) {
    return []
  }
  if (diary.schedule[dayKey].closed) {
    return []
  }
  const available = diary.schedule[dayKey].availability
  const booked = findAppointmentsBooked(diary, date)
  const remainingAvailable = findRemainingAvailable(available, booked)

  return remainingAvailable
}

const findRemainingAvailable = (available, booked) => {
  return available.filter(({ time: availableTime }) => !booked.some(({ time: bookedTime }) => availableTime === bookedTime))
}

const findAppointmentsBooked = (diary, date) => {
  return diary.appointments
    .filter(appointment => appointment.closed === false && new Date(appointment.date).toLocaleDateString() === date.toLocaleDateString())
    .flatMap(appointment => appointment.times)
}

export const getFormattedTime = (diary, time) => {
  const displayTime = time.time

  if (diary === undefined || diary.schedule === undefined || diary.schedule.display === undefined || diary.schedule.display.format === undefined) {
    return formatTimeWithFee(formatTimeIn24HourFormat(displayTime), time.fee)
  }

  switch (diary.schedule.display.format) {
    case 12:
      return formatTimeWithFee(formatTimeIn12HourFormat(displayTime), time.fee)
    default:
      return formatTimeWithFee(formatTimeIn24HourFormat(displayTime), time.fee)
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

const formatTimeWithFee = (formattedTime, fee) => {
  if (fee !== undefined && fee !== null && fee !== '') {
    return formattedTime + ' (' + fee + ' booking fee)'
  }
  return formattedTime
}

const dayIsDefined = (diary, day) => {
  return day !== undefined && diary !== undefined && diary.schedule !== undefined && diary.schedule[day] !== undefined
}

const getDayStringforDate = (day) => {
  const days = { 0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday' }
  return days[day]
}
