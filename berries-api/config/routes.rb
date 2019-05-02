Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, except: [:show]
        get 'users/search' => 'users#search' 
      resources :instruments
      resources :genres
      resources :chats
      resources :messages
      resources :notifications
      resources :chat_users
      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      # post '/postNoti' => 'notifications#create'
      # get '/getNoti' => 'notifications#show'
      mount ActionCable.server => '/cable'
    end
  end
end
