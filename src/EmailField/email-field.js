import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Container from '@material-ui/core/Container'
import { TextField } from '@material-ui/core'

EmailField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  confirmFieldId: PropTypes.string,
  confirmFieldLabel: PropTypes.string,
  required: PropTypes.bool
}

export function EmailField ({
  id,
  label,
  confirmFieldId,
  confirmFieldLabel,
  required = null
}) {
  const [confirmFieldError, setConfirmedFieldError] = useState(false)
  const [confirmFieldErrorMessage, setConfirmedFieldErrorMessage] = useState('')
  const validateEmails = (event) => {
    setConfirmedFieldError(true)
    setConfirmedFieldErrorMessage('Error')
  }

  return (
    <Container>
      <TextField id={id} label={label} required={required} variant="filled" />
      <TextField error={confirmFieldError} helperText={confirmFieldErrorMessage} id={confirmFieldId} label={confirmFieldLabel} required={required} variant="filled" onFocus={validateEmails} />
    </Container>
  )
}
