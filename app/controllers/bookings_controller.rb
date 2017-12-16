class BookingsController < ApplicationController
  include ReactOnRails::Controller
  layout 'tracker'

  def show
    bl_id = params[:id]
    @booking = ShippingApiService.new(ShippingApiService::PIL).fetch(bl_id)
    respond_to do |format|
      format.html do
        redux_store("trackerStore", props: {
          bookingReducer: {
            bookings: {
              bl_id => @booking.as_json
            }
          }
        })
      end
      format.json { render json: @booking}
    end
  end

  private

  def hydrate_store
    props = {}
    redux_store("trackerStore", props: {name: 'test'})
  end
end
