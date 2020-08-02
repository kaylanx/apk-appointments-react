import * as React from 'react'
import { useState, useEffect } from 'react'

import { Button, TextField, CircularProgress } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { ThemeProvider } from '@material-ui/core/styles'
import Input, { isPossiblePhoneNumber } from 'react-phone-number-input/input'
import CustomPhoneNumber from './PhoneNumber/phone-number'

import { format } from 'date-fns'

import { theme, useStyles, PropsClasses, StyleProps } from './Theme/theme'
import { AppointmentsCalendar } from './AppointmentsCalendar/appointments-calendar'
import { AppointmentTime } from './AppointmentTime/appointment-time'
import { AppointmentType } from './AppointmentType/appointment-type'
import { NumberOfBridesmaids } from './NumberOfBridesmaids/number-of-bridesmaids'
import { EventCalendar } from './EventCalendar/event-calendar'
import { EmailField } from './EmailField/email-field'
import { getDiary } from './Diary/fetch-diary'
import { requestAppointment } from './AppointmentRequest/appointment-request'
import { initializeAnalytics, logEvent } from './Analytics/analytics'
import { Diary } from './Diary/diary'

interface Props {
  analyticsConfig?: object;
  contactForm7FormId: string;
}

function App ({
  analyticsConfig,
  contactForm7FormId
}: Props): JSX.Element {
  const classes: PropsClasses = useStyles({} as StyleProps);

  const [diary, setDiary] = useState<Diary | null>(null)
  const [responseStatus, setResponseStatus] = useState('')
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState<Date | null>(null)
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null)
  const [appointmentType, setAppointmentType] = useState('')
  const [dataToLog, setDataToLog] = useState(new Map<string, string>())
  const [phoneNumber, setPhoneNumber] = useState()

  async function fetchData (): Promise<void> {
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

  const handleAppointmentTypeChange = (event: React.ChangeEvent): void => {
    const input = event.target as HTMLInputElement
    setAppointmentType(input.value)
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

  async function onSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setResponseStatus('')
    const form = event.currentTarget
    const data = new Map<string, string>()

    for (let index = 0; index < form.elements.length; index++) {
      const element = form.elements[index] as HTMLInputElement
      if (element.tagName === 'BUTTON') { continue }
      data.set(element.id, element.value)
    }

    if (selectedAppointmentDate !== null) {
      data.set('appointment-date', format(selectedAppointmentDate, 'yyyy-MM-dd'))
    }
    
    if (selectedEventDate !== null) {
      data.set('event-date', format(selectedEventDate, 'yyyy-MM-dd'))
    }
    setDataToLog(data)
    const response = await requestAppointment(contactForm7FormId, data)
    setResponseStatus(response.status)
  }

  if (diary === null) {
    return showLoadingSpinner
  }

  if (responseStatus === 'mail_sent') {
    return showMessageSent
  }

  function showErrorMessage (): JSX.Element | null {
    if (responseStatus === 'failure') {
      return (
        <div id="error-requesting-appointment" className={classes.root}>Sorry, there was a problem sending the appointment request.  Please try again.</div>
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
              handleDateChange={setSelectedAppointmentDate as any}
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
              handleAppointmentTypeChange={handleAppointmentTypeChange as any}
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
              handleDateChange={setSelectedEventDate as any}
            />
            <TextField id="your-name" label="Your Name" required variant="filled"/>
            <EmailField
              id="your-email"
              label="Your Email"
              confirmFieldId="confirm-your-email"
              confirmFieldLabel="Confirm Your Email"
              required
            />
            <Input
              id='your-phone-no'
              placeholder='Enter phone number'
              value={phoneNumber}
              onChange={setPhoneNumber}
              inputComponent={CustomPhoneNumber}
              country="GB"
              required
              error={phoneNumber !== undefined && (!isPossiblePhoneNumber(phoneNumber))}
              helperText={phoneNumber !== undefined ? (isPossiblePhoneNumber(phoneNumber) ? undefined : 'Please check your phone number is correct') : undefined}
            />
            <TextField id="hear-about-us" label="How did you hear about us?" variant="filled" />
            <TextField id="your-message" label="Your message" multiline rowsMax="4" variant="filled" />
            {showErrorMessage()}
            <Button
              id="request-appointment-button"
              variant="contained"
              color="primary"
              className={classes.root}
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
