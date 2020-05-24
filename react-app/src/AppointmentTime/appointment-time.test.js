import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { AppointmentTime } from '../AppointmentTime/appointment-time'
import { actualSchedule, actualSchedule24Hours } from '../../test_data/fake-appointments'

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
    const expectedTimeValues = ['', '10', '11', '12', '13', '14', '15', '16']
    await assertExpectedTimeValuesForDateAndSchedule(mondayMarch30th2020, diary, expectedTimeValues)
  })

  it('list to contain 24 hour format from 10:00 to 16:00', async () => {
    const mondayMarch30th2020 = new Date('2020-03-30')
    const diary = actualSchedule24Hours
    const expectedTimes = ['', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    await assertExpectedTimesForDateAndSchedule(mondayMarch30th2020, diary, expectedTimes)
    const expectedTimeValues = ['', '10', '11', '12', '13', '14', '15', '16']
    await assertExpectedTimeValuesForDateAndSchedule(mondayMarch30th2020, diary, expectedTimeValues)
  })

  async function expectNoOptions (selectedDate, diary) {
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={selectedDate} diary={diary} classes={{ formcontrol: 'dummy' }} />, container)
    })
    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(1)
    let index = 0
    expect(times[index++].textContent).toBe('')
  }

  async function assertExpectedTimesForDateAndSchedule (date, diary, expectedTimes) {
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={date} diary={diary} classes={{ formcontrol: 'dummy' }} />, container)
    })
    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(8)

    const actualTimes = Array.from(times).map((time) => time.textContent)
    expect(actualTimes).toEqual(expect.arrayContaining(expectedTimes))
  }

  async function assertExpectedTimeValuesForDateAndSchedule (date, diary, expectedTimeValues) {
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={date} diary={diary} classes={{ formcontrol: 'dummy' }} />, container)
    })
    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(8)

    const actualTimeValues = Array.from(times).map((time) => time.value)
    expect(actualTimeValues).toEqual(expect.arrayContaining(expectedTimeValues))
  }
})

const clickInput = (input) => {
  act(() => {
    input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}
