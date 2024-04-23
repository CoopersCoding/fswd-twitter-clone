// layout.jsx

import React from 'react';
import './layout.scss'


const Layout = (props) => {
  return (
    <React.Fragment>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      </head>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
            <i class="fa-brands fa-twitter"></i>
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                language: <strong>English </strong><span className="caret"></span>
              </a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">Bahasa Malaya</a></li>
                <li><a href="#">Dansk</a></li>
                <li><a href="#">English</a></li>
                <li><a href="#">Suomi</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main">
        <div className="container">
          <div className="row">
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}


export default Layout;