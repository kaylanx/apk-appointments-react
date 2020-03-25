
export const getDaysClosed = (appointments) => {
  return appointments
    .filter(appointment => appointment.closed === true)
    .flatMap(appointment => new Date(appointment.date))
}
