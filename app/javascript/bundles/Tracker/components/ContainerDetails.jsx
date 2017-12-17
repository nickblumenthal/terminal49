import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Accordion, Card, Grid, Header, Icon } from 'semantic-ui-react'

export default class ContainerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historyVisible: false
    };
  }

  handleClick = () => {
    this.setState(prevState => {
      historyVisible: !prevState.historyVisible
    })
  };

  renderContainers = (containers) => {
    return containers.map((container) => {
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
                <Accordion.Title active={this.state.visibleHistory} index={0} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  What is a dog?
                </Accordion.Title>
                <Accordion.Content active={this.state.visibleHistory}>
                  <p>
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
                    {' '}welcome guest in many households across the world.
                  </p>
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
          {this.renderContainers(this.props.containers)}
        </Card.Group>
    )
  }
};

ContainerDetails.propTypes = {
  containers: PropTypes.object.isRequired
};
