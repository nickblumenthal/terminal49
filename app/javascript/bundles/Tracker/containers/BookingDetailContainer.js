// Simple example of a React "smart" component

import { connect } from 'react-redux';
import BookingDetails from '../components/BookingDetails';
import * as bookingActions from '../actions/bookingActionCreators';
import * as userActions from '../actions/userActionCreators'

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({
  bookings: state.bookingReducer.get('bookings'),
  searchHistory: state.userReducer.get('searchHistory')
});

// Don't forget to actually use connect!
// Note that we don't export Tracker, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, Object.assign(bookingActions, userActions))(BookingDetails);
