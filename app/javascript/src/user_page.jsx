import React, { Component } from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from './utils/fetchHelper';
import './user_page.scss';

class UserPage extends Component {
  state = {
    tweets: [],
    loading: true,
    error: '',
  };

  componentDidMount() {
    this.loadTweets();
  }

  loadTweets = () => {
    const { username } = this.props;

    fetch(
      `/api/users/${encodeURIComponent(username)}/tweets`,
      safeCredentials(),
    )
      .then(handleErrors)
      .then((data) => {
        this.setState({
          tweets: data.tweets || [],
          loading: false,
          error: '',
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Unable to load this user’s tweets.',
        });
      });
  };

  render() {
    const { username } = this.props;
    const { tweets, loading, error } = this.state;

    return (
      <Layout>
        <div className="user-page">
          <header className="user-header">
            <a href="/" className="back-home">
              ← Home
            </a>

            <div className="user-profile">
              <div className="user-avatar">
                {username.charAt(0).toUpperCase()}
              </div>

              <div>
                <h1>{username}</h1>
                <p>@{username}</p>
                <span>
                  {tweets.length} {tweets.length === 1 ? 'Tweet' : 'Tweets'}
                </span>
              </div>
            </div>
          </header>

          {error && (
            <div className="user-error">
              {error}
            </div>
          )}

          {loading ? (
            <div className="user-loading">
              Loading tweets...
            </div>
          ) : (
            <div className="user-tweets">
              {tweets.length === 0 && (
                <div className="user-empty">
                  @{username} hasn't tweeted yet.
                </div>
              )}

              {tweets.map((tweet) => (
                <article
                  className="user-tweet"
                  key={tweet.id}
                >
                  <div className="tweet-avatar">
                    {username.charAt(0).toUpperCase()}
                  </div>

                  <div className="user-tweet-content">
                    <strong>@{username}</strong>

                    <p>{tweet.message}</p>

                    {tweet.image && (
                      <img
                        src={tweet.image}
                        alt={`Tweet by ${username}`}
                        className="user-tweet-image"
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default UserPage;