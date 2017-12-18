Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'users'}
  resources :bookings, only: [:show]
  resource :user do
    resources :user_search_histories
  end

  delete '/users/:user_id/users_search_histories/clear', to: 'user_search_histories#destroy_all'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#track'
end
