import React from 'react'
import { render } from 'react-dom'
import App from './App'

import './index.css'

const target = document.querySelector('#apk-appointments')

render(
  <div>
    <App analyticsConfig={window.apkAppointmentsFirebaseConfig} />
  </div>,
  target
)
