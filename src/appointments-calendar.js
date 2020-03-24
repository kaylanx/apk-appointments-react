import React, { useState } from 'react'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { useEffectGetAppointments } from './use-effect-get-appointments'

const tomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

const determineDisabledDate = (appointments, date) => {
  return false
}

export function AppointmentsCalendar () {
  const { loading, appointments } = useEffectGetAppointments()
  const [selectedDate, handleDateChange] = useState(tomorrow())

  const disabledDates = (date) => {
    if (loading) {
      // console.log('shut up es-lint')
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true
    }
    return determineDisabledDate(appointments, date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label="Preferred Date"
        required
        value={selectedDate}
        onChange={handleDateChange}
        disablePast={true}
        autoOk={true}
        minDate={tomorrow()}
        shouldDisableDate={disabledDates}
        inputVariant="filled" />
      <div>{JSON.stringify(appointments)}</div>

    </MuiPickersUtilsProvider>
  )
}
