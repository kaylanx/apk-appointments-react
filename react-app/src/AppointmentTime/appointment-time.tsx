import * as React from 'react'
import {
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'
import { getAppointmentsForDay, getFormattedTime, Diary } from '../Diary/diary'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

interface Props {
  id?: string;
  label?: string;
  classes?: ClassNameMap;
  diary: Diary;
  selectedDate: Date | null;
}

export function AppointmentTime ({
  id = 'appointment-time',
  label = 'Preferred Time',
  classes,
  diary,
  selectedDate
}: Props): JSX.Element {
  const appointmentAvailability = getAppointmentsForDay(diary, selectedDate)

  return (
    <FormControl required variant="filled" className={classes?.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native
        id={id}
        inputProps={{
          id: id
        }}
        disabled={selectedDate === null}
      >
        <option aria-label="None" value="" />
        {appointmentAvailability.map((time, index) => <option key={index} value={time.time}>{getFormattedTime(diary, time)}</option>)}
      </Select>
    </FormControl>
  )
}
