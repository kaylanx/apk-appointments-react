import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import startOfTomorrow from 'date-fns/startOfTomorrow'
import DateFnsUtils from '@date-io/date-fns'

EventCalendar.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.object,
  appointmentType: PropTypes.string.isRequired
}

export function EventCalendar ({
  id,
  label,
  classes,
  appointmentType
}) {
  const [selectedEventDate, setSelectedEventDate] = useState(startOfTomorrow())

  if (appointmentType === 'bridal' || appointmentType === 'bridesmaids') {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          id={id}
          label={label}
          className={classes}
          required
          autoOk={true}
          value={selectedEventDate}
          onChange={setSelectedEventDate}
          inputVariant="filled"
          format="EE, d MMMM yy" />
      </MuiPickersUtilsProvider>
    )
  }
  return null
}
