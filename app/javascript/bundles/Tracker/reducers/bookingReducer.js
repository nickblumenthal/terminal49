import Immutable from 'immutable';

import Booking from '../constants/bookingConstants';

const initialState = Immutable.fromJS({
  isFetching: false
});


export default function bookings(state = initialState, action = {}) {
  switch (action.type) {
    case (Booking.REQUEST_BOOKING):
      return state.merge({
        isFetching: action.data.bookingId
      });
    case (Booking.RECEIVE_BOOKING):
      return state.merge({
        isFetching: false,
        [action.data.bookingId]: action.data.bookingData
      });
    default:
      return state;
  }
}
