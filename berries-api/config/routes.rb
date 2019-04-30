Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      resources :users  
      resources :instruments
      resources :genres

      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      

    end
  end
end
