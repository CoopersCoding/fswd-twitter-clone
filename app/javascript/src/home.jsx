import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './home.scss';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSignUp = (event) => {
    event.preventDefault();

    const { username, password, email } = this.state;

    // Send a POST request to /api/users with the form data
    fetch('/api/users', safeCredentials({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    }))
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

  componentDidMount() {
    // do something
  }

  render() {
    const { username, password, email } = this.state;

    return (
      <>
        <div id="homeback">
        </div>
        <nav className="navbar navbar-default navbar-fixed-top">
          {/* ... */}
        </nav>
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="front-card col-xs-10 col-xs-offset-1">
                {/* ... */}
                <div className="log-in col-xs-4 col-xs-offset-1">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control username"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group col-xs-8">
                      <input
                        type="password"
                        className="form-control password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    {/* ... */}
                  </form>
                </div>

                
                <div className="sign-up col-xs-4 col-xs-offset-1">
                  <form onSubmit={this.handleSignUp}>
                    <div className="new-to-t">
                      <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control username"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </form>
                </div>


              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})