import React, { useState, useEffect } from 'react'

import {
  TextField,
  FormControl,
  InputLabel,
  Select
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

  function BridesmaidsField () {
    if (appointmentType === 'bridesmaids') {
      return (<TextField id="filled-basic" type="number" inputProps={{ inputMode: 'numeric' }} label="How many bridesmaids do you have?" variant="filled" />)
    }
    return null
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

  function AppointmentTypeField () {
    return (
      <FormControl required variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="appointment-type">Appointment Type</InputLabel>
        <Select
          native
          id="appointment-type"
          inputProps={{
            id: 'appointment-type'
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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <form className={classes.root} noValidate autoComplete="off">
          <CssBaseline />
          <Container maxWidth="lg">
            <AppointmentsCalendar id="appointment-date" label="Preferred Date" diary={diary} handleDateChange={setSelectedAppointmentDate} selectedDate={selectedAppointmentDate} />
            <AppointmentTime diary={diary} selectedDate={selectedAppointmentDate} classes={classes}/>
            <AppointmentTypeField />
            <BridesmaidsField />
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
