import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './App.css'
import { AppointmentsCalendar } from './appointments-calendar'
import { AppointmentTime } from './appointment-time'
import { getDiary } from './fetch-diary'

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
const tomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

function App () {
  const classes = useStyles()

  const [diary, setDiary] = useState(null)
  const [selectedDate, setSelectedDate] = useState(tomorrow())

  async function fetchData () {
    const data = await getDiary()
    setDiary(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  if (diary === null) {
    return (<div className="App" />)
  }

  return (
    <div className="App">
      <form className={classes.root} noValidate autoComplete="off">

        <AppointmentsCalendar id="appointment-date" diary={diary} handleDateChange={handleDateChange} selectedDate={selectedDate} />
        <AppointmentTime diary={diary} selectedDate={selectedDate} />

        {/* <TextField
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
        /> */}
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
