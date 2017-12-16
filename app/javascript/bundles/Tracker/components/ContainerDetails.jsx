import PropTypes from 'prop-types'
import React from 'react'
import {Card, Grid, Header} from 'semantic-ui-react'

const ContainerDetails = ({containers}) => {
  const renderContainers = (containers) => {
    return containers.map((container) => {
      return (
          <Card fluid color="blue">
            <Card.Header textAlign="center">
              <Header as="h2">Container {container.get('number')}</Header>
            </Card.Header>
            <Card.Content>
              <Grid columns={4} divided stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h2">B/L Number</Header>
                    {container.get('number')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h2">Steamship Line</Header>
                    {container.get('size')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h2">Origin</Header>
                    {container.get('type')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h2">Destination</Header>
                    {container.get('last_status')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h2">Destination</Header>
                    {container.get('location')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h2">Destination</Header>
                    {container.get('last_status_at')}
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
        {renderContainers(containers)}
      </Card.Group>
  )
};

ContainerDetails.propTypes = {
  containers: PropTypes.array.isRequired
};

export default ContainerDetails
