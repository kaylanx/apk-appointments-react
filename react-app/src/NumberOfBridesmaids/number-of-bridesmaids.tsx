import * as React from 'react'
import { TextField } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles/withStyles'

interface Props {
  id?: string;
  label?: string;
  classes?: ClassNameMap;
  appointmentType: string;
}

export function NumberOfBridesmaids ({ id, label, classes, appointmentType }: Props): JSX.Element | null {
  if (appointmentType === 'bridesmaids') {
    return (
      <TextField
        id={id}
        label={label}
        className={classes?.formControl}
        type="number"
        inputProps={{ inputMode: 'numeric' }}
        variant="filled"
      />)
  }
  return null
}
