Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resource :user, only: [:create, :show, :destroy]
    resources :ratings, only: [:create, :destroy]
    resources :films, only: [:index, :show]
  end
end
