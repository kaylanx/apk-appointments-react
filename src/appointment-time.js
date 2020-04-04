import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getAppointmentsForDay, getFormattedTime } from './diary'

AppointmentTime.propTypes = {
  id: PropTypes.string,
  selectedDate: PropTypes.instanceOf(Date),
  diary: PropTypes.object
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

  // Remove appointments that are booked

  return (
    <div>
      {<div>json = &quot;{JSON.stringify(diary)}&quot;</div>}

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
    </div>
  )
}
