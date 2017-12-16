Rails.application.routes.draw do
  resources :bookings, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#track'
end
