import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Grid, Header } from 'semantic-ui-react'

const BookingSearchResults = ({bookings}) => {
  const renderCards = (bookings) => {
    return bookings.valueSeq().map((booking) => {
      return(
        <Card fluid color="red">
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
                  <Link to={`/bookings/${booking.get('booking_number')}`}>
                    View Detail
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      )
    })
  };

  return (
      <Card.Group>
        {renderCards(bookings)}
      </Card.Group>
  )
};

export default BookingSearchResults
