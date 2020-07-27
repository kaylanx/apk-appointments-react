import { config } from '../Configuration'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendAppointmentRequest (formId: string, url: string, appointmentData: Map<string, string>): Promise<any> {
  try {
    const formData: FormData = new FormData()

    for (const key of appointmentData.keys()) {
      formData.append(key, appointmentData.get(key) ?? '')
    }

    const finalUrl = url?.replace(/\{formId\}/g, formId) ?? ''

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

export const requestAppointment = async (formId: string, appointmentData: Map<string, string>) => sendAppointmentRequest(formId, config.url.APPOINTMENT_REQUEST_URL!, appointmentData)
