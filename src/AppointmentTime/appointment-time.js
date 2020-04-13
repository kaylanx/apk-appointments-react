import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'
import { getAppointmentsForDay, getFormattedTime } from '../Diary/diary'

AppointmentTime.propTypes = {
  id: PropTypes.string,
  classes: PropTypes.object,
  diary: PropTypes.object.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired
}

export function AppointmentTime ({
  id = 'appointment-time',
  classes,
  diary,
  selectedDate
}) {
  const appointmentAvailability = getAppointmentsForDay(diary, selectedDate)

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel htmlFor={id}>Preferred Time</InputLabel>
      <Select
        native
        id={id}
        inputProps={{
          id: id
        }}
      >
        <option aria-label="None" value="" />
        {appointmentAvailability.map((time, index) => <option key={index} value={time}>{getFormattedTime(diary, time)}</option>)}
      </Select>
    </FormControl>
  )
}
