import { config } from '../Configuration'

async function sendAppointmentRequest (formId, url, appointmentData) {
  try {
    const formData = new FormData()

    for (const key in appointmentData) {
      formData.append(key, appointmentData[key])
    }

    const finalUrl = url.replace(/\{formId\}/g, formId)

    const response = await fetch(finalUrl, {
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

export const requestAppointment = async (formId, appointmentData) => sendAppointmentRequest(formId, config.url.APPOINTMENT_REQUEST_URL, appointmentData)
