import React from 'react'
import ReactDOM from 'react-dom'

import './home.scss';


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})

