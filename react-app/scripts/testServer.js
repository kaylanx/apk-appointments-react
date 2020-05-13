const express = require('express')
const app = express()

const json = {
  schedule: {
    display: {
      format: 12
    },
    monday: {
      closed: false,
      availability: [
        { time: 10 }, { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    tuesday: {
      closed: false,
      availability: [
        { time: 10 }, { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    wednesday: {
      closed: false,
      availability: [
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }, { time: 17 }, { time: 18, fee: '£20' }, { time: 19, fee: '£20' }
      ]
    },
    thursday: {
      closed: true
    },
    friday: {
      closed: true
    },
    saturday: {
      closed: false,
      availability: [
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    sunday: {
      closed: false,
      availability: [{ time: 11, fee: '£20' }, { time: 12, fee: '£20' }, { time: 13, fee: '£20' }, { time: 14, fee: '£20' }, { time: 15, fee: '£20' }, { time: 16, fee: '£20' }]
    }
  },
  appointments: [
    { date: '2020-03-17', times: [{ time: 13 }], closed: false },
    { date: '2020-06-12', times: [{ time: 17 }], closed: false },
    { date: '2020-09-23', times: [{ time: 17 }], closed: false },
    { date: '2020-08-20', times: [{ time: 15 }], closed: false },
    { date: '2020-04-21', times: [{ time: 10 }, { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }], closed: false },
    { date: '2020-10-24', times: [], closed: true },
    { date: '2020-05-25', times: [], closed: true }
  ]
}

app.get('/appointments', (req, res) => res.send(json))

const validRequestSent = {
  into: '#',
  status: 'mail_sent',
  message: 'Thank you for your message. It has been sent.'
}

app.post('/request-appointment', (req, res) => res.send(validRequestSent))

app.listen(8080)
