export const fakeAppointments = {
  schedule: {},
  appointments: [
    {
      date: '2020-03-17',
      times: [
        13
      ],
      closed: false
    },
    {
      date: '2020-06-12',
      times: [
        17
      ],
      closed: false
    },
    {
      date: '2020-09-23',
      times: [
        17
      ],
      closed: false
    },
    {
      date: '2020-08-20',
      times: [
        15
      ],
      closed: false
    },
    {
      date: '2020-10-24',
      times: [],
      closed: true
    },
    {
      date: '2020-11-26',
      times: [
        18
      ],
      closed: false
    }
  ]
}

export const multipleDaysClosed = {
  schedule: {},
  appointments: [
    {
      date: '2020-03-17',
      times: [
        13
      ],
      closed: false
    },
    {
      date: '2020-06-12',
      times: [
        17
      ],
      closed: false
    },
    {
      date: '2020-02-27',
      times: [],
      closed: true
    },
    {
      date: '2020-09-23',
      times: [
        17
      ],
      closed: false
    },
    {
      date: '2020-11-11',
      times: [],
      closed: true
    },
    {
      date: '2020-08-20',
      times: [
        15
      ],
      closed: false
    },
    {
      date: '2020-10-24',
      times: [],
      closed: true
    },
    {
      date: '2020-11-26',
      times: [
        18
      ],
      closed: false
    }
  ]
}

/*
Monday    - 10:00 - 16:30
Tuesday   - 10:00 - 16:30
Wednesday - 11:00 - 20:00 - (18:00 - 20:00 £20 fee)
Thursday  - Closed
Friday    - Closed
Saturday  - 11:00 - 16:00
Sunday    - 11:00 - 16:00 (£20 fee)
*/

export const closedOnThursdays = {
  schedule: {
    thursday: {
      closed: true
    }
  },
  appointments: []
}
