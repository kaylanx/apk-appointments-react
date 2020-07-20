import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { AppointmentType } from './appointment-type'

describe('appointments type', () => {
  let container: HTMLElement | null = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (container !== null) {
      unmountComponentAtNode(container)
      container.remove()
      container = null
    }
  })

  const clickInput = (input: Element | null): void => {
    act(() => {
      if (input !== null) {
        input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      }
    })
  }

  it('types to contain bridal, bridesmaids and accessories', async () => {
    const handleAppointmentTypeChange = (event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
  }>, child: React.ReactNode): void => {
      console.log('event = ' + event + '; child = ' + child)
    }
    await act(async () => {
      render(<AppointmentType id="appointment-type" classes={{ formcontrol: 'dummy' }} appointmentType="" handleAppointmentTypeChange={handleAppointmentTypeChange}/>, container)
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
