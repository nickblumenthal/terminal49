class PagesController < ApplicationController
  include ReactOnRails::Controller

  layout 'tracker'

  before_action :hydrate_store

  def track

  end

  private

  def hydrate_store
    props = {}
    redux_store("trackerStore", props: {name: 'test'})
  end
end
