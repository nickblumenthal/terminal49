import PropTypes from 'prop-types';
import React from 'react';

import { Button, Container, Form, Header, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ShippingDetails from './ShippingDetails'
import ContainerDetails from './ContainerDetails'

export default class BookingDetails extends React.Component {
  static propTypes = {
    bookings: PropTypes.object,
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  bookingId = this.props.match.params['bookingId'];

  componentDidMount() {
    // Booking may not exist in reducer if navigating from prepopulated search history

    if(this.props.bookings.get(this.bookingId) == undefined) {
      this.props.fetchBooking(this.bookingId)
    }
  }

  render() {
    if(this.props.bookings.get(this.bookingId) == undefined) {
      return(
          <Loader active />
      )
    }

    return (
        <Container>
          <ShippingDetails booking={this.props.bookings.get(this.bookingId)}
                           isLoggedIn={this.props.isLoggedIn}
                           searchHistory={this.props.searchHistory}
                           sendRemoveSearch={this.props.sendRemoveSearch} 
                           sendSaveSearch={this.props.sendSaveSearch}/>
          <ContainerDetails 
              containers={this.props.bookings.get(this.bookingId).get('containers')}
              updates={this.props.bookings.get(this.bookingId).get('updates')}
          />
        </Container>
    );
  }
}
