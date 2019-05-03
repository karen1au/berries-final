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
      resources :relationships
      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      
      mount ActionCable.server => '/cable'
    end
  end
end
