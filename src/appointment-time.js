import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  diary
}) {
  const classes = useStyles()

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
          <option value={10}>10:00am</option>
          <option value={11}>11:00am</option>
          <option value={12}>12:00pm</option>
          <option value={13}>1:00pm</option>
          <option value={14}>2:00pm</option>
          <option value={15}>3:00pm</option>
          <option value={16}>4:00pm</option>
        </Select>
      </FormControl>
    </div>
  )
}
