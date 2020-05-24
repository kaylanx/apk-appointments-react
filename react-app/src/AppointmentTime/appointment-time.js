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
  label: PropTypes.string,
  classes: PropTypes.object,
  diary: PropTypes.object.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired
}

export function AppointmentTime ({
  id = 'appointment-time',
  label = 'Preferred Time',
  classes,
  diary,
  selectedDate
}) {
  const appointmentAvailability = getAppointmentsForDay(diary, selectedDate)

  return (
    <FormControl required variant="filled" className={classes.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native
        id={id}
        inputProps={{
          id: id
        }}
      >
        <option aria-label="None" value="" />
        {appointmentAvailability.map((time, index) => <option key={index} value={time.time}>{getFormattedTime(diary, time)}</option>)}
      </Select>
    </FormControl>
  )
}
