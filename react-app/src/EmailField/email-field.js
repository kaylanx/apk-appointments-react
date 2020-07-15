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

  const [emailFieldError, setEmailFieldError] = useState(false)
  const [emailFieldErrorMessage, setEmailFieldErrorMessage] = useState('')
  const [confirmFieldError, setConfirmedFieldError] = useState(false)
  const [confirmFieldErrorMessage, setConfirmedFieldErrorMessage] = useState('')

  const showEmailsDontMatchMessage = (shouldDisplay) => {
    setConfirmedFieldError(shouldDisplay)
    setConfirmedFieldErrorMessage(shouldDisplay ? 'Email addresses do not match' : '')
  }

  const showInvalidEmailMessage = (shouldDisplay) => {
    setEmailFieldError(shouldDisplay)
    setEmailFieldErrorMessage(shouldDisplay ? 'Invalid Email addresses' : '')
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
      showInvalidEmailMessage(email !== '' && !emailRegex.test(email))
      showEmailsDontMatchMessage(!validateEmailsMatch())
    }

    validateEmails()
  }, [email, confirmEmail])

  return (
    <span>
      <TextField
        error={emailFieldError}
        helperText={emailFieldErrorMessage}
        id={id}
        type="email"
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
        type="email"
        label={confirmFieldLabel}
        required={required}
        variant="filled"
        onChange={handleConfirmEmailChange}
        value={confirmEmail}
      />
    </span>
  )
}

// eslint-disable-next-line no-control-regex
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
