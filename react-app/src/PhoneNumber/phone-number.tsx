import * as React from 'react'
import { RefObject, forwardRef } from 'react'
import TextField, { 
    StandardTextFieldProps, 
    FilledTextFieldProps, 
    OutlinedTextFieldProps 
} from '@material-ui/core/TextField'

const phoneInput = (
    props: (JSX.IntrinsicAttributes & StandardTextFieldProps) | (JSX.IntrinsicAttributes & FilledTextFieldProps) | (JSX.IntrinsicAttributes & OutlinedTextFieldProps), 
    ref: ((instance: any) => void) | RefObject<any> | null | undefined) => {

  return (
    <TextField
      {...props}
      inputRef={ref}
      variant='filled'
      label='Your phone number'
      name='your-phone-no'
      required
    />
  )
}
export default forwardRef(phoneInput)