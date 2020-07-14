import React from 'react'
import PropTypes from 'prop-types'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'

EventCalendar.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.object,
  appointmentType: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func.isRequired
}

export function EventCalendar ({
  id,
  label,
  classes,
  appointmentType,
  selectedDate,
  handleDateChange
}) {
  if (appointmentType === 'bridal' || appointmentType === 'bridesmaids') {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          id={id}
          label={label}
          className={classes.formControl}
          required
          autoOk={true}
          value={selectedDate}
          onChange={handleDateChange}
          inputVariant="filled"
          format="EE, d MMMM yy" />
      </MuiPickersUtilsProvider>
    )
  }
  return null
}
