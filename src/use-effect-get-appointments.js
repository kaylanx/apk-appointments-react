import { useState, useEffect } from 'react'
import { getAppointments } from './fetch-appointments'

export function useEffectGetAppointments () {
  const [appointments, setAppointments] = useState({ loading: true, data: null })

  async function fetchData () {
    const data = await getAppointments()
    setAppointments({ loading: false, data })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return appointments
}
