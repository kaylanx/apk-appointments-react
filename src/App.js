import React, { useState, useEffect } from 'react'

import { TextField, CircularProgress } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { ThemeProvider } from '@material-ui/core/styles'

import startOfTomorrow from 'date-fns/startOfTomorrow'

import './App.css'
import { theme, useStyles } from './Theme/theme'
import { AppointmentsCalendar } from './AppointmentsCalendar/appointments-calendar'
import { AppointmentTime } from './AppointmentTime/appointment-time'
import { AppointmentType } from './AppointmentType/appointment-type'
import { NumberOfBridesmaids } from './NumberOfBridesmaids/number-of-bridesmaids'
import { EventCalendar } from './EventCalendar/event-calendar'
import { EmailField } from './EmailField/email-field'
import { getDiary } from './Diary/fetch-diary'

function App () {
  const classes = useStyles()

  const [diary, setDiary] = useState(null)
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(startOfTomorrow())
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

  const showLoadingSpinner = (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CircularProgress />
      </div>
    </ThemeProvider>
  )

  if (diary === null) {
    return showLoadingSpinner
  }

  // TODO: validate Email and Confirm Email

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
            <EventCalendar
              id="event-date"
              label="Wedding / Event date"
              classes={classes}
              appointmentType={appointmentType}
            />
            <TextField id="your-name" label="Your Name" required variant="filled"/>
            <EmailField
              id="your-email"
              label="Your Email"
              confirmFieldId="confirm-your-email"
              confirmFieldLabel="Confirm Your Email"
              required
            />
            <TextField id="your-phone-no" label="Your phone number" required variant="filled"/>
            <TextField id="budget" label="Budget" variant="filled" />
            <TextField id="hear-about-us" label="How did you hear about us?" variant="filled" />
            <TextField id="message" label="Your message" multiline rowsMax="4" variant="filled" />
          </Container>
        </form>
      </div>
    </ThemeProvider>
  )
}

export default App
