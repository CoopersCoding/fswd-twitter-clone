import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from './utils/fetchHelper';
import './home.scss';

class Home extends Component {
  state = {
    loginUsername: '',
    loginPassword: '',
    signupUsername: '',
    signupEmail: '',
    signupPassword: '',
    message: '',
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleLogin = (event) => {
    event.preventDefault();

    const { loginUsername, loginPassword } = this.state;

    fetch(
      '/api/sessions',
      safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          user: {
            username: loginUsername,
            password: loginPassword,
          },
        }),
      }),
    )
      .then(handleErrors)
      .then((data) => {
        if (data.success === false) {
          this.setState({ message: 'Invalid username or password.' });
          return;
        }

        this.setState({ message: 'Signed in successfully.' });
      })
      .catch(() => {
        this.setState({ message: 'Unable to sign in. Please try again.' });
      });
  };

  handleSignup = (event) => {
    event.preventDefault();

    const {
      signupUsername,
      signupEmail,
      signupPassword,
    } = this.state;

    fetch(
      '/api/users',
      safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          user: {
            username: signupUsername,
            email: signupEmail,
            password: signupPassword,
          },
        }),
      }),
    )
      .then(handleErrors)
      .then((data) => {
        if (data.success === false) {
          this.setState({ message: 'Unable to create that account.' });
          return;
        }

        this.setState({
          message: 'Account created. You can sign in now.',
          loginUsername: signupUsername,
          signupUsername: '',
          signupEmail: '',
          signupPassword: '',
        });
      })
      .catch(() => {
        this.setState({ message: 'Unable to create account. Please try again.' });
      });
  };

  render() {
    const {
      loginUsername,
      loginPassword,
      signupUsername,
      signupEmail,
      signupPassword,
      message,
    } = this.state;

    return (
      <Layout>
        <section className="home-hero">
          <div className="home-overlay">
            <div className="welcome">
              <h1>Welcome to Twitter.</h1>

              <p className="welcome-copy">
                Connect with your friends and the world around you.
              </p>

              <p>Altcademy Twitter Project</p>
              <p>Tweet &amp; photo by @altcademy</p>
            </div>

            <div className="auth-column">
              <form className="auth-card" onSubmit={this.handleLogin}>
                <h2>Sign in</h2>

                <input
                  type="text"
                  name="loginUsername"
                  value={loginUsername}
                  onChange={this.handleInputChange}
                  placeholder="Username"
                  required
                />

                <input
                  type="password"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={this.handleInputChange}
                  placeholder="Password"
                  required
                />

                <button type="submit" className="btn btn-primary">
                  Log in
                </button>
              </form>

              <form className="auth-card" onSubmit={this.handleSignup}>
                <h2>
                  New to Twitter? <span>Sign up</span>
                </h2>

                <input
                  type="text"
                  name="signupUsername"
                  value={signupUsername}
                  onChange={this.handleInputChange}
                  placeholder="Username"
                  required
                />

                <input
                  type="email"
                  name="signupEmail"
                  value={signupEmail}
                  onChange={this.handleInputChange}
                  placeholder="Email"
                  required
                />

                <input
                  type="password"
                  name="signupPassword"
                  value={signupPassword}
                  onChange={this.handleInputChange}
                  placeholder="Password"
                  required
                />

                <button type="submit" className="btn signup-button">
                  Sign up for Twitter
                </button>
              </form>

              {message && <div className="auth-message">{message}</div>}
            </div>
          </div>
        </section>
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