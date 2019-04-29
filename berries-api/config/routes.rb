Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, except: [:show]
        get 'users/search' => 'users#search' 
      resources :instruments
      resources :genres
    end
  end
end
