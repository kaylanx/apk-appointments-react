export const fakeAppointments = {
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
    {
      date: '2020-03-17',
      times: [
        { time: 13 }
      ],
      closed: false
    },
    {
      date: '2020-06-12',
      times: [
        { time: 17 }
      ],
      closed: false
    },
    {
      date: '2020-09-23',
      times: [
        { time: 17 }
      ],
      closed: false
    },
    {
      date: '2020-08-20',
      times: [
        { time: 15 }
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
        { time: 18 }
      ],
      closed: false
    }
  ]
}

export const multipleDaysClosed = {
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
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }, { time: 17 }, { time: 18, fee: '£20' }, { time: 18, fee: '£20' }
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
    {
      date: '2020-03-17',
      times: [
        { time: 13 }
      ],
      closed: false
    },
    {
      date: '2020-06-12',
      times: [
        { time: 17 }

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
        { time: 15 }
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
        { time: 18 }
      ],
      closed: false
    }
  ]
}

export const closedOnThursdays = {
  schedule: {
    thursday: {
      closed: true
    }
  },
  appointments: []
}

export const availabilityEveryDay = {
  schedule: {
    display: {
      format: 12
    },
    monday: {
      closed: false,
      availability: [
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    tuesday: {
      closed: false,
      availability: [
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    wednesday: {
      closed: false,
      availability: [
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    thursday: {
      closed: false,
      availability: [
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    friday: {
      closed: false,
      availability: [
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    saturday: {
      closed: false,
      availability: [
        { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
      ]
    },
    sunday: {
      closed: false,
      availability: [{ time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }]
    }
  },
  appointments: []
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
export const actualSchedule = {
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
  appointments: [{
    date: '2020-04-07',
    times: [
      { time: 10 }, { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
    ],
    closed: false
  }]
}

export const actualSchedule24Hours = {
  schedule: {
    display: {
      format: 24
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
  appointments: [{
    date: '2020-04-07',
    times: [
      { time: 10 }, { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
    ],
    closed: false
  }]
}

export const actualScheduleWith1AppointmentBookedOn24March = {
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
  appointments: [{
    date: '2020-03-24',
    times: [
      { time: 10 }
    ],
    closed: false
  }]
}

export const actualScheduleWith2AppointmentsBookedOn24March = {
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
  appointments: [{
    date: '2020-03-24',
    times: [
      { time: 10 }, { time: 11 }
    ],
    closed: false
  }]
}

export const actualScheduleWithAllAppointmentsBookedOn24March = {
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
  appointments: [{
    date: '2020-03-24',
    times: [
      { time: 10 }, { time: 11 }, { time: 12 }, { time: 13 }, { time: 14 }, { time: 15 }, { time: 16 }
    ],
    closed: false
  }]
}
