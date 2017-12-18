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
          },
          userReducer: {
            currentUser: current_user,
            isLoggedIn: user_signed_in?,
            searchHistory: search_history
          }
        })
      end
      format.json { render json: @booking}
    end
  end

  private

  def search_history
    user_signed_in? ? current_user.user_search_histories.as_json : []
  end
end
