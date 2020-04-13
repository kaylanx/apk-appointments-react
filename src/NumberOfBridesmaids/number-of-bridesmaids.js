import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

NumberOfBridesmaids.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.object,
  appointmentType: PropTypes.string.isRequired
}

export function NumberOfBridesmaids ({
  id,
  label,
  classes,
  appointmentType
}) {
  if (appointmentType === 'bridesmaids') {
    return (
      <TextField
        id={id}
        label={label}
        className={classes}
        type="number"
        inputProps={{ inputMode: 'numeric' }}
        variant="filled"
      />)
  }
  return null
}
