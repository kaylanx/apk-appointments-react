import * as firebase from 'firebase/app'
import 'firebase/analytics'

let firebaseConfig

export function initializeAnalytics (config) {
  firebaseConfig = config
  if (firebaseConfig !== undefined) {
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
  }
}

export function logEvent (eventName, eventParams, options) {
  if (firebaseConfig !== undefined) {
    const cleanedParams = cleanEventParamsOfPII(eventParams)
    firebase.analytics().logEvent(eventName, cleanedParams, options)
  }
}

export function cleanEventParamsOfPII (eventParams) {
  const cleanedParams = {}
  for (var attributename in eventParams) {
    if (attributename === 'confirm-your-email' ||
      attributename === 'your-email' ||
      attributename === 'your-name' ||
      attributename === 'your-phone-no') {
      const dirtyValue = eventParams[attributename]
      const cleanedValue = dirtyValue.replace(/./g, '*')
      cleanedParams[attributename] = cleanedValue
    } else {
      cleanedParams[attributename] = eventParams[attributename]
    }
  }

  return cleanedParams
}
