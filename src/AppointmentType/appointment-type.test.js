import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { AppointmentType } from '../AppointmentType/appointment-type'

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

  it('types to contain bridal, bridesmaids and accessories', async () => {
    await act(async () => {
      render(<AppointmentType id="appointment-type" classes={{ formcontrol: 'dummy' }} appointmentType="" handleAppointmentTypeChange={(appointmentType) => {}}/>, container)
    })
    const input = document.querySelector('[id=appointment-type]')
    clickInput(input)
    const appointmentTypes = document.querySelectorAll('option')
    expect(appointmentTypes).not.toBeUndefined()
    expect(appointmentTypes).toHaveLength(4)

    const expectedTypes = ['', 'bridal', 'bridesmaids', 'accessories']

    const actualAppointmentTypes = Array.from(appointmentTypes).map((time) => time.value)
    expect(actualAppointmentTypes).toEqual(expect.arrayContaining(expectedTypes))
  })
})

const clickInput = (input) => {
  act(() => {
    input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}
