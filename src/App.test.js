import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

test('renders preferred date field', () => {
  const { getByText } = render(<App />)
  const preferredDateField = getByText(/Preferred Date */i)
  expect(preferredDateField).toBeInTheDocument()
})

test('calendar appears after textfield tap', async () => {
  const { getByText, findByText } = render(<App />)
  fireEvent.click(getByText(/Preferred Date */i))

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const expectedDate = tomorrow.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit'
  })

  const cal = await findByText(expectedDate)
  expect(cal).toBeInTheDocument()
})

test('today is disabled', async () => {
  const { getByText, findByText } = render(<App />)
  fireEvent.click(getByText(/Preferred Date */i))

  const today = new Date()
  const expectedDate = today.toLocaleString('en-US', {
    day: '2-digit'
  })
  const todayElement = await findByText(expectedDate)
  expect(todayElement.parentNode.parentNode).toHaveClass('MuiPickersDay-dayDisabled')
})

test('tomorrow is enabled', async () => {
  const { getByText, findByText } = render(<App />)
  fireEvent.click(getByText(/Preferred Date */i))

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const expectedDate = tomorrow.toLocaleString('en-US', {
    day: '2-digit'
  })
  const tomorrowElement = await findByText(expectedDate)
  expect(tomorrowElement.parentNode.parentNode).not.toHaveClass('MuiPickersDay-dayDisabled')
})

test('two days from now is enabled', async () => {
  const { getByText, findByText } = render(<App />)
  fireEvent.click(getByText(/Preferred Date */i))

  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
  const expectedDate = dayAfterTomorrow.toLocaleString('en-US', {
    day: '2-digit'
  })
  const tomorrowElement = await findByText(expectedDate)
  expect(tomorrowElement.parentNode.parentNode).not.toHaveClass('MuiPickersDay-dayDisabled')
})

test('renders preferred time field', () => {
  const { getByText } = render(<App />)
  const preferredDateField = getByText(/Preferred Time */i)
  expect(preferredDateField).toBeInTheDocument()
})
