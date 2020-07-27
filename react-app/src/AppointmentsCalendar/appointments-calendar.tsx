import * as React from 'react'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
import startOfTomorrow from 'date-fns/startOfTomorrow'

import {
  isDayClosed,
  getAppointmentsForDay,
  isClosedOnDate,
  Diary
} from '../Diary/diary'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

interface Props {
  id?: string;
  label?: string;
  classes?: ClassNameMap;
  diary: Diary;
  disablePast?: boolean;
  minDate?: Date;
  selectedDate: Date | null;
  handleDateChange: (date: MaterialUiPickersDate) => void;
}

export function AppointmentsCalendar ({
  id = 'appointment-date',
  label = 'Preferred Date',
  classes,
  diary,
  disablePast = true,
  minDate = startOfTomorrow(),
  selectedDate = startOfTomorrow(),
  handleDateChange
}: Props): JSX.Element {
  const determineDisabledDate = (diary: Diary, date: Date): boolean => {
    const remainingTimes = getAppointmentsForDay(diary, date)
    return remainingTimes.length === 0
  }

  const disabledDates = (materialDate: MaterialUiPickersDate): boolean => {
    const date = materialDate as Date
    if (isClosedOnDate(diary, date)) {
      return true
    }

    if (isDayClosed(diary, date)) {
      return true
    }

    return determineDisabledDate(diary, date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        id={id}
        label={label}
        required
        className={classes?.formControl}
        value={selectedDate}
        onChange={handleDateChange}
        disablePast={disablePast}
        autoOk={true}
        minDate={minDate}
        shouldDisableDate={disabledDates}
        inputVariant="filled"
        format="EE, d MMMM yy" />
    </MuiPickersUtilsProvider>
  )
}
