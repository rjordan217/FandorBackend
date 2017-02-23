Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resource :user, only: [:create, :show, :destroy]
    resources :ratings, only: [:create, :destroy]
    resources :films, only: [:index]
    get 'films/:film_slug', to: 'films#show'
  end
end
