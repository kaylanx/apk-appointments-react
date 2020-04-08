export const fakeAppointments = {
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
        11, 12, 13, 14, 15, 16
      ]
    },
    tuesday: {
      closed: false,
      availability: [
        11, 12, 13, 14, 15, 16
      ]
    },
    wednesday: {
      closed: false,
      availability: [
        11, 12, 13, 14, 15, 16
      ]
    },
    thursday: {
      closed: false,
      availability: [
        11, 12, 13, 14, 15, 16
      ]    },
    friday: {
      closed: false,
      availability: [
        11, 12, 13, 14, 15, 16
      ]    },
    saturday: {
      closed: false,
      availability: [
        11, 12, 13, 14, 15, 16
      ]
    },
    sunday: {
      closed: false,
      availability: [11, 12, 13, 14, 15, 16]
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
  appointments: [{
    date: '2020-04-07',
    times: [
      10, 11, 12, 13, 14, 15, 16
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
  appointments: [{
    date: '2020-04-07',
    times: [
      10, 11, 12, 13, 14, 15, 16
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
  appointments: [{
    date: '2020-03-24',
    times: [
      10
    ],
    closed: false
  }]
}
