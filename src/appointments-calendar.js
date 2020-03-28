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
  id: PropTypes.string
}

export function AppointmentsCalendar (props) {
  const [selectedDate, handleDateChange] = useState(tomorrow())
  const [diary, setDiary] = useState({ loading: true, data: null })

  const disabledDates = (date) => {
    if (isDayClosed(diary, date)) {
      return true
    }
    return determineDisabledDate(diary, date)
  }

  async function fetchData () {
    const data = await getDiary()
    setDiary({ loading: false, data })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {diary.loading && <div>loading...</div>}

      {!diary.loading && <div>json = &quot;{JSON.stringify(diary)}&quot;</div>}

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          id={props.id}
          label="Preferred Date"
          required
          value={selectedDate}
          onChange={handleDateChange}
          disablePast={true}
          autoOk={true}
          minDate={tomorrow()}
          shouldDisableDate={disabledDates}
          inputVariant="filled" />
      </MuiPickersUtilsProvider>
    </div>
  )
}
