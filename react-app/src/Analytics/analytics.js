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
    firebase.analytics().logEvent(eventName, eventParams, options)
  }
}
