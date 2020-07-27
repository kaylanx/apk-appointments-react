import * as React from 'react'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

interface Props {
  id?: string;
  label?: string;
  classes?: ClassNameMap;
  appointmentType: string;
  selectedDate: Date | null;
  handleDateChange: (date: MaterialUiPickersDate) => void;
}

export function EventCalendar ({
  id,
  label,
  classes,
  appointmentType,
  selectedDate,
  handleDateChange
}: Props): JSX.Element | null {
  if (appointmentType === 'bridal' || appointmentType === 'bridesmaids') {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          id={id}
          label={label}
          className={classes?.formControl}
          required
          autoOk={true}
          value={selectedDate}
          onChange={handleDateChange}
          inputVariant="filled"
          format="EE, d MMMM yy" />
      </MuiPickersUtilsProvider>
    )
  }
  return null
}
