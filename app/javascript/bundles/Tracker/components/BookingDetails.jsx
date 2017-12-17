import PropTypes from 'prop-types';
import React from 'react';

import { Button, Container, Form, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ShippingDetails from './ShippingDetails'
import ContainerDetails from './ContainerDetails'

export default class BookingDetails extends React.Component {
  static propTypes = {
    bookings: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const bookingId = this.props.match.params['bookingId'];
    return (
        <Container>
          <Link to="/"><Header as="h1" textAlign="center">Trackster</Header></Link>
          <ShippingDetails booking={this.props.bookings.get(bookingId)}/>
          <ContainerDetails 
              containers={this.props.bookings.get(bookingId).get('containers')}
              updates={this.props.bookings.get(bookingId).get('updates')}
          />
        </Container>
    );
  }
}
