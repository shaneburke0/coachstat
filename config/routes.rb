Coachstat::Application.routes.draw do
  
  resources :gamestats


  resources :fixturestats


  resources :lineupplayers
  resources :lineups
  resources :fixtures
  resources :players
  resources :clubs
  resources :profiles
  devise_for :users

  get "home/index"

  match '/Admin' => 'user#admin_login' 
  match '/logout' => 'user#logout' 
  match '/myprofile' => 'profiles#myprofile'
  get '/clubs/:id/players', to: 'players#clubplayers'
  get '/clubs/:id/players/:playerid', to: 'players#show'
  get '/clubs/:id/fixtures', to: 'fixtures#clubfixtures'
  get '/clubs/:id/fixture/:fixtureid', to: 'fixtures#clubfixture'
  get '/lineups/fixture/:fixtureid', to: 'lineups#getFixtureLineup'
  get '/lineupplayers/:lineupid/lineup', to: 'lineupplayers#lineup'
  get '/lineupplayers/:id/player/:playerid', to: 'lineupplayers#getPlayer'
  put '/lineupplayers/:id/updateFormation', to: 'lineupplayers#updateFormation'
  delete '/fixturestats/fixture/:fixtureid/player/:playerid', to: 'fixturestats#deletePlayer'
  get '/fixturestats/player/:playerid', to: 'fixturestats#getAllPlayerStats'
  get '/fixturestats/fixture/:fixtureid/player/:playerid', to: 'fixturestats#getPlayer'
  put '/fixturestats/updateallplayers/:fixtureid', to: 'fixturestats#updateAllPlayers'
  get '/gamestats/fixture/:fixtureid/club/:clubid/oppositionclub/:oppid', to: 'gamestats#getGameStats'
  get '/gamestats/club/:clubid', to: 'gamestats#getClubStats'
  post '/gamestats/clubs', to: 'gamestats#createMultiple'
  put '/gamestats/updategame/:fixtureid', to: 'gamestats#updategame'


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
  
  root :to => 'home#index'
end
