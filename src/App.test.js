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
  const cal = await findByText('Mon, Mar 16')
  expect(cal).toBeInTheDocument()

  // findBy
})

test('renders preferred time field', () => {
  const { getByText } = render(<App />)
  const preferredDateField = getByText(/Preferred Time */i)
  expect(preferredDateField).toBeInTheDocument()
})
