const express = require('express')
const app = express()

const json = [{ date: '2020-03-17', times: [13], closed: false }, { date: '2020-06-12', times: [17], closed: false }, { date: '2020-09-23', times: [17], closed: false }, { date: '2020-08-20', times: [15], closed: false }, { date: '2020-10-24', times: [], closed: true }]

app.get('/appointments', (req, res) => res.send(json))

app.listen(8080)
