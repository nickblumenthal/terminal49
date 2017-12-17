class PagesController < ApplicationController
  include ReactOnRails::Controller

  layout 'tracker'

  before_action :hydrate_store

  def track

  end

  private

  def hydrate_store
    redux_store("trackerStore", props: {})
  end
end
