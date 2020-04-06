import React, { findByText } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import App from './App'
import { actualSchedule } from './fake-appointments'

describe('appointments app', () => {
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

  it('check integration', async () => {
    mockFetchWithResponse(actualSchedule)

    await act(async () => {
      render(<App />, container)
    })
    const input = document.querySelector('[id=appointment-date]')
    act(() => {
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const expectedDate = tomorrow.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })

    const cal = document.querySelector('h4.MuiTypography-root, h4.MuiPickersToolbarText-toolbarTxt, h4.MuiPickersToolbarText-toolbarBtnSelected, h4.MuiTypography-h4, h4.MuiTypography-alignCenter')
    expect(cal.innerHTML).toEqual(expectedDate)
  })
})

const mockFetchWithResponse = (response) => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(response)
    })
  )
}
