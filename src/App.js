import React, { useState, useEffect } from 'react'

import {
  TextField
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { ThemeProvider } from '@material-ui/core/styles'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'

import startOfTomorrow from 'date-fns/startOfTomorrow'

import './App.css'
import { theme, useStyles } from './Theme/theme'
import { AppointmentsCalendar } from './AppointmentsCalendar/appointments-calendar'
import { AppointmentTime } from './AppointmentTime/appointment-time'
import { AppointmentType } from './AppointmentType/appointment-type'
import { NumberOfBridesmaids } from './NumberOfBridesmaids/number-of-bridesmaids'
import { getDiary } from './Diary/fetch-diary'

function App () {
  const classes = useStyles()

  const [diary, setDiary] = useState(null)
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(startOfTomorrow())
  const [selectedEventDate, setSelectedEventDate] = useState(startOfTomorrow())
  const [appointmentType, setAppointmentType] = useState('')

  async function fetchData () {
    const data = await getDiary()
    setDiary(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAppointmentTypeChange = (event) => {
    setAppointmentType(event.target.value)
  }

  if (diary === null) {
    return (<div className="App" />)
  }

  function EventDateField () {
    if (appointmentType === 'bridal' || appointmentType === 'bridesmaids') {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            id="event-date"
            label="Event / Wedding Date"
            required
            autoOk={true}
            value={selectedEventDate}
            onChange={setSelectedEventDate}
            inputVariant="filled"
            format="EE, d MMMM yy" />
        </MuiPickersUtilsProvider>
      )
    }
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <form className={classes.root} noValidate autoComplete="off">
          <CssBaseline />
          <Container maxWidth="lg">
            <AppointmentsCalendar
              id="appointment-date"
              label="Preferred Date"
              classes={classes}
              diary={diary}
              handleDateChange={setSelectedAppointmentDate}
              selectedDate={selectedAppointmentDate}
            />
            <AppointmentTime
              id="appointment-time"
              label="Preferred Time"
              classes={classes}
              diary={diary}
              selectedDate={selectedAppointmentDate}
            />
            <AppointmentType
              id="appointment-type"
              label="Appointment Type"
              classes={classes}
              handleAppointmentTypeChange={handleAppointmentTypeChange}
              appointmentType={appointmentType}
            />
            <NumberOfBridesmaids
              id="number-of-bridesmaids"
              label="How many bridesmaids do you have?"
              classes={classes}
              appointmentType={appointmentType}
            />
            <EventDateField />
            <TextField id="standard-basic" label="Standard" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </Container>
        </form>
      </div>
    </ThemeProvider>
  )
}

export default App

/*

Your Name (required)

Your Email (required)

Confirm Email (required)

Your phone number (required)

Budget

How did you hear about us?

Your Message
*/
