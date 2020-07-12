import { config } from '../Configuration'

async function sendAppointmentRequest (url, appointmentData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: appointmentData
    })

    if (response.ok === false) {
      throw new Error('Response not ok')
    }

    const json = await response.json()
    return { status: json.status || 'failure' }
  } catch (err) {
    return { status: 'failure' }
  }
}

export const requestAppointment = async (appointmentData) => sendAppointmentRequest(config.url.APPOINTMENT_REQUEST_URL, appointmentData)
