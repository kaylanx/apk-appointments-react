import React from 'react'
import PropTypes from 'prop-types'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { isDayClosed } from '../Diary/diary'

import DateFnsUtils from '@date-io/date-fns'

const tomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

const determineDisabledDate = (appointments, date) => {
  return false
}

AppointmentsCalendar.propTypes = {
  id: PropTypes.string,
  diary: PropTypes.object.isRequired,
  disablePast: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  selectedDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func.isRequired
}

export function AppointmentsCalendar ({
  id = 'appointment-date',
  diary,
  disablePast = true,
  minDate = tomorrow(),
  selectedDate = tomorrow(),
  handleDateChange
}) {
  const disabledDates = (date) => {
    if (isDayClosed(diary, date)) {
      return true
    }

    return determineDisabledDate(diary, date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        id={id}
        label="Preferred Date"
        required
        value={selectedDate}
        onChange={handleDateChange}
        disablePast={disablePast}
        autoOk={true}
        minDate={minDate}
        shouldDisableDate={disabledDates}
        inputVariant="filled"
        format="EE, d MMMM yy" />
    </MuiPickersUtilsProvider>
  )
}
