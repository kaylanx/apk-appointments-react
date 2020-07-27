import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { NumberOfBridesmaids } from './number-of-bridesmaids'

describe('number of bridesmaids', () => {
  let container: HTMLDivElement
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (container !== null) {
      unmountComponentAtNode(container)
      container.remove()
    }
  })

  async function renderNumberOfBridesmaids (appointmentType: string): Promise<Element | null | undefined> {
    await act(async () => {
      render(<NumberOfBridesmaids id="number-of-bridesmaids" appointmentType={appointmentType} classes={{ formcontrol: 'dummy' }}/>, container)
    })
    const bridesmaidsField = container?.querySelector('[id=number-of-bridesmaids]')
    return bridesmaidsField
  }

  it('Not rendered if no appointment type ', async () => {
    const bridesmaidsField = await renderNumberOfBridesmaids('')
    expect(bridesmaidsField).toBeNull()
  })

  it('Not rendered if appointment type is bridal', async () => {
    const bridesmaidsField = await renderNumberOfBridesmaids('bridal')
    expect(bridesmaidsField).toBeNull()
  })

  it('Not rendered if appointment type is accessories', async () => {
    const bridesmaidsField = await renderNumberOfBridesmaids('accessories')
    expect(bridesmaidsField).toBeNull()
  })

  it('Rendered if appointment type is bridesmaids', async () => {
    const bridesmaidsField = await renderNumberOfBridesmaids('bridesmaids')
    expect(bridesmaidsField).not.toBeNull()
  })
})
