Rails.application.routes.draw do
  root 'static_pages#home'

  namespace :api do
    post '/users'                  => 'users#create'

    post '/sessions'               => 'sessions#create'
    get '/authenticated'           => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    post '/tweets'                 => 'tweets#create'
    get '/tweets'                  => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'

    get '/users/:username/tweets'  => 'tweets#index_by_user'
    get '/tweets/search/:keyword'  => 'tweets#search'
  end

  # React user profile route
  get '/:username' => 'static_pages#home'
end