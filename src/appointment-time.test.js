import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { AppointmentTime } from './appointment-time'
import { actualSchedule, actualSchedule24Hours } from './fake-appointments'

describe('appointments time', () => {
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

  it('list to contain no options when closed', async () => {
    const thursdayNinthApril = new Date('2020-04-09')
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={thursdayNinthApril} diary={actualSchedule} />, container)
    })
    await expectNoOptions(thursdayNinthApril, actualSchedule)
  })

  it('list to contain no options when data is broken', async () => {
    const tuesdaySeventhApril = new Date('2020-04-07')
    const diary = {}
    await expectNoOptions(tuesdaySeventhApril, diary)
  })

  it('list to contain 12 hour format from 10am to 4pm', async () => {
    const mondayMarch30th2020 = new Date('2020-03-30')
    const diary = actualSchedule
    const expectedTimes = ['', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm']
    await assertExpectedTimesForDateAndSchedule(mondayMarch30th2020, diary, expectedTimes)
  })

  it('list to contain 24 hour format from 10:00 to 16:00', async () => {
    const mondayMarch30th2020 = new Date('2020-03-30')
    const diary = actualSchedule24Hours
    const expectedTimes = ['', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    await assertExpectedTimesForDateAndSchedule(mondayMarch30th2020, diary, expectedTimes)
  })

  async function expectNoOptions (selectedDate, diary) {
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={selectedDate} diary={diary} />, container)
    })
    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(1)
    let index = 0
    expect(times[index++].textContent).toBe('')
  }

  async function assertExpectedTimesForDateAndSchedule (mondayMarch30th2020, diary, expectedTimes) {
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={mondayMarch30th2020} diary={diary} />, container)
    })
    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(8)

    const actualTimes = Array.from(times).map((time) => time.textContent)
    expect(actualTimes).toEqual(expect.arrayContaining(expectedTimes))
  }
})

const clickInput = (input) => {
  act(() => {
    input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}
