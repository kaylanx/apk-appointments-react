import React, { useState, useEffect } from 'react'

import { TextField } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'

import startOfTomorrow from 'date-fns/startOfTomorrow'

import './App.css'
import { AppointmentsCalendar } from './AppointmentsCalendar/appointments-calendar'
import { AppointmentTime } from './AppointmentTime/appointment-time'
import { getDiary } from './Diary/fetch-diary'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9b7e97',
      main: '#825e7e',
      dark: '#5b4158',
      contrastText: '#fff'
    },
    secondary: {
      light: '#f9f9f9',
      main: '#f8f8f8',
      dark: '#adadad',
      contrastText: '#000'
    }
  }
})

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
      padding: theme.spacing(1),
      width: '100%'
    }
  },
  formControl: {
    padding: theme.spacing(1),
    width: '100%'
  }
}))

function App () {
  const classes = useStyles()

  const [diary, setDiary] = useState(null)
  const [selectedDate, setSelectedDate] = useState(startOfTomorrow())

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
    <ThemeProvider theme={theme}>
      <div className="App">
        <form className={classes.root} noValidate autoComplete="off">
          <CssBaseline />
          <Container maxWidth="lg">
            <AppointmentsCalendar id="appointment-date" diary={diary} handleDateChange={handleDateChange} selectedDate={selectedDate} />
            <AppointmentTime diary={diary} selectedDate={selectedDate} classes={classes}/>
            <TextField id="filled-basic" label="Filled" variant="filled" />

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
