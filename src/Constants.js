const prod = {
  url: {
    API_URL: 'http://farringtonbridal.co.uk/wp-json/apk-appointments/v1/appointments'
  }
}

const dev = {
  url: {
    API_URL: 'http://localhost:3000/appointments'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod
