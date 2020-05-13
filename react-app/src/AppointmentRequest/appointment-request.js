import { config } from '../Configuration'

async function sendAppointmentRequest (url, appointmentData) {
  let resStatus = 0

  await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(appointmentData)
  })
    .then(res => {
      resStatus = res.status
      return res.json()
    })
    .then(res => {
      switch (resStatus) {
        case 200:
        case 201:
          console.log('success')
          break
        case 400:
          if (res.code === 'ValidationFailed') {
          // My custom error messages from the API.
            console.log(res.fieldMessages)
          } else {
            console.log('this is a client (probably invalid JSON) error, but also might be a server error (bad JSON parsing/validation)')
          }
          break
        case 500:
          console.log('server error, try again')
          break
        default:
          console.log('unhandled')
          break
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export const requestAppointment = async (appointmentData) => sendAppointmentRequest(config.url.APPOINTMENT_REQUEST_URL, appointmentData)
