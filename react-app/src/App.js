import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button, TextField, CircularProgress } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { ThemeProvider } from '@material-ui/core/styles'

import startOfTomorrow from 'date-fns/startOfTomorrow'
import { format } from 'date-fns'

import { theme, useStyles } from './Theme/theme'
import { AppointmentsCalendar } from './AppointmentsCalendar/appointments-calendar'
import { AppointmentTime } from './AppointmentTime/appointment-time'
import { AppointmentType } from './AppointmentType/appointment-type'
import { NumberOfBridesmaids } from './NumberOfBridesmaids/number-of-bridesmaids'
import { EventCalendar } from './EventCalendar/event-calendar'
import { EmailField } from './EmailField/email-field'
import { getDiary } from './Diary/fetch-diary'
import { requestAppointment } from './AppointmentRequest/appointment-request'
import { initializeAnalytics, logEvent } from './Analytics/analytics'

App.propTypes = {
  analyticsConfig: PropTypes.object
}

function App ({
  analyticsConfig
}) {
  const classes = useStyles()

  const [diary, setDiary] = useState(null)
  const [responseStatus, setResponseStatus] = useState('')
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(startOfTomorrow())
  const [selectedEventDate, setSelectedEventDate] = useState(null)
  const [appointmentType, setAppointmentType] = useState('')
  const [dataToLog, setDataToLog] = useState({})

  async function fetchData () {
    const data = await getDiary()
    setDiary(data)
  }

  useEffect(() => {
    initializeAnalytics(analyticsConfig)
    fetchData()
  }, [analyticsConfig])

  useEffect(() => {
    logEvent(responseStatus, dataToLog)
  }, [dataToLog, responseStatus])

  const handleAppointmentTypeChange = (event) => {
    setAppointmentType(event.target.value)
  }

  const showLoadingSpinner = (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CircularProgress id="appointments-spinner" />
      </div>
    </ThemeProvider>
  )

  const showMessageSent = (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1 id="success-message">Thanks, we will confirm your appointment shortly</h1>
      </div>
    </ThemeProvider>
  )

  async function onSubmit (event) {
    event.preventDefault()
    setResponseStatus('')
    const form = event.target
    const data = {}
    for (const element of form.elements) {
      if (element.tagName === 'BUTTON') { continue }
      data[element.id] = element.value
    }
    data['appointment-date'] = format(selectedAppointmentDate, 'yyyy-MM-dd')
    data['event-date'] = selectedEventDate ? format(selectedEventDate, 'yyyy-MM-dd') : ''
    setDataToLog(data)
    const response = await requestAppointment(data)
    setResponseStatus(response.status)
  }

  if (diary === null) {
    return showLoadingSpinner
  }

  if (responseStatus === 'mail_sent') {
    return showMessageSent
  }

  function showErrorMessage () {
    if (responseStatus === 'failure') {
      return (
        <div id="error-requesting-appointment" classes={classes.formControl}>Sorry, there was a problem sending the appointment request.  Please try again.</div>
      )
    }
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>
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
              selectedDate={selectedEventDate}
              handleDateChange={setSelectedEventDate}
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
            <TextField id="your-budget" label="Budget" variant="filled" />
            <TextField id="hear-about-us" label="How did you hear about us?" variant="filled" />
            <TextField id="your-message" label="Your message" multiline rowsMax="4" variant="filled" />
            {showErrorMessage()}
            <Button
              id="request-appointment-button"
              variant="contained"
              color="primary"
              className={classes.formControl}
              type="submit"
            >
              Book Appointment
            </Button>
          </Container>
        </form>
      </div>
    </ThemeProvider>
  )
}

export default App
