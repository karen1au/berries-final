Rails.application.routes.draw do
  # devise_for :users
  # root to: "/"
  namespace :api do
    namespace :v1 do
      resources :users, except: [:show]
        get 'users/search' => 'users#search' 
      resources :instruments
      resources :genres

      # post '/login' => 'sessions#create'
      # delete '/logout' => 'sessions#destroy'
      post '/postNoti' => 'notifications#create'
      get '/getNoti' => 'notifications#show'

      devise_for :users, path: '', path_names: { sign_in: '/login', sign_out: '/logout'}
      mount ActionCable.server => '/cable'
    end
  end
end
