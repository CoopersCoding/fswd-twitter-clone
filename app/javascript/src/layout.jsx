// layout.jsx

import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                language: <strong>English </strong><span className="caret"></span>
              </a>
              <ul className="dropdown-menu row" role="menu">
                <li className="col-xs-12"><a href="#">Bahasa Malaya</a></li>
                <li className="col-xs-12"><a href="#">Dansk</a></li>
                <li className="col-xs-12"><a href="#">English</a></li>
                <li className="col-xs-12"><a href="#">Suomi</a></li>
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