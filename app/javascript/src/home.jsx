import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import './home.scss';

class Home extends Component {
  backgroundURLs = [
    './images/background_2.png',
    './images/background_3.jpg',
    './images/background_1.png',
  ];


  backgroundStep = 0;

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleInputChange = ({ target: { name, value } }) => {
    if (name != null && typeof this.setState === 'function') {
      this.setState({ [name]: value });
    }
  }

  state = {
    username: '',
    password: '',
    email: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password, email } = this.state;

    if (
      typeof fetch === 'function' &&
      username != null &&
      password != null &&
      email != null
    ) {
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      })
        .then(response => response.json())
        .catch(error => console.error(error));
    }
  };

  render() {
    const { username, password, email } = this.state;

    return (
      <Layout>
        <div id="homeback" />

        <img 
          src={this.backgroundURLs[0]} 
        />

        <div 
          className="front-card col-xs-10 col-xs-offset-1"
          style={{ backgroundImage: `url(${this.backgroundURLs[0]})`, backgroundSize: 'cover' }}
        >
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
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </form>
          </div>

          <div className="sign-up col-xs-4 col-xs-offset-1">
            <form onSubmit={this.handleSubmit}>
              <p className="new-to-t">
                <strong>New to Twitter?</strong> <span> Sign Up</span>
              </p>
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
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  );
});

