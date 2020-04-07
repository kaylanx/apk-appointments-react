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
        10, 11, 12, 13, 14, 15, 16
      ]
    },
    tuesday: {
      closed: false,
      availability: [
        10, 11, 12, 13, 14, 15, 16
      ]
    },
    wednesday: {
      closed: false,
      availability: [
        11, 12, 13, 14, 15, 16, 17
      ],
      chargable: {
        fee: '£20',
        hours: [18, 19]
      }
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
        11, 12, 13, 14, 15, 16
      ]
    },
    sunday: {
      closed: false,
      availability: [],
      chargable: {
        fee: '£20',
        hours: [11, 12, 13, 14, 15, 16]
      }
    }
  },
  appointments: [
    { date: '2020-03-17', times: [13], closed: false },
    { date: '2020-06-12', times: [17], closed: false },
    { date: '2020-09-23', times: [17], closed: false },
    { date: '2020-08-20', times: [15], closed: false },
    { date: '2020-10-24', times: [], closed: true }]
}

app.get('/appointments', (req, res) => res.send(json))

app.listen(8080)
