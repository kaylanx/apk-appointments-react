import React from 'react'
import { render } from 'react-dom'
import App from './App'

import './index.css'

const target = document.querySelector('#apk-appointments')

const analyticsConfig = JSON.parse(target.attributes['data-analytics-config'].nodeValue)
const contactForm7FormId = target.attributes['data-contact-form-7-form-id'].nodeValue

render(
  <div>
    <App analyticsConfig={analyticsConfig} contactForm7FormId={contactForm7FormId} />
  </div>,
  target
)
