import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { EmailField } from '../EmailField/email-field'
import { fireEvent } from '@testing-library/react'

describe('email field', () => {
  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('Renders email and confirm field', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]')
    expect(emailField).not.toBeNull()
    const emailFieldLabel = container.querySelector('[id=your-email-label]')
    expect(emailFieldLabel.textContent).toBe('Your Email *')

    const confirmEmailField = container.querySelector('[id=confirm-your-email]')
    expect(confirmEmailField).not.toBeNull()
    const confirmEmailFieldLabel = container.querySelector('[id=confirm-your-email-label]')
    expect(confirmEmailFieldLabel.textContent).toBe('Confirm Your Email *')
    expect(confirmEmailFieldLabel.className).not.toContain('Mui-error')
    const confirmEmailFieldHelperText = container.querySelector('[id=confirm-your-email-helper-text]')
    expect(confirmEmailFieldHelperText).toBeNull()
  })

  it('Given email contains value, When Confirm field gets focus, Confirm field has error message', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]')
    setFieldValue(emailField, 'somevalue@somedomain.com')

    const confirmEmailField = container.querySelector('[id=confirm-your-email]')
    confirmEmailField.focus()

    expectConfirmEmailContainsError(container)
  })

  it('Given email contains value, When confirm field also contains a value and values are not equal, Confirm field has error message', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]')
    setFieldValue(emailField, 'somevalue@somedomain.com')

    const confirmEmailField = container.querySelector('[id=confirm-your-email]')
    confirmEmailField.focus()
    setFieldValue(emailField, 'somevalueOtherValue@somedomain.com')
    emailField.focus()

    expectConfirmEmailContainsError(container)
  })

  it('Given email contains value, When confirm field also contains a value and values are equal, Confirm field has no error message', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]')
    setFieldValue(emailField, 'somevalue@somedomain.com')

    const confirmEmailField = container.querySelector('[id=confirm-your-email]')
    confirmEmailField.focus()
    setFieldValue(confirmEmailField, 'somevalue@somedomain.com')

    emailField.focus()
    expectConfirmEmailDoesNotContainError(container)
  })

  /*
   Validate each field is a valid email address (i.e. contains one @ and at least one . after the @)
   */
})

function setFieldValue (field, value) {
  fireEvent.change(field, { target: { value: value } })
  expect(field.value).toBe(value)
}

async function renderEmailFieldInContainer (container) {
  await act(async () => {
    render(
      <EmailField
        id="your-email"
        label="Your Email"
        confirmFieldId="confirm-your-email"
        confirmFieldLabel="Confirm Your Email"
        required
      />, container)
  })
}

function expectConfirmEmailContainsError (container) {
  const confirmEmailFieldLabel = container.querySelector('[id=confirm-your-email-label]')
  expect(confirmEmailFieldLabel.className).toContain('Mui-error')
  const confirmEmailFieldHelperText = container.querySelector('[id=confirm-your-email-helper-text]')
  expect(confirmEmailFieldHelperText).not.toBeNull()
  expect(confirmEmailFieldHelperText.className).toContain('Mui-error')
}

function expectConfirmEmailDoesNotContainError (container) {
  const confirmEmailFieldLabel = container.querySelector('[id=confirm-your-email-label]')
  expect(confirmEmailFieldLabel.className).not.toContain('Mui-error')
  const confirmEmailFieldHelperText = container.querySelector('[id=confirm-your-email-helper-text]')
  expect(confirmEmailFieldHelperText).toBeNull()
}
