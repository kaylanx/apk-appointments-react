import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { act } from 'react-dom/test-utils'
import user from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'

import startOfTomorrow from 'date-fns/startOfTomorrow'

import App from './App'
import { availabilityEveryDay } from '../test_data/fake-appointments'
import { successfulResponse } from '../test_data/fake-appointment-request-responses'

describe('appointments app', () => {
  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    global.fetch.mockClear()
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('check integration', async () => {
    mockFetchWithResponse(availabilityEveryDay)

    await act(async () => {
      render(<App />, container)
    })
    const input = document.querySelector('[id=appointment-date]')
    act(() => {
      user.click(input)
    })

    const expectedDate = startOfTomorrow().toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })

    const cal = document.querySelector('h4.MuiTypography-root, h4.MuiPickersToolbarText-toolbarTxt, h4.MuiPickersToolbarText-toolbarBtnSelected, h4.MuiTypography-h4, h4.MuiTypography-alignCenter')
    expect(cal.innerHTML).toEqual(expectedDate)
  })

  it('loading spinner shows if data is delayed', async () => {
    mockFetchWithResponse(null)

    render(<App />, container)

    const spinner = document.querySelector('[id=appointments-spinner]')
    expect(spinner).toBeDefined()
    expect(spinner).not.toBeNull()
    const svg = spinner.querySelector('svg.MuiCircularProgress-svg')
    expect(svg).toBeDefined()
    expect(svg).not.toBeNull()
  })

  it('Form displays appointment request sent message', async () => {
    mockFetchWithResponse(availabilityEveryDay)

    await act(async () => {
      render(<App />, container)
    })

    global.fetch.mockClear()
    mockFetchWithResponse(successfulResponse)

    const appointmentTimeInput = document.querySelector('[id=appointment-time]')
    const appointmentTypeInput = document.querySelector('[id=appointment-type]')
    const appointmentYourNameInput = document.querySelector('[id=your-name]')
    const appointmentYourEmailInput = document.querySelector('[id=your-email]')
    const appointmentConfirmYourEmailInput = document.querySelector('[id=confirm-your-email]')

    const appointmentYourPhoneNoInput = document.querySelector('[id=your-phone-no]')
    const appointmentYourBudgetInput = document.querySelector('[id=your-budget]')
    const appointmentHearAboutUsInput = document.querySelector('[id=hear-about-us]')
    const appointmentYourMessageInput = document.querySelector('[id=your-message]')

    act(() => {
      appointmentTimeInput.selectedIndex = 1
      appointmentTypeInput.selectedIndex = 1
      appointmentYourNameInput.value = 'Sebaceous Crumb'
      appointmentYourEmailInput.value = 'apk-appointment-unit-test@kayley.name'
      appointmentConfirmYourEmailInput.value = 'apk-appointment-unit-test@kayley.name'
      appointmentYourPhoneNoInput.value = '07900 000000'
      appointmentYourBudgetInput.value = '1 miiiiillllion dollars'
      appointmentHearAboutUsInput.value = 'T\'internet'
      appointmentYourMessageInput.value = 'Testing testing 1, 2, 1, 2'
    })

    const requestAppointmentButton = document.querySelector('[id=request-appointment-button]')
    act(() => {
      user.click(requestAppointmentButton)
    })

    await waitFor(() => {
      const successMessage = document.querySelector('[id=success-message]')
      expect(successMessage).toBeDefined()
      expect(successMessage).not.toBeNull()
      expect(successMessage.innerHTML).toEqual('Thanks, we will confirm your appointment shortly')

      expectElementToBeNull('appointment-date')
      expectElementToBeNull('appointment-time')
      expectElementToBeNull('appointment-type')
      expectElementToBeNull('your-email')
      expectElementToBeNull('confirm-your-email')
      expectElementToBeNull('your-phone-no')
      expectElementToBeNull('your-budget')
      expectElementToBeNull('hear-about-us')
      expectElementToBeNull('your-message')
      expectElementToBeNull('request-appointment-button')
    })
  })
})

const expectElementToBeNull = (selectorId) => {
  const htmlElement = document.querySelector(`[id=${selectorId}]`)
  expect(htmlElement).toBeNull()
}

const mockFetchWithResponse = (response) => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(response)
    })
  )
}
