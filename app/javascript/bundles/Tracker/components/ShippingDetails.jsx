import PropTypes from 'prop-types'
import React from 'react'
import {Card, Grid, Header} from 'semantic-ui-react'

const ShippingDetails = ({booking}) => {
  const renderCards = (booking) => {
    return (
        <Card fluid color="red">
          <Card.Content>
            <Card.Header textAlign="center">
              <Header as="h2">Booking Detail</Header>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Grid columns={4} divided stackable>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">B/L Number</Header>
                  {booking.get('booking_number')}
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">Steamship Line</Header>
                  {booking.get('steamship_line')}
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">Origin</Header>
                  {booking.get('origin')}
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">Destination</Header>
                  {booking.get('destination')}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
    )
  };

  return (
      <Card.Group>
        {renderCards(booking)}
      </Card.Group>
  )
};

ShippingDetails.propTypes = {
  booking: PropTypes.object.isRequired
};

export default ShippingDetails
