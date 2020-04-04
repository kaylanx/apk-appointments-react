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

    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(1)

    let index = 0
    expect(times[index++].textContent).toBe('')
  })

  it('list to contain no options when data is broken', async () => {
    const tuesdaySeventhApril = new Date('2020-04-07')
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={tuesdaySeventhApril} diary={{}} />, container)
    })

    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(1)

    let index = 0
    expect(times[index++].textContent).toBe('')
  })

  it('list to contain 12 hour format from 10am to 4pm', async () => {
    const mondayMarch30th2020 = new Date('2020-03-30')
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={mondayMarch30th2020} diary={actualSchedule} />, container)
    })

    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(8)

    let index = 0
    expect(times[index++].textContent).toBe('')
    expect(times[index++].textContent).toBe('10:00am')
    expect(times[index++].textContent).toBe('11:00am')
    expect(times[index++].textContent).toBe('12:00pm')
    expect(times[index++].textContent).toBe('1:00pm')
    expect(times[index++].textContent).toBe('2:00pm')
    expect(times[index++].textContent).toBe('3:00pm')
    expect(times[index++].textContent).toBe('4:00pm')
  })

  it('list to contain 24 hour format from 10:00 to 16:00', async () => {
    const mondayMarch30th2020 = new Date('2020-03-30')
    await act(async () => {
      render(<AppointmentTime id="appointment-time" selectedDate={mondayMarch30th2020} diary={actualSchedule24Hours} />, container)
    })

    const input = document.querySelector('[id=appointment-time]')
    clickInput(input)
    const times = document.querySelectorAll('option')
    expect(times).not.toBeUndefined()
    expect(times).toHaveLength(8)

    let index = 0
    expect(times[index++].textContent).toBe('')
    expect(times[index++].textContent).toBe('10:00')
    expect(times[index++].textContent).toBe('11:00')
    expect(times[index++].textContent).toBe('12:00')
    expect(times[index++].textContent).toBe('13:00')
    expect(times[index++].textContent).toBe('14:00')
    expect(times[index++].textContent).toBe('15:00')
    expect(times[index++].textContent).toBe('16:00')
  })
})

const clickInput = (input) => {
  act(() => {
    input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}
