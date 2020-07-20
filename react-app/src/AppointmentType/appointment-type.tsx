import * as React from 'react'
import {
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

interface Props {
  id?: string;
  label?: string;
  classes?: ClassNameMap;
  appointmentType: string;
  handleAppointmentTypeChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void;
}

export function AppointmentType ({
  id = 'appointment-type',
  label = 'Appointment Type',
  classes,
  appointmentType,
  handleAppointmentTypeChange
}: Props): JSX.Element {
  return (
    <FormControl required variant="filled" className={classes?.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native
        id={id}
        inputProps={{
          id: id
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
