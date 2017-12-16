require 'rails_helper'

RSpec.describe ShippingApiService do
  context 'when a booking exists' do
    it 'allows the user to retrieve bookings by booking line id' do
      # Since this is already stubbed in the service, no need to stub here
      bl_id = 'TXG790195100'
      service = ShippingApiService.new(ShippingApiService::PIL)

      expect(service.fetch(bl_id)[:booking_number]).to eq("TXG790195100")
    end
  end

  context 'when a booking does not exist' do
    it 'returns nil' do
      bl_id = '1234'
      service = ShippingApiService.new(ShippingApiService::PIL)

      expect(service.fetch(bl_id)).to eq(nil)
    end
  end

  context 'when the shipping line does not exist' do
    it 'throws an error' do
      expect{ShippingApiService.new('random')}.to raise_error
    end
  end
end
