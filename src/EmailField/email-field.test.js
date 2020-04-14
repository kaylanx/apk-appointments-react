import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { EmailField } from '../EmailField/email-field'

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

  it('Given email contains value, When Confirm field is clicked, Confirm field has error message', async () => {
    await act(async () => {
      render(
        <EmailField
          id="your-email"
          label="Your Email"
          confirmFieldId="confirm-your-email"
          confirmFieldLabel="Your Email"
          required
        />, container)
    })
    const emailField = container.querySelector('[id=your-email]')
    emailField.value = 'somevalue'

    const confirmEmailField = container.querySelector('[id=confirm-your-email]')
    confirmEmailField.focus()
    const confirmEmailFieldLabel = container.querySelector('[id=confirm-your-email-label]')
    expect(confirmEmailFieldLabel.className).toContain('Mui-error')
    const confirmEmailFieldHelperText = container.querySelector('[id=confirm-your-email-helper-text]')
    expect(confirmEmailFieldHelperText).not.toBeNull()
    expect(confirmEmailFieldHelperText.className).toContain('Mui-error')
  })

  /*
   Validate each field is a valid email address (i.e. contains one @ and at least one . after the @)
   Validate both fields are equal
   */
})
