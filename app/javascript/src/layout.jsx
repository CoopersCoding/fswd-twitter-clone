// layout.jsx

import React from 'react';
import './layout.scss'


const Layout = (props) => {
  return (
    <React.Fragment>
      <nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
      <i class="fa-brands fa-twitter"></i>
      </a>
    </div>
    <ul class="nav navbar-nav navbar-right">

    <div class="btn-group">
  <button type="button" class="btn btn-primary">English</button>
  <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Volcun</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>

      
    </ul>
  </div>
</nav>

<div id="homeback">
  <div class="container">
    <div class="row">
      <div class="front-card col-xs-10 col-xs-offset-1">
        <div class="col-xs-6 welcome">
          <div id="welcome-text">
            <h1><strong>Welcome to Twitter.</strong></h1>
            <p>Connect with your friends and the world around you on Twitter.</p>
          </div>
          <p><a href="#" id="twit-info">Altcademy Twitter Project</a></p>
          <p><a href="#" id="twit-account">Tweet & photo by @altcademy</a></p>
        </div>
      </div>
    </div>
  </div>
</div>

<div>
          <form>
            <div class="form-group">
              <input type="text" class="form-control username" placeholder="Username"/>
            </div>
            <div class="form-group col-xs-8">
              <input type="password" class="form-control password" placeholder="Password"/>
            </div>
            <button id="log-in-btn" class="btn btn-default btn-primary col-xs-3 col-xs-offset-1">Log in</button>
            <label>
              <input type="checkbox"/>
              <span>Remember me</span>
              <span> &#183; </span>
            </label>
            <a href="#">Forgot password?</a>
          </form>
        </div>
        <div class="sign-up col-xs-4 col-xs-offset-1">
          <form>
            <div class="new-to-t">
              <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
            </div>
            <div class="form-group">
              <input type="text" class="form-control username" placeholder="Username"/>
            </div>
            <div class="form-group">
              <input type="email" class="form-control email" placeholder="Email"/>
            </div>
            <div class="form-group">
              <input type="password" class="form-control password" placeholder="Password"/>
            </div>
            <button id="sign-up-btn" class="btn btn-default btn-warning pull-right">Sign up for Twitter</button>
          </form>
        </div>
      

    </React.Fragment>
  );
}




export default Layout;
