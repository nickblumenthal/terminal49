import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Accordion, Card, Grid, Header, Icon } from 'semantic-ui-react'
import ContainerHistory from './ContainerHistory'

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
          <ContainerHistory update={update} key={`container${update.get('container_number')}History${index}`} />
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
                    <Header as="h3">Number</Header>
                    {container.get('number')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Steamship Line</Header>
                    {container.get('size')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Type</Header>
                    {container.get('type')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Location</Header>
                    {container.get('location')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Last Status</Header>
                    {container.get('last_status')}
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Last Status At</Header>
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
