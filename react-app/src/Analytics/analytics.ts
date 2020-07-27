import * as firebase from 'firebase/app'
import 'firebase/analytics'

let firebaseConfig: {} | undefined

export function initializeAnalytics (config: {} | undefined): void {
  firebaseConfig = config
  if (firebaseConfig !== undefined) {
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
  }
}

export function cleanEventParamsOfPII (eventParams: Map<string, string|number>): Map<string, string|number> {
  const cleanedParams = new Map<string, string|number>()

  for (const [key, value] of eventParams) {
    if (key === 'confirm-your-email' ||
    key === 'your-email' ||
    key === 'your-name' ||
    key === 'your-phone-no') {
      if (typeof value === 'string') {
        const dirtyValue = value
        const cleanedValue = dirtyValue.replace(/./g, '*')
        cleanedParams.set(key, cleanedValue)
      } else {
        cleanedParams.set(key, value)
      }
    } else {
      cleanedParams.set(key, value)
    }
  }

  return cleanedParams
}

export function logEvent (
  eventName: string,
  eventParams: Map<string, string>,
  options?: firebase.analytics.AnalyticsCallOptions
): void {
  if (firebaseConfig !== undefined) {
    const cleanedParams = cleanEventParamsOfPII(eventParams)
    firebase.analytics().logEvent(eventName, cleanedParams, options)
  }
}
