import * as React from 'react'
import { TextField } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles/withStyles'

interface Props {
  id?: string;
  label?: string;
  classes?: ClassNameMap;
  appointmentType: string;
}

export function NumberOfBridesmaids (props: Props): JSX.Element | null {
  if (props.appointmentType === 'bridesmaids') {
    return (
      <TextField
        id={props.id}
        label={props.label}
        className={props.classes?.formControl}
        type="number"
        inputProps={{ inputMode: 'numeric' }}
        variant="filled"
      />)
  }
  return null
}
