import React from 'react'
import PropTypes from 'prop-types'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import startOfTomorrow from 'date-fns/startOfTomorrow'

import { isDayClosed, getAppointmentsForDay } from '../Diary/diary'

import DateFnsUtils from '@date-io/date-fns'

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
