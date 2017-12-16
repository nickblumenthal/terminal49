class ShippingApiService
  # The purpose of this service is to provide a way to present a consistent interface
  # for what is theoretically n different shippers - all with different api, urls, data
  # schemas, etc.

  # Shipping Lines
  PIL = 'PIL'.freeze

  SHIPPING_LINES = [PIL]

  delegate :fetch, to: :@api

  def initialize(shipping_line)
    throw 'Unknown shipping line' unless SHIPPING_LINES.include?(shipping_line)
    @line = shipping_line
    @api = "Lines::#{@line}".constantize.new
  end
end
