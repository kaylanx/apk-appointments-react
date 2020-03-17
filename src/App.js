import React, { useState, useEffect } from 'react'
import './App.css'
import { TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { config } from './Constants'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}))

const tomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

const determineDisabledDate = (appointments, date) => {
  console.log(appointments)
  return false
}

function App () {
  const [selectedDate, handleDateChange] = useState(tomorrow())
  const [appointments, appontmentsDataChange] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    async function fetchAppointmentData () {
      console.log(config.url.API_URL)
      const response = await fetch(config.url.API_URL)
      appontmentsDataChange(await response.json())
    }

    fetchAppointmentData()
  }, [])

  const disabledDates = (date) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true
    }
    return determineDisabledDate(appointments, date)
  }

  return (
    <div className="App">
      <form className={classes.root} noValidate autoComplete="off">

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
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
        <TextField
          id="time"
          label="Preferred Time"
          required
          type="time"
          variant="filled"
          defaultValue="07:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min
          }}
        />
        <TextField id="filled-basic" label="Filled" variant="filled" />

        <TextField id="standard-basic" label="Standard" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
    </div>
  )
}

export default App

/*

Preferred Time (required)

Appointment Type (required)

How many bridesmaids do you have?

Wedding / Event Date

dd/mm/yyyy

Your Name (required)

Your Email (required)

Confirm Email (required)

Your phone number (required)

Budget

How did you hear about us?

Your Message
*/
