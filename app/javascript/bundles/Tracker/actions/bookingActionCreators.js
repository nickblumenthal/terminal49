import fetch from 'cross-fetch'
import Booking from '../constants/bookingConstants'

export function fetchBooking(bookingId) {
  return function(dispatch) {
    dispatch(requestBooking(bookingId));
    fetch(`/bookings/${bookingId}`)
        .then((response) => response.json())
        .then((data) => dispatch(receiveBooking(bookingId, data)))
  }
}

export function requestBooking(bookingId) {
  return {
    type: Booking.REQUEST_BOOKING,
    data: {
      bookingId
    }
  }
}

export function receiveBooking(bookingId, bookingData) {
  return {
    type: Booking.RECEIVE_BOOKING,
    data: {
      bookingId,
      bookingData
    }
  }
}
