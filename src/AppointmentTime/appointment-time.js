import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getAppointmentsForDay, getFormattedTime } from '../Diary/diary'

AppointmentTime.propTypes = {
  id: PropTypes.string,
  diary: PropTypes.object.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export function AppointmentTime ({
  id = 'appointment-time',
  diary,
  selectedDate
}) {
  const classes = useStyles()
  const appointmentAvailability = getAppointmentsForDay(diary, selectedDate)

  // TODO: Add appointments with cost.

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
