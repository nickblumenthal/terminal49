import React from 'react'

const BookingSearchResults = ({bookings}) => {
  return bookings.map((booking) => {
    <div>{booking.booking_number}</div>
  })
};

export default BookingSearchResults
