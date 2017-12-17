import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Accordion, Card, Grid, Header, Icon } from 'semantic-ui-react'

const ContainerHistory = ({update}) => {
  return (
      <Grid.Row>
        <Grid.Column>
          <Header as="h3">Arrival</Header>
          {update.get('arrival')}
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Delivery On</Header>
          {update.get('delivery_on')}
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Steamship Line</Header>
          {update.get('steamship_line')}
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Origin</Header>
          {update.get('origin')}
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Destination</Header>
          {update.get('destination')}
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Vessel</Header>
          {update.get('vessel')}
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Voyage</Header>
          {update.get('voyage')}
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Vessel ETA</Header>
          {update.get('vessel_eta')}
        </Grid.Column>
      </Grid.Row>        
  )
};

ContainerHistory.propTypes = {
  update: PropTypes.object
};

export default ContainerHistory
