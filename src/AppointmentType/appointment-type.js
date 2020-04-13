import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'

AppointmentType.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.object,
  appointmentType: PropTypes.string.isRequired,
  handleAppointmentTypeChange: PropTypes.func.isRequired
}

export function AppointmentType ({
  id = 'appointment-type',
  label = 'Appointment Type',
  classes,
  appointmentType,
  handleAppointmentTypeChange
}) {
  return (
    <FormControl required variant="filled" className={classes.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native
        id={id}
        inputProps={{
          id: id
        }}
        onChange={handleAppointmentTypeChange}
        value={appointmentType}
      >
        <option aria-label="None" value="" />
        <option value='bridal'>Bridal</option>
        <option value='bridesmaids'>Bridesmaids</option>
        <option value='accessories'>Accessories</option>
      </Select>
    </FormControl>
  )
}
