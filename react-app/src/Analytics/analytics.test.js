import * as firebase from 'firebase'
import 'firebase/analytics'

import { initializeAnalytics, logEvent } from './analytics'

describe('analytics', () => {
  let firebaseInitializeApp
  let firebaseAnalytics
  let firebaseLogEvent

  beforeEach(() => {
    firebaseInitializeApp = mockInitializeApp()
    firebaseAnalytics = mockAnalytics()
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
    logEvent('testing 1,2')
    expect(firebaseInitializeApp).not.toHaveBeenCalled()
    expect(firebaseAnalytics).not.toHaveBeenCalled()
    expect(firebaseLogEvent).not.toHaveBeenCalled()
  })

  it('test firebase analytics logEvent called successfully', async () => {
    const config = {}
    initializeAnalytics(config)
    logEvent('testing 1,2')
    expect(firebaseInitializeApp).toHaveBeenCalled()
    expect(firebaseAnalytics).toHaveBeenCalled()
    expect(firebaseLogEvent).toHaveBeenCalled()
  })

  const mockInitializeApp = () => {
    return jest.spyOn(firebase, 'initializeApp').mockImplementation()
  }

  const mockAnalytics = () => {
    return jest.spyOn(firebase, 'analytics').mockImplementation(() => ({
      logEvent: firebaseLogEvent
    }))
  }
})
