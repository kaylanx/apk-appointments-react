import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { EventCalendar } from './event-calendar'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

describe('event calendar', () => {
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

  async function renderEventCalendar (appointmentType: string): Promise<Element | null | undefined> {
    const handleDateChange = function (date: MaterialUiPickersDate): void {
      console.log('handleDateChange.date = ' + date)
    }

    await act(async () => {
      render(<EventCalendar id="event-calendar" appointmentType={appointmentType} classes={{ formcontrol: 'dummy' }} handleDateChange={handleDateChange}/>, container)
    })
    const eventDateField = container?.querySelector('[id=event-calendar]')
    return eventDateField
  }

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
})
