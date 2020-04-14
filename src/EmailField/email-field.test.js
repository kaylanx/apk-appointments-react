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
          confirmFieldLabel="Your Email"
          required
        />, container)
    })
    const emailField = container.querySelector('[id=your-email]')
    expect(emailField).not.toBeNull()

    const confirmEmailField = container.querySelector('[id=confirm-your-email]')
    expect(confirmEmailField).not.toBeNull()
  })
})
