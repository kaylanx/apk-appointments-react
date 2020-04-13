import React from 'react'
import PropTypes from 'prop-types'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
import startOfTomorrow from 'date-fns/startOfTomorrow'

import { isDayClosed, getAppointmentsForDay } from '../Diary/diary'

AppointmentsCalendar.propTypes = {
  id: PropTypes.string,
  diary: PropTypes.object.isRequired,
  disablePast: PropTypes.bool,
  label: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  selectedDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func.isRequired
}

export function AppointmentsCalendar ({
  id = 'appointment-date',
  diary,
  disablePast = true,
  label = 'Preferred Date',
  minDate = startOfTomorrow(),
  selectedDate = startOfTomorrow(),
  handleDateChange
}) {
  const determineDisabledDate = (diary, date) => {
    const remainingTimes = getAppointmentsForDay(diary, date)
    return remainingTimes.length === 0
  }

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
        label={label}
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
