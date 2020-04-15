import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [fieldsValid, setFieldsValid] = useState(true)
  const [confirmFieldError, setConfirmedFieldError] = useState(false)
  const [confirmFieldErrorMessage, setConfirmedFieldErrorMessage] = useState('')

  const displayErrorMessage = (shouldDisplay) => {
    setConfirmedFieldError(shouldDisplay)
    setConfirmedFieldErrorMessage(shouldDisplay ? 'Email addresses do not match' : '')
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleConfirmEmailChange = (event) => {
    setConfirmEmail(event.target.value)
  }

  useEffect(() => {
    const validateEmailsMatch = () => {
      return email === confirmEmail
    }

    const validateEmails = () => {
      setFieldsValid(validateEmailsMatch())
      displayErrorMessage(!fieldsValid)
    }

    validateEmails()
  }, [email, confirmEmail, fieldsValid])

  return (
    <span>
      <TextField
        id={id}
        label={label}
        required={required}
        variant="filled"
        onChange={handleEmailChange}
        value={email}
      />
      <TextField
        error={confirmFieldError}
        helperText={confirmFieldErrorMessage}
        id={confirmFieldId}
        label={confirmFieldLabel}
        required={required}
        variant="filled"
        onChange={handleConfirmEmailChange}
        value={confirmEmail}
      />
    </span>
  )
}
