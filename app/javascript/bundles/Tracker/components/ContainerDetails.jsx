import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Accordion, Card, Grid, Header, Icon } from 'semantic-ui-react'

export default class ContainerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historyVisible: {}
    };
  }

  handleClick = (index) => {
    this.setState((prevState, props) => {
      let newHistoryVisible = Object.assign(prevState.historyVisible, {[index]: !prevState.historyVisible[index]});
      return {
        historyVisible: newHistoryVisible
      }
    })
  };

  renderHistory = (containerUpdates) => {
    return containerUpdates.map((update, index) => {
      return(
          <Grid.Row key={`update${index}`}>
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
    })
  };

  renderContainers = (containers, updates) => {
    return containers.map((container, idx) => {
      let containerUpdates = updates.filter((update) => {
        return update.get('container_number') == container.get('number')
      });

      return (
          <Card fluid color="blue" key={container.get('number')}>
            <Card.Content>
              <Card.Header textAlign="left">
                <Header as="h2">Container {container.get('number')}</Header>
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Grid columns={6} divided stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h3">B/L Number</Header>
                    {container.get('number')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Steamship Line</Header>
                    {container.get('size')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Origin</Header>
                    {container.get('type')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Destination</Header>
                    {container.get('last_status')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Destination</Header>
                    {container.get('location')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Destination</Header>
                    {container.get('last_status_at')}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
            <Card.Content>
              <Accordion>
                <Accordion.Title active={this.state.historyVisible[idx]} index={0} onClick={this.handleClick.bind(this, idx)}>
                  <Icon name='dropdown' />
                  Container History
                </Accordion.Title>
                <Accordion.Content active={this.state.historyVisible[idx]}>
                  <Grid columns={8} divided stackable>
                    {this.renderHistory(containerUpdates.valueSeq())}
                  </Grid>
                </Accordion.Content>
              </Accordion>
            </Card.Content>
          </Card>
      )
    })
  };

  render() {
    return (
        <Card.Group>
          {this.renderContainers(this.props.containers, this.props.updates)}
        </Card.Group>
    )
  }
};

ContainerDetails.propTypes = {
  containers: PropTypes.object.isRequired,
  updates: PropTypes.object
};
