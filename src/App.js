import React, { useState } from 'react';
import './App.css';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import isTomorrow from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const disabledDates = (date) => {
  console.log(date)
  console.log(typeof date)
  console.log(Object.prototype.toString.call(date))
  //return date.getDay() === 0 || date.getDay() === 6;

  return isTomorrow(date)
}

function App() {
  
  const [selectedDate, handleDateChange] = useState(new Date("2020-03-12"));

  const classes = useStyles();


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
              minDate={new Date("2020-03-12")}
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
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <TextField id="filled-basic" label="Filled" variant="filled" />

          <TextField id="standard-basic" label="Standard" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
    </div>
  );
}

export default App;

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