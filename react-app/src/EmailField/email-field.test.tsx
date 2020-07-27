import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { EmailField } from './email-field'
import { fireEvent } from '@testing-library/react'

describe('email field', () => {
  let container: HTMLDivElement
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
  })

  it('Renders email and confirm field', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]')
    expect(emailField).not.toBeNull()
    const emailFieldLabel = container.querySelector('[id=your-email-label]') as HTMLInputElement
    expect(emailFieldLabel.textContent).toBe('Your Email *')

    const confirmEmailField = container.querySelector('[id=confirm-your-email]')
    expect(confirmEmailField).not.toBeNull()
    const confirmEmailFieldLabel = container.querySelector('[id=confirm-your-email-label]') as HTMLInputElement
    expect(confirmEmailFieldLabel.textContent).toBe('Confirm Your Email *')
    expect(confirmEmailFieldLabel.className).not.toContain('Mui-error')
    const confirmEmailFieldHelperText = container.querySelector('[id=confirm-your-email-helper-text]')
    expect(confirmEmailFieldHelperText).toBeNull()
  })

  it('Given email contains value, When Confirm field gets focus, Confirm field has error message', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]') as HTMLInputElement
    setFieldValue(emailField, 'somevalue@somedomain.com')

    const confirmEmailField = container.querySelector('[id=confirm-your-email]') as HTMLInputElement
    confirmEmailField.focus()

    expectConfirmEmailContainsError(container)
  })

  it('Given email contains value, When confirm field also contains a value and values are not equal, Confirm field has error message', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]') as HTMLInputElement
    setFieldValue(emailField, 'somevalue@somedomain.com')

    const confirmEmailField = container.querySelector('[id=confirm-your-email]') as HTMLInputElement
    confirmEmailField.focus()
    setFieldValue(emailField, 'somevalueOtherValue@somedomain.com')
    emailField.focus()

    expectConfirmEmailContainsError(container)
  })

  it('Given email contains value, When confirm field also contains a value and values are equal, Confirm field has no error message', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]') as HTMLInputElement
    setFieldValue(emailField, 'somevalue@somedomain.com')

    const confirmEmailField = container.querySelector('[id=confirm-your-email]') as HTMLInputElement
    confirmEmailField.focus()
    setFieldValue(confirmEmailField, 'somevalue@somedomain.com')

    emailField.focus()
    expectConfirmEmailDoesNotContainError(container)
  })

  it('Given email contains invalid email address then error field has an error message', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]') as HTMLInputElement
    setFieldValue(emailField, 'somevalue')

    emailField.focus()
    expectEmailContainsError(container)
  })

  it('Given email contains valid email address then error field has an error message', async () => {
    await renderEmailFieldInContainer(container)

    const emailField = container.querySelector('[id=your-email]') as HTMLInputElement
    setFieldValue(emailField, 'somevalue@somedomain.com')

    emailField.focus()
    expectEmailDoesNotContainsError(container)
  })
})

function setFieldValue (field: HTMLInputElement, value: string) {
  fireEvent.change(field, { target: { value: value } })
  expect(field.value).toBe(value)
}

async function renderEmailFieldInContainer (container: HTMLDivElement) {
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

function expectEmailContainsError (container: HTMLDivElement) {
  const emailFieldLabel = container.querySelector('[id=your-email-label]') as HTMLInputElement
  expect(emailFieldLabel.className).toContain('Mui-error')
  const emailFieldHelperText = container.querySelector('[id=your-email-helper-text]') as HTMLInputElement
  expect(emailFieldHelperText).not.toBeNull()
  expect(emailFieldHelperText.className).toContain('Mui-error')
}

function expectEmailDoesNotContainsError (container: HTMLDivElement) {
  const emailFieldLabel = container.querySelector('[id=your-email-label]') as HTMLInputElement
  expect(emailFieldLabel.className).not.toContain('Mui-error')
  const emailFieldHelperText = container.querySelector('[id=your-email-helper-text]') as HTMLInputElement
  expect(emailFieldHelperText).toBeNull()
}

function expectConfirmEmailContainsError (container: HTMLDivElement) {
  const confirmEmailFieldLabel = container.querySelector('[id=confirm-your-email-label]') as HTMLInputElement
  expect(confirmEmailFieldLabel.className).toContain('Mui-error')
  const confirmEmailFieldHelperText = container.querySelector('[id=confirm-your-email-helper-text]') as HTMLInputElement
  expect(confirmEmailFieldHelperText).not.toBeNull()
  expect(confirmEmailFieldHelperText.className).toContain('Mui-error')
}

function expectConfirmEmailDoesNotContainError (container: HTMLDivElement) {
  const confirmEmailFieldLabel = container.querySelector('[id=confirm-your-email-label]') as HTMLInputElement
  expect(confirmEmailFieldLabel.className).not.toContain('Mui-error')
  const confirmEmailFieldHelperText = container.querySelector('[id=confirm-your-email-helper-text]') as HTMLInputElement
  expect(confirmEmailFieldHelperText).toBeNull()
}
