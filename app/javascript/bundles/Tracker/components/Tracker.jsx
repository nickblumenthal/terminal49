import PropTypes from 'prop-types';
import React from 'react';

import {Button, Container, Form, Grid} from 'semantic-ui-react'
import BookingSearchResults from './BookingSearchResults'

export default class Tracker extends React.Component {
  static propTypes = {
    bookings: PropTypes.object
  };

  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {bookingNumber: ''};
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = () => {
    const bookingNumber = this.state.bookingNumber;
    this.props.fetchBooking(bookingNumber);
  };

  render() {
    return (
        <Container>
          <Grid columns={1} padded>
            <Grid.Row>
              <Grid.Column>
              <Form className="search" onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Booking Number</label>
                  <input placeholder='Booking Number' name="bookingNumber" onChange={this.handleChange}/>
                </Form.Field>
                <Button type='submit'>Search</Button>
              </Form>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              <BookingSearchResults bookings={this.props.bookings}
                                    currentSearch={this.state.bookingNumber}
                                    searchHistory={this.props.searchHistory}
                                    sendRemoveSearch={this.props.sendRemoveSearch}
                                    sendSaveSearch={this.props.sendSaveSearch}/>
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}
