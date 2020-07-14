import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { EventCalendar } from '../EventCalendar/event-calendar'

describe('event calendar', () => {
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

  it('Not rendered if no appointment type ', async () => {
    const eventDateField = await renderEventCalendar('')
    expect(eventDateField).toBeNull()
  })

  it('Rendered if appointment type is bridal', async () => {
    const eventDateField = await renderEventCalendar('bridal')
    expect(eventDateField).not.toBeNull()
  })

  it('Not rendered if appointment type is accessories', async () => {
    const eventDateField = await renderEventCalendar('accessories')
    expect(eventDateField).toBeNull()
  })

  it('Rendered if appointment type is bridesmaids', async () => {
    const eventDateField = await renderEventCalendar('bridesmaids')
    expect(eventDateField).not.toBeNull()
  })

  async function renderEventCalendar (appointmentType) {
    await act(async () => {
      render(<EventCalendar id="event-calendar" appointmentType={appointmentType} classes={{ formcontrol: 'dummy' }} handleDateChange={(date) => {}}/>, container)
    })
    const eventDateField = container.querySelector('[id=event-calendar]')
    return eventDateField
  }
})
