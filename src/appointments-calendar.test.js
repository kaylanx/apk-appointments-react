import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { AppointmentsCalendar } from './appointments-calendar'
import fakeAppointments from './fake-appointments'

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
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeAppointments)
      })
    )

    await act(async () => {
      render(<AppointmentsCalendar id="appointments-calendar" />, container)
    })

    const input = document.querySelector('[id=appointments-calendar]')

    expectFieldToContainTomorrowsDate(input)

    act(() => {
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expectTodayToBeDisabled()
  })
})

const expectFieldToContainTomorrowsDate = (input) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const expectedSelectedMonth = tomorrow.toLocaleString('en-US', {
    month: 'long'
  })

  const expectedSelectedDate = expectedSelectedMonth + ' ' + englishOrdinalSuffix(tomorrow)

  expect(input.value).toBe(expectedSelectedDate)
}

const expectTodayToBeDisabled = () => {
  const today = new Date()
  const expectedDate = today.toLocaleString('en-US', {
    day: '2-digit'
  })

  const todayButton = document.querySelector('.MuiPickersDay-current')
  expect(todayButton).toHaveClass('MuiPickersDay-dayDisabled')

  const paragraph = todayButton.querySelector('p')
  expect(paragraph.innerHTML).toBe(expectedDate)
}

const englishOrdinalSuffix = (dt) => {
  return dt.getDate() + (dt.getDate() % 10 === 1 && dt.getDate() !== 11 ? 'st' : (dt.getDate() % 10 === 2 && dt.getDate() !== 12 ? 'nd' : (dt.getDate() % 10 === 3 && dt.getDate() !== 13 ? 'rd' : 'th')))
}
