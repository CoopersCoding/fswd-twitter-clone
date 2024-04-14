import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import './home.scss';

class Home extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  backgroundURLs = [
    'assets/images/background_2.png',
    'assets/images/background_3.jpg',
    'assets/images/background_1.png',
  ];

  backgroundStep = 0;

  componentDidMount() {
    this.backgroundTimer = setInterval(this.setBackground, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.backgroundTimer);
  }

  setBackground = () => {
    this.backgroundStep = (this.backgroundStep + 1) % this.backgroundURLs.length;
    const imageUrl = this.backgroundURLs[this.backgroundStep];

    $('#homeback').fadeOut(10000, () => {
      $('#homeback').css('background-image', `url(${imageUrl})`).fadeIn(1000);
    });
  };

  handleInputChange = ({ target: { name, value } }) => {
    if (name != null && value != null) {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password, email } = this.state;

    if (
      username != null &&
      password != null &&
      email != null &&
      typeof fetch === 'function'
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
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="front-card col-xs-10 col-xs-offset-1">
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
            </div>
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
