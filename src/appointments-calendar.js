import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { isDayClosed } from './diary'
import { getDiary } from './fetch-diary'

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
  disablePast: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  defaultSelectedDate: PropTypes.instanceOf(Date)
}

export function AppointmentsCalendar ({
  id = 'appointment-date',
  disablePast = true,
  minDate = tomorrow(),
  defaultSelectedDate = tomorrow()
}) {
  const [selectedDate, handleDateChange] = useState(defaultSelectedDate)
  const [diary, setDiary] = useState(null)

  const disabledDates = (date) => {
    if (isDayClosed(diary, date)) {
      return true
    }

    return determineDisabledDate(diary, date)
  }

  async function fetchData () {
    const data = await getDiary()
    setDiary(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {<div>json = &quot;{JSON.stringify(diary)}&quot;</div>}

      {JSON.stringify(id)}
      {JSON.stringify(disablePast)}
      {JSON.stringify(minDate)}
      {JSON.stringify(defaultSelectedDate)}

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
          inputVariant="filled" />
      </MuiPickersUtilsProvider>
    </div>
  )
}
