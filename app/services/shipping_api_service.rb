class ShippingApiService
#      Shipping Lines
  PIL = 'PIL'.freeze

  SHIPPING_LINES = [PIL]

  def initialize(shipping_line)
    throw 'Unknown shipping line' unless SHIPPING_LINES.include?(shipping_line)
    @line = shipping_line
    self.class.include "Lines::#{@line}".constantize
  end


end
