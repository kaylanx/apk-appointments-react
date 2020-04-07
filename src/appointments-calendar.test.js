import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import format from 'date-fns/format'
import { act } from 'react-dom/test-utils'
import { AppointmentsCalendar } from './appointments-calendar'
import { fakeAppointments, closedOnThursdays } from './fake-appointments'

describe('appointments calendar', () => {
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

  it('today is disabled', async () => {
    await act(async () => {
      render(<AppointmentsCalendar id="appointments-calendar" diary={fakeAppointments} handleDateChange={(date) => {}} />, container)
    })

    const input = document.querySelector('[id=appointments-calendar]')

    expectFieldToContainTomorrowsDate(input)
    clickInput(input)
    expectTodayToBeDisabled()
  })

  it('thursdays are disabled', async () => {
    const firstJan2020 = new Date('2020-01-01')

    await act(async () => {
      render(<AppointmentsCalendar id="appointments-calendar" diary={closedOnThursdays} handleDateChange={(date) => {}} disablePast={false} minDate={firstJan2020} selectedDate={firstJan2020}/>, container)
    })

    const input = document.querySelector('[id=appointments-calendar]')

    expectFieldToContainFirstJan(input)
    clickInput(input)
    expectThursdaysInJan2020ToBeDisabled()
  })
})

const expectFieldToContainTomorrowsDate = (input) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  expectInputToHaveDate(input, tomorrow)
}

const expectFieldToContainFirstJan = (input) => {
  const firstJan2020 = new Date('2020-01-01')
  expectInputToHaveDate(input, firstJan2020)
}

const expectInputToHaveDate = (input, date) => {
  const expectedSelectedDate = format(date, 'EEE, d MMMM yy')
  expect(input.value).toBe(expectedSelectedDate)
}

const expectTodayToBeDisabled = () => {
  const today = new Date()
  const expectedDate = today.getDate().toString()

  const todayButton = document.querySelector('.MuiPickersDay-current')
  expect(todayButton).toHaveClass('MuiPickersDay-dayDisabled')

  const paragraph = todayButton.querySelector('p')
  expect(paragraph.innerHTML).toBe(expectedDate)
}

const expectThursdaysInJan2020ToBeDisabled = () => {
  const numberOfThursdaysInJan2020 = 5
  const secondOfJan2020 = 2

  const disabledDays = document.querySelectorAll('.MuiPickersDay-dayDisabled:not(.MuiPickersDay-hidden)')
  expect(disabledDays).not.toBeUndefined()
  expect(disabledDays).toHaveLength(numberOfThursdaysInJan2020)

  let thursday = secondOfJan2020
  for (let i = 0; i < numberOfThursdaysInJan2020; i++) {
    const paragraph = disabledDays[i].querySelector('p')
    expect(paragraph.innerHTML).toBe('' + thursday)
    thursday += 7
  }
}

const clickInput = (input) => {
  act(() => {
    input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}
