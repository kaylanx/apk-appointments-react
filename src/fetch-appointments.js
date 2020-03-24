import { config } from './Constants'

export async function fetchAppointments (url, options = {}) {
  const response = await fetch(url, options)
  const json = await response.json()
  return json
}

export const getAppointments = async () => fetchAppointments(config.url.API_URL)
