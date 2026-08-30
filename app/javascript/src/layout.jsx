import React from 'react';
import './layout.scss';

const Layout = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/" aria-label="Twitter home">
            <i className="fa-brands fa-twitter"></i>
          </a>

          <div className="navbar-right">
            <button type="button" className="btn btn-primary">
              English
            </button>
          </div>
        </div>
      </nav>

      <main className="main">
        <div className="container">
          <div className="row">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;