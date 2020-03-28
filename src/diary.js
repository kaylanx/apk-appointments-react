
export const getDaysClosed = (diary) => {
  return diary.appointments
    .filter(appointment => appointment.closed === true)
    .flatMap(appointment => new Date(appointment.date))
}

export const isDayClosed = (diary, date) => {
  const day = getDayStringforDate(date.getDay())
  return dayIsDefined(diary, day) && diary.schedule[day].closed
}

const dayIsDefined = (diary, day) => {
  return day !== undefined && diary !== undefined && diary.schedule !== undefined && diary.schedule[day] !== undefined
}

const getDayStringforDate = (day) => {
  const days = { 0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday' }
  return days[day]
}
