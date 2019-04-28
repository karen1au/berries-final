Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users  
      resources :instruments
      resources :genres
    end
  end
end
