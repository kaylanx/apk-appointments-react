import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { AppointmentsCalendar } from './appointments-calendar'
import { useEffectGetAppointments } from './use-effect-get-appointments'
jest.mock('./use-effect-get-appointments')

describe('load appointments', () => {
  it('loading state', () => {
    useEffectGetAppointments.mockReturnValue({
      loading: true,
      data: null
    })

    const { container } = render(<AppointmentsCalendar />)

    expect(useEffectGetAppointments).toHaveBeenCalled()
    expect(container).toHaveTextContent('Preferred Date *')
  })

  it('today is disabled', () => {
    useEffectGetAppointments.mockReturnValue({
      loading: true,
      data: null
    })
    const { getByText } = render(<AppointmentsCalendar />)
    fireEvent.click(getByText(/Preferred Date */i))

    const today = new Date()
    const expectedDate = today.toLocaleString('en-US', {
      day: '2-digit'
    })

    const todayElement = getByText(expectedDate)
    expect(todayElement).not.toBeUndefined()
    expect(todayElement.parentNode.parentNode).toHaveClass('MuiPickersDay-dayDisabled')
  })
})
