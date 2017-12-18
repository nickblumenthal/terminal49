import PropTypes from 'prop-types';
import React from 'react';

import {Button, Container, Form, Grid, Header, Message, Modal} from 'semantic-ui-react'
import {Link, Route, Switch} from 'react-router-dom'

import TrackerContainer from '../containers/TrackerContainer'
import BookingDetailContainer from '../containers/BookingDetailContainer'

export default class AppHeader extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSignUpSubmit = () => {
    const email = this.state.email;
    const password = this.state.password;
    this.props.sendSignUp(email, password);
  };
  
  handleLoginSubmit = () => {
    const email = this.state.email;
    const password = this.state.password;
    this.props.sendLogin(email, password);
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  renderSignUp = () => {
    if (this.props.user.get('isLoggedIn')) {
      return;
    }
    
    return (
        <Modal trigger={<Button color="blue">Sign Up</Button>}>
          <Modal.Header textAlign="center">Sign Up</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSignUpSubmit} success={this.props.user.get('currentUser').get('email') == this.state.email}>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' name="email" onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='password' name="password" onChange={this.handleChange}/>
              </Form.Field>
              <Button type='submit'>Submit</Button>
              <Message
                  success
                  header='Form Completed'
                  content="Welcome to Trackster!  Your search history will now be saved"
              />
            </Form>
          </Modal.Content>
        </Modal>
    )

  };
  
  renderLogin = () => {
    if (this.props.user.get('isLoggedIn')) {
      return;
    }

    return (
        <Modal trigger={<Button color="green">Login</Button>}>
          <Modal.Header textAlign="center">Login</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleLoginSubmit} success={this.props.user.get('currentUser').get('email') == this.state.email}>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' name="email" onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='password' name="password" onChange={this.handleChange}/>
              </Form.Field>
              <Button type='submit'>Submit</Button>
              <Message
                  success
                  header='Form Completed'
                  content="Welcome to back!"
              />
            </Form>
          </Modal.Content>
        </Modal>
    )
  };

  renderSearchHistory = () => {
    return(
        <div>hi</div>
    )
  };

  render() {
    return (
        <Container>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <Link to="/"><Header as="h1" textAlign="center">Trackster</Header></Link>
              </Grid.Column>
              <Grid.Column textAlign="right">
                {this.renderSignUp()}
                {this.renderLogin()}
                {this.renderSearchHistory()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Switch>
            <Route
                path="/"
                component={TrackerContainer}
                exact
            />
            <Route
                path="/bookings/:bookingId"
                component={BookingDetailContainer}
            />
          </Switch>
        </Container>
    );
  }
}
