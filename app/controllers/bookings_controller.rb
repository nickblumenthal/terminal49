class BookingsController < ApplicationController
  def show
    bl_id = params[:id]
    booking = ShippingApiService.new(ShippingApiService::PIL).fetch(bl_id)
    render json: booking
  end
end
