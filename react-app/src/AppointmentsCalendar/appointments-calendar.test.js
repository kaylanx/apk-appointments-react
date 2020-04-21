import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import format from 'date-fns/format'
import { act } from 'react-dom/test-utils'

import startOfTomorrow from 'date-fns/startOfTomorrow'

import { AppointmentsCalendar } from './appointments-calendar'
import { fakeAppointments, closedOnThursdays, actualSchedule24Hours } from '../../test_data/fake-appointments'

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
      render(<AppointmentsCalendar id="appointments-calendar" classes={{ formcontrol: 'dummy' }} diary={fakeAppointments} handleDateChange={(date) => {}} />, container)
    })

    const input = document.querySelector('[id=appointments-calendar]')

    expectFieldToContainTomorrowsDate(input)
    clickInput(input)
    expectTodayToBeDisabled()
  })

  it('thursdays are disabled', async () => {
    const firstJan2020 = new Date('2020-01-01')

    await act(async () => {
      render(<AppointmentsCalendar id="appointments-calendar" classes={{ formcontrol: 'dummy' }} diary={closedOnThursdays} handleDateChange={(date) => {}} disablePast={false} minDate={firstJan2020} selectedDate={firstJan2020}/>, container)
    })

    const input = document.querySelector('[id=appointments-calendar]')

    expectFieldToContainFirstJan(input)
    clickInput(input)
    expectThursdaysInJan2020ToBeDisabled()
  })

  it('all appointments booked on seventh april', async () => {
    const firstApril2020 = new Date('2020-04-01')
    await act(async () => {
      render(
        <AppointmentsCalendar
          id="appointments-calendar"
          classes={{ formcontrol: 'dummy' }}
          diary={actualSchedule24Hours}
          handleDateChange={(date) => {}}
          disablePast={false}
          minDate={firstApril2020}
          selectedDate={firstApril2020}
        />,
        container)
    })

    const input = document.querySelector('[id=appointments-calendar]')

    expectFieldToContainFirstApril(input)
    clickInput(input)
    expectTueSeventhApril2020ToBeDisabled()
  })
})

const expectFieldToContainTomorrowsDate = (input) => {
  expectInputToHaveDate(input, startOfTomorrow())
}

const expectFieldToContainFirstJan = (input) => {
  const firstJan2020 = new Date('2020-01-01')
  expectInputToHaveDate(input, firstJan2020)
}

const expectFieldToContainFirstApril = (input) => {
  const firstApril2020 = new Date('2020-04-01')
  expectInputToHaveDate(input, firstApril2020)
}

const expectInputToHaveDate = (input, date) => {
  const expectedSelectedDate = format(date, 'EEE, d MMMM yy')
  expect(input.value).toBe(expectedSelectedDate)
}

const expectTodayToBeDisabled = () => {
  const today = new Date()
  const expectedDate = today.getDate().toString()

  const button = document.querySelector('.MuiPickersDay-current')
  expect(button).toHaveClass('MuiPickersDay-dayDisabled')

  const paragraph = button.querySelector('p')
  expect(paragraph.innerHTML).toBe(expectedDate)
}

const expectTueSeventhApril2020ToBeDisabled = () => {
  const date = new Date('2020-04-07')
  const expectedDate = date.getDate().toString()
  const numberOfThursdays = 5
  const numberOfFridays = 4
  const numberOfDaysClosedDueToNotBeingOpen = numberOfThursdays + numberOfFridays
  const numberOfDaysClosedIncludingSeventh = numberOfDaysClosedDueToNotBeingOpen + 1

  const disabledDays = document.querySelectorAll('.MuiPickersDay-dayDisabled:not(.MuiPickersDay-hidden)')
  expect(disabledDays).not.toBeUndefined()
  expect(disabledDays).toHaveLength(numberOfDaysClosedIncludingSeventh)
  expect(disabledDays).toBeInstanceOf(NodeList)

  const actualDate = Array.from(disabledDays).map(disabledDay => disabledDay.querySelector('p'))
    .filter(paragraph => paragraph.innerHTML === '' + expectedDate)

  expect(actualDate).not.toBeUndefined()
  expect(actualDate).toBeInstanceOf(Array)
  expect(actualDate).toHaveLength(1)
  expect(actualDate[0].innerHTML).toBe('' + expectedDate)
}

const expectThursdaysInJan2020ToBeDisabled = () => {
  const numberOfThursdaysInJan2020 = 5
  const secondOfJan2020 = 2

  const disabledDays = document.querySelectorAll('.MuiPickersDay-dayDisabled:not(.MuiPickersDay-hidden)')
  expect(disabledDays).not.toBeUndefined()
  expect(disabledDays).toHaveLength(numberOfThursdaysInJan2020)

  let thursday = secondOfJan2020
  for (let i = 0; i < disabledDays.length; i++) {
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