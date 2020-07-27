import * as firebase from 'firebase'
import 'firebase/analytics'

import { initializeAnalytics, logEvent, cleanEventParamsOfPII } from './analytics'

describe('analytics', () => {
  let firebaseInitializeApp: jest.SpyInstance
  let firebaseAnalytics: jest.SpyInstance
  let firebaseLogEvent: jest.Mock

  beforeEach(() => {
    firebaseInitializeApp = jest.spyOn(firebase, 'initializeApp').mockImplementation()
    firebaseAnalytics = jest.spyOn(firebase, 'analytics')
    firebaseAnalytics.mockImplementation(() => ({ logEvent: firebaseLogEvent }))
    firebaseLogEvent = jest.fn()
  })

  afterEach(() => {
    firebaseInitializeApp.mockClear()
    firebaseAnalytics.mockClear()
    firebaseLogEvent.mockClear()
  })

  it('test firebase analytics does not initializes if config undefined', async () => {
    let config
    initializeAnalytics(config)
    expect(firebaseInitializeApp).not.toHaveBeenCalled()
    expect(firebaseAnalytics).not.toHaveBeenCalled()
  })

  it('test firebase analytics initializes successfully', async () => {
    const config = {}
    initializeAnalytics(config)
    expect(firebaseInitializeApp).toHaveBeenCalled()
    expect(firebaseAnalytics).toHaveBeenCalled()
  })

  it('test firebase analytics logEvent not called if analytics not if not initialized', async () => {
    let config
    initializeAnalytics(config)
    logEvent('testing 1,2', new Map<string, string>())
    expect(firebaseInitializeApp).not.toHaveBeenCalled()
    expect(firebaseAnalytics).not.toHaveBeenCalled()
    expect(firebaseLogEvent).not.toHaveBeenCalled()
  })

  it('test firebase analytics logEvent called successfully', async () => {
    const config = {}
    initializeAnalytics(config)
    logEvent('testing 1,2', new Map<string, string>())
    expect(firebaseInitializeApp).toHaveBeenCalled()
    expect(firebaseAnalytics).toHaveBeenCalled()
    expect(firebaseLogEvent).toHaveBeenCalled()
  })

  it('test no names email addresses and phone numbers are logged', async () => {
    const dirtyParams = new Map<string, string|number>([
      ['appointment-date', 'Wed, 10 June 20'],
      ['appointment-time', 12],
      ['appointment-type', 'bridesmaids'],
      ['confirm-your-email', 'a@b.c'],
      ['event-date', 'Wed, 10 June 20'],
      ['hear-about-us', ''],
      ['number-of-bridesmaids', 2],
      ['your-budget', ''],
      ['your-email', 'a@b.c'],
      ['your-message', ''],
      ['your-name', 'A'],
      ['your-phone-no', '123']
    ])

    const expectedCleanedParams = new Map<string, string|number>([
      ['appointment-date', 'Wed, 10 June 20'],
      ['appointment-time', 12],
      ['appointment-type', 'bridesmaids'],
      ['confirm-your-email', '*****'],
      ['event-date', 'Wed, 10 June 20'],
      ['hear-about-us', ''],
      ['number-of-bridesmaids', 2],
      ['your-budget', ''],
      ['your-email', '*****'],
      ['your-message', ''],
      ['your-name', '*'],
      ['your-phone-no', '***']
    ])

    const cleanedParams = cleanEventParamsOfPII(dirtyParams)

    expect(cleanedParams).toEqual(expectedCleanedParams)
  })
})
