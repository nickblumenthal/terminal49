// Simple example of a React "smart" component

import { connect } from 'react-redux';
import AppHeader from '../components/Header';
import * as actions from '../actions/userActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({
  bookings: state.bookingReducer.get('bookings'),
  user: state.userReducer
});

// Don't forget to actually use connect!
// Note that we don't export Tracker, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, actions)(AppHeader);
