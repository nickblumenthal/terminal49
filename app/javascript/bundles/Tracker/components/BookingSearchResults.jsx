import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Grid, Header } from 'semantic-ui-react'

const BookingSearchResults = ({bookings, searchHistory, sendRemoveSearch, sendSaveSearch}) => {
  const renderSaveButton = (booking) => {
    let match = searchHistory.find((search) => {
      return search.get('search') == booking.get('booking_number')
    });

    if(match) {
      return (
          <Button onClick={sendRemoveSearch.bind(null, match.get('id'))}>Remove</Button>
      )
    } else {
      return (
        <Button onClick={sendSaveSearch.bind(null, booking.get('booking_number'))}>Save</Button>
      )
    }
  };

  const renderCards = (bookings) => {
    // Get rid of an empty results
    const validBookings = bookings.valueSeq().filter(v => v != undefined).toList();

    if(bookings.size > 0 && validBookings.size == undefined) {
      return (
          <Card fluid color="orange">
            <Header as="h2">No results</Header>
          </Card>
      )
    }
    else {
      return validBookings.map((booking) => {
        return (
            <Card fluid color="red" key={`search${booking.get('booking_number')}`}>
              <Card.Header textAlign="center">
                <Header as="h2">Booking Detail</Header>
              </Card.Header>
              <Card.Content>
                <Grid columns={5} divided stackable>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h2">B/L Number</Header>
                      {booking.get('booking_number')}
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h2">Steamship Line</Header>
                      {booking.get('steamship_line')}
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h2">Origin</Header>
                      {booking.get('origin')}
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h2">Destination</Header>
                      {booking.get('destination')}
                    </Grid.Column>
                    <Grid.Column>
                      <Button>
                        <Link to={`/bookings/${booking.get('booking_number')}`}>
                          View Detail
                        </Link>
                      </Button>
                      {renderSaveButton(booking)}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
        )
      })
    }
  };

  return (
      <Card.Group>
        {renderCards(bookings)}
      </Card.Group>
  )
};

export default BookingSearchResults
