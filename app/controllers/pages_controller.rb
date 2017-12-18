class PagesController < ApplicationController
  include ReactOnRails::Controller

  layout 'tracker'

  before_action :hydrate_store

  def track

  end

  private

  def hydrate_store
    redux_store("trackerStore", props: {
      userReducer: {
        currentUser: current_user,
        isLoggedIn: user_signed_in?,
        searchHistory: search_history
      }
    })
  end

  def search_history
    user_signed_in? ? current_user.user_search_histories.as_json : []
  end
end
