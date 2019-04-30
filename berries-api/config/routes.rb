Rails.application.routes.draw do
  devise_for :users
  # root to: "home#index"
  namespace :api do
    namespace :v1 do
      resources :users, except: [:show]
        get 'users/search' => 'users#search' 
      resources :instruments
      resources :genres

      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      mount ActionCable.server => '/cable'
    end
  end
end
