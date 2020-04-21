import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import startOfTomorrow from 'date-fns/startOfTomorrow'

import App from './App'
import { availabilityEveryDay } from '../test_data/fake-appointments'

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
    mockFetchWithResponse(availabilityEveryDay)

    await act(async () => {
      render(<App />, container)
    })
    const input = document.querySelector('[id=appointment-date]')
    act(() => {
      input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    const expectedDate = startOfTomorrow().toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })

    const cal = document.querySelector('h4.MuiTypography-root, h4.MuiPickersToolbarText-toolbarTxt, h4.MuiPickersToolbarText-toolbarBtnSelected, h4.MuiTypography-h4, h4.MuiTypography-alignCenter')
    expect(cal.innerHTML).toEqual(expectedDate)
  })

  it('loading spinner shows if data is delayed', async () => {
    mockFetchWithResponse(null)

    await act(async () => {
      render(<App />, container)
    })

    const spinner = document.querySelector('[id=appointments-spinner]')
    expect(spinner).toBeDefined()
    expect(spinner).not.toBeNull()
    const svg = spinner.querySelector('svg.MuiCircularProgress-svg')
    expect(svg).toBeDefined()
    expect(svg).not.toBeNull()
  })
})

const mockFetchWithResponse = (response) => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(response)
    })
  )
}
