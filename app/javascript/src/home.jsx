import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import './home.html.erb';


const Home = () => (
  <Layout>
  </Layout>
)



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
