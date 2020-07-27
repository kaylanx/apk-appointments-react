import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { act } from 'react-dom/test-utils'
import user from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'

import startOfTomorrow from 'date-fns/startOfTomorrow'

import App from './App'
import { availabilityEveryDay } from '../test_data/fake-appointments'
import { successfulResponse, notFoundResponse } from '../test_data/fake-appointment-request-responses'
import * as analytics from './Analytics/analytics'

function mockFetchWithResponse (response: any) {
  const mockJsonPromise = Promise.resolve(response)
  const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
  });
  var globalRef:any = global
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
}

describe('appointments app', () => {
  let container: HTMLElement
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    (global.fetch as jest.Mock).mockClear()
    unmountComponentAtNode(container)
    container.remove()
  })

  it('check integration', async () => {
    const initializeAnalytics = mockInitializeAnalytics()
    const logEvent = mockLogEvent()
    mockFetchWithResponse(availabilityEveryDay)

    await act(async () => {
      render(<App contactForm7FormId="1234" />, container)
    })
    const appointmentDateField = document.querySelector('[id=appointment-date]')!
    act(() => {
      user.click(appointmentDateField)
    })

    const expectedDate = startOfTomorrow().toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })

    const cal = document.querySelector('h4.MuiTypography-root, h4.MuiPickersToolbarText-toolbarTxt, h4.MuiPickersToolbarText-toolbarBtnSelected, h4.MuiTypography-h4, h4.MuiTypography-alignCenter')
    expect(cal?.innerHTML).toEqual(expectedDate)
    expect(initializeAnalytics).toHaveBeenCalled()
    expect(logEvent).toHaveBeenCalled()
  })

  it('loading spinner shows if data is delayed', async () => {
    mockFetchWithResponse(null)

    render(<App contactForm7FormId="1234" />, container)

    const spinner = document.querySelector('[id=appointments-spinner]')
    expect(spinner).toBeDefined()
    expect(spinner).not.toBeNull()
    const svg = spinner?.querySelector('svg.MuiCircularProgress-svg')
    expect(svg).toBeDefined()
    expect(svg).not.toBeNull()
  })

  it('Form displays appointment request sent message', async () => {
    mockFetchWithResponse(availabilityEveryDay)
    
    await act(async () => {
      render(<App contactForm7FormId="1234" />, container)
    })

    const gobalFetch = global.fetch as jest.Mock
    gobalFetch.mockClear()
    mockFetchWithResponse(successfulResponse)

    openCalendarClickOkButtonToSetDate()

    const appointmentTimeField = document.querySelector('[id=appointment-time]') as HTMLSelectElement
    const appointmentTypeField = document.querySelector('[id=appointment-type]') as HTMLSelectElement
    const appointmentYourNameField = document.querySelector('[id=your-name]') as HTMLInputElement
    const appointmentYourEmailField = document.querySelector('[id=your-email]') as HTMLInputElement
    const appointmentConfirmYourEmailField = document.querySelector('[id=confirm-your-email]') as HTMLInputElement

    const appointmentYourPhoneNoField = document.querySelector('[id=your-phone-no]') as HTMLInputElement
    const appointmentYourBudgetField = document.querySelector('[id=your-budget]') as HTMLInputElement
    const appointmentHearAboutUsField = document.querySelector('[id=hear-about-us]') as HTMLInputElement
    const appointmentYourMessageField = document.querySelector('[id=your-message]') as HTMLInputElement

    act(() => {
      appointmentTimeField.selectedIndex = 1
      appointmentTypeField.selectedIndex = 1
      appointmentYourNameField.value = 'Sebaceous Crumb'
      appointmentYourEmailField.value = 'apk-appointment-unit-test@kayley.name'
      appointmentConfirmYourEmailField.value = 'apk-appointment-unit-test@kayley.name'
      appointmentYourPhoneNoField.value = '07900 000000'
      appointmentYourBudgetField.value = '1 miiiiillllion dollars'
      appointmentHearAboutUsField.value = 'T\'internet'
      appointmentYourMessageField.value = 'Testing testing 1, 2, 1, 2'
    })

    const requestAppointmentButton = document.querySelector('[id=request-appointment-button]')!
    act(() => {
      user.click(requestAppointmentButton)
    })

    await waitFor(() => {
      const successMessage = document.querySelector('[id=success-message]')!
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

  it('Form displays error message when request fails', async () => {
    mockFetchWithResponse(availabilityEveryDay)

    await act(async () => {
      render(<App contactForm7FormId="1234" />, container)
    })

    const gobalFetch = global.fetch as jest.Mock
    gobalFetch.mockClear()
    mockFetchWithResponse(notFoundResponse)
    openCalendarClickOkButtonToSetDate()

    const appointmentTimeField = document.querySelector('[id=appointment-time]') as HTMLSelectElement
    const appointmentTypeField = document.querySelector('[id=appointment-type]') as HTMLSelectElement
    const appointmentYourNameField = document.querySelector('[id=your-name]') as HTMLInputElement
    const appointmentYourEmailField = document.querySelector('[id=your-email]') as HTMLInputElement
    const appointmentConfirmYourEmailField = document.querySelector('[id=confirm-your-email]') as HTMLInputElement

    const appointmentYourPhoneNoField = document.querySelector('[id=your-phone-no]') as HTMLInputElement
    const appointmentYourBudgetField = document.querySelector('[id=your-budget]') as HTMLInputElement
    const appointmentHearAboutUsField = document.querySelector('[id=hear-about-us]') as HTMLInputElement
    const appointmentYourMessageField = document.querySelector('[id=your-message]') as HTMLInputElement

    act(() => {
      appointmentTimeField.selectedIndex = 1
      appointmentTypeField.selectedIndex = 1
      appointmentYourNameField.value = 'Sebaceous Crumb'
      appointmentYourEmailField.value = 'apk-appointment-unit-test@kayley.name'
      appointmentConfirmYourEmailField.value = 'apk-appointment-unit-test@kayley.name'
      appointmentYourPhoneNoField.value = '07900 000000'
      appointmentYourBudgetField.value = '1 miiiiillllion dollars'
      appointmentHearAboutUsField.value = 'T\'internet'
      appointmentYourMessageField.value = 'Testing testing 1, 2, 1, 2'
    })

    const requestAppointmentButton = document.querySelector('[id=request-appointment-button]')!
    act(() => {
      user.click(requestAppointmentButton)
    })

    await waitFor(() => {
      const successMessage = document.querySelector('[id=error-requesting-appointment]')!
      expect(successMessage).toBeDefined()
      expect(successMessage).not.toBeNull()
      expect(successMessage.innerHTML).toEqual('Sorry, there was a problem sending the appointment request.  Please try again.')

      expectElementToBeNotNull('appointment-date')
      expectElementToBeNotNull('appointment-time')
      expectElementToBeNotNull('appointment-type')
      expectElementToBeNotNull('your-email')
      expectElementToBeNotNull('confirm-your-email')
      expectElementToBeNotNull('your-phone-no')
      expectElementToBeNotNull('your-budget')
      expectElementToBeNotNull('hear-about-us')
      expectElementToBeNotNull('your-message')
      expectElementToBeNotNull('request-appointment-button')
    })
  })
})

const openCalendarClickOkButtonToSetDate = () => {
  const appointmentDateField = document.querySelector('[id=appointment-date]')!
  act(() => {
    user.click(appointmentDateField)
  })

  const calendarActionButtons = document.querySelector('.MuiDialogActions-root')!.children
  expect(calendarActionButtons).not.toBeUndefined()
  expect(calendarActionButtons).toHaveLength(2)
  const okButton = calendarActionButtons[1]
  act(() => {
    user.click(okButton)
  })
}

const expectElementToBeNull = (selectorId: string) => {
  const htmlElement = document.querySelector(`[id=${selectorId}]`)
  expect(htmlElement).toBeNull()
}

const expectElementToBeNotNull = (selectorId: string) => {
  const htmlElement = document.querySelector(`[id=${selectorId}]`)
  expect(htmlElement).not.toBeNull()
}

const mockInitializeAnalytics = () => {
  return jest.spyOn(analytics, 'initializeAnalytics').mockImplementation()
}

const mockLogEvent = () => {
  return jest.spyOn(analytics, 'logEvent').mockImplementation()
}
