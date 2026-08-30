module Api
  class TweetsController < ApplicationController
    def index
      @tweets = Tweet.all.order(created_at: :desc)
      render 'api/tweets/index'
    end

    def create
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false }, status: :unauthorized unless session

      @tweet = session.user.tweets.new(tweet_params)

      if @tweet.save
        begin
          TweetMailer.notify(@tweet).deliver_now
        rescue StandardError => e
          Rails.logger.warn("Tweet email failed: #{e.message}")
        end

        render 'api/tweets/create'
      else
        render json: {
          success: false,
          errors: @tweet.errors.full_messages
        }, status: :unprocessable_entity
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false }, status: :unauthorized unless session

      tweet = Tweet.find_by(id: params[:id])

      if tweet && tweet.user == session.user && tweet.destroy
        render json: { success: true }
      else
        render json: { success: false }, status: :unprocessable_entity
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @tweets = user.tweets.order(created_at: :desc)
        render 'api/tweets/index'
      else
        render json: { tweets: [] }
      end
    end

    def search
      keyword = params[:keyword].to_s.downcase

      @tweets = Tweet
        .where('LOWER(message) LIKE ?', "%#{keyword}%")
        .order(created_at: :desc)

      render 'api/tweets/index'
    end

    private

    def tweet_params
      params.require(:tweet).permit(:message, :image)
    end
  end
end