import React, { Component } from 'react';
import Layout from '@src/layout';
import {
  safeCredentials,
  safeCredentialsFormData,
  handleErrors,
} from './utils/fetchHelper';
import './feed.scss';

class Feed extends Component {
  state = {
    tweets: [],
    message: '',
    image: null,
    loading: true,
    posting: false,
    error: '',
  };

  componentDidMount() {
    this.loadTweets();
  }

  loadTweets = () => {
    fetch('/api/tweets', safeCredentials())
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
          error: 'Unable to load tweets.',
        });
      });
  };

  handleMessageChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  handleImageChange = (event) => {
    this.setState({
      image: event.target.files[0] || null,
    });
  };

  handleClearImage = () => {
    this.setState({ image: null });

    if (this.fileInput) {
      this.fileInput.value = '';
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { message, image, posting } = this.state;

    if (!message.trim() || posting) {
      return;
    }

    const formData = new FormData();

    formData.append('tweet[message]', message.trim());

    if (image) {
      formData.append('tweet[image]', image);
    }

    this.setState({
      posting: true,
      error: '',
    });

    fetch(
      '/api/tweets',
      safeCredentialsFormData({
        method: 'POST',
        body: formData,
      }),
    )
      .then(handleErrors)
      .then(() => {
        this.setState({
          message: '',
          image: null,
          posting: false,
        });

        if (this.fileInput) {
          this.fileInput.value = '';
        }

        this.loadTweets();
      })
      .catch(() => {
        this.setState({
          posting: false,
          error: 'Unable to post tweet. Please try the photo again.',
        });
      });
  };

  handleDelete = (tweetId) => {
    fetch(
      `/api/tweets/${tweetId}`,
      safeCredentials({
        method: 'DELETE',
      }),
    )
      .then(handleErrors)
      .then((data) => {
        if (data.success === false) {
          throw new Error('Delete failed');
        }

        this.loadTweets();
      })
      .catch(() => {
        this.setState({
          error: 'Unable to delete tweet.',
        });
      });
  };

  handleLogout = () => {
    fetch(
      '/api/sessions',
      safeCredentials({
        method: 'DELETE',
      }),
    )
      .then(handleErrors)
      .then(() => {
        window.location.href = '/';
      })
      .catch(() => {
        this.setState({
          error: 'Unable to log out.',
        });
      });
  };

  render() {
    const { username } = this.props;

    const {
      tweets,
      message,
      image,
      loading,
      posting,
      error,
    } = this.state;

    return (
      <Layout>
        <div className="twitter-app">
          <aside className="profile-column">
            <div className="profile-card">
              <div className="profile-avatar">
                {username.charAt(0).toUpperCase()}
              </div>

              <h2>{username}</h2>

              <a href={`/${username}`}>
                @{username}
              </a>

              <div className="profile-stat">
                <span>Tweets</span>
                <strong>
                  {
                    tweets.filter(
                      (tweet) => tweet.username === username,
                    ).length
                  }
                </strong>
              </div>
            </div>
          </aside>

          <main className="feed-column">
            <div className="feed-title">
              <div>
                <h1>Home</h1>
                <span>Latest Tweets</span>
              </div>

              <button
                type="button"
                className="logout-button"
                onClick={this.handleLogout}
              >
                Log out
              </button>
            </div>

            <form
              className="tweet-composer"
              onSubmit={this.handleSubmit}
            >
              <textarea
                value={message}
                onChange={this.handleMessageChange}
                placeholder="What's happening?"
                maxLength="140"
                required
              />

              <div className="composer-footer">
                <div className="photo-selection">
                  <label className="photo-button">
                    Add photo

                    <input
                      type="file"
                      accept="image/*"
                      ref={(input) => {
                        this.fileInput = input;
                      }}
                      onChange={this.handleImageChange}
                    />
                  </label>

                  {image && (
                    <div className="selected-photo">
                      <span title={image.name}>{image.name}</span>
                      <button
                        type="button"
                        onClick={this.handleClearImage}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="composer-actions">
                  <span
                    className={
                      message.length > 125
                        ? 'character-count warning'
                        : 'character-count'
                    }
                  >
                    {message.length}/140
                  </span>

                  <button
                    type="submit"
                    className="tweet-button"
                    disabled={!message.trim() || posting}
                  >
                    {posting ? 'Posting...' : 'Tweet'}
                  </button>
                </div>
              </div>
            </form>

            {error && (
              <div className="feed-error">
                {error}
              </div>
            )}

            {loading ? (
              <div className="feed-loading">
                Loading tweets...
              </div>
            ) : (
              <div className="tweet-list">
                {tweets.length === 0 && (
                  <div className="empty-feed">
                    No tweets yet. Be the first to post.
                  </div>
                )}

                {tweets.map((tweet) => (
                  <article
                    className="tweet-card"
                    key={tweet.id}
                  >
                    <div className="tweet-avatar">
                      {tweet.username.charAt(0).toUpperCase()}
                    </div>

                    <div className="tweet-content">
                      <div className="tweet-meta">
                        <a
                          className="tweet-username"
                          href={`/${tweet.username}`}
                        >
                          @{tweet.username}
                        </a>

                        {tweet.username === username && (
                          <button
                            type="button"
                            className="delete-tweet"
                            onClick={() =>
                              this.handleDelete(tweet.id)
                            }
                          >
                            Delete
                          </button>
                        )}
                      </div>

                      <p>{tweet.message}</p>

                      {tweet.image && (
                        <img
                          className="tweet-image"
                          src={tweet.image}
                          alt={`Tweet by ${tweet.username}`}
                        />
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>

          <aside className="sidebar-column">
            <div className="sidebar-card">
              <h2>What's happening</h2>

              <div className="trend-item">
                <span>Altcademy</span>
                <strong>#FullStack</strong>
              </div>

              <div className="trend-item">
                <span>React</span>
                <strong>#BuildInReact</strong>
              </div>

              <div className="trend-item">
                <span>Rails</span>
                <strong>#RubyOnRails</strong>
              </div>
            </div>
          </aside>
        </div>
      </Layout>
    );
  }
}

export default Feed;
