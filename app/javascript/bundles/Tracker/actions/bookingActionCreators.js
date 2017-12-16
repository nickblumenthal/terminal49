import fetch from 'cross-fetch'
import Booking from '../constants/bookingConstants'

export function fetchBooking(id) {
  return function(dispatch) {
    dispatch(requestBooking(id));
    fetch(`/bookings/${id}`).then((response) => {
      dispatch(receiveBooking(id, response.data))
    })
  }
}

export function requestBooking(id) {
  return {
    type: Booking.REQUEST_BOOKING,
    data: {
      id
    }
  }
}

export function receiveBooking(id, bookingData) {
  return {
    type: Booking.RECEIVE_BOOKING,
    data: {
      id,
      bookingData
    }
  }
}
