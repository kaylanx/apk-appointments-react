import { config } from '../Configuration'

async function sendAppointmentRequest (url, appointmentData) {
  try {
    const formData = new FormData()

    for (const key in appointmentData) {
      formData.append(key, appointmentData[key])
    }

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: formData
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
