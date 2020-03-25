import { getDaysClosed } from './diary'
import { fakeAppointments } from './fake-appointments'

const multipleDaysClosed = [
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

describe('load appointments', () => {
  it('1 day closed', () => {
    const daysClosed = getDaysClosed(fakeAppointments)
    expect(daysClosed).toBeDefined()
    const expectedDates = [new Date('2020-10-24')]
    expect(daysClosed).toEqual(expectedDates)
  })

  it('multiple days closed', () => {
    const daysClosed = getDaysClosed(multipleDaysClosed)
    expect(daysClosed).toBeDefined()
    const expectedDates = [new Date('2020-02-27'), new Date('2020-11-11'), new Date('2020-10-24')]
    expect(daysClosed).toEqual(expectedDates)
  })

})
