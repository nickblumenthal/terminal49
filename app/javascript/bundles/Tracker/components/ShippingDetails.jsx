import PropTypes from 'prop-types'
import React from 'react'
import {Button, Card, Grid, Header, Modal} from 'semantic-ui-react'

const ShippingDetails = ({booking, isLoggedIn, searchHistory, sendRemoveSearch, sendSaveSearch}) => {
  const renderSaveButton = (booking) => {
    if(!isLoggedIn) {
      return(
          <Modal header="Login to save"
                 content="Please login to retain your search history"
                 trigger={<Button>Save</Button>} />
      );
    }

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
  
  const renderCards = (booking) => {
    return (
        <Card fluid color="red">
          <Card.Content>
            <Card.Header textAlign="center">
              <Header as="h2">Booking Detail</Header>
              {renderSaveButton(booking)}
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
