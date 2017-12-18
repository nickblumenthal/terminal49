import PropTypes from 'prop-types';
import React from 'react';

import {Button, Container, Dropdown, Form, Grid, Header, Message, Modal} from 'semantic-ui-react'
import {Link, Route, Switch} from 'react-router-dom'

import BookingDetailContainer from '../containers/BookingDetailContainer'
import TrackerContainer from '../containers/TrackerContainer'
import SearchHistory from '../components/SearchHistory'

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

    let errors = this.props.user.get('errors');

    const printErrors = (errors) => {
      if(errors == undefined) { return; }
      return errors.map((errorMessages, field) => {
        return (<div>{field}: {errorMessages.toJS().join()}</div>)
      }).toList()
    };

    return (
        <Modal trigger={<Button color="blue">Sign Up</Button>}>
          <Modal.Header textAlign="center">Sign Up</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSignUpSubmit}
                  success={this.props.user.get('isLoggedIn')}
                  error={errors != undefined}>
              <Form.Field error={errors && errors.has('email')}>
                <label>Email</label>
                <input placeholder='Email' name="email" onChange={this.handleChange} />
              </Form.Field>
              <Form.Field error={errors && errors.has('password')}>
                <label>Password</label>
                <input placeholder='password' name="password" onChange={this.handleChange}/>
              </Form.Field>
              <Button type='submit'>Submit</Button>
              <Message success
                       header='Form Completed'
                       content="Welcome to Trackster!  Your search history will now be saved"
              />
              <Message error>
                <Message.Header>Error</Message.Header>
                <Message.Content>
                  {printErrors(errors)}
                </Message.Content>
              </Message>
            </Form>
          </Modal.Content>
        </Modal>
    )

  };
  
  renderLogin = () => {
    if (this.props.user.get('isLoggedIn')) {
      return;
    }

    let errors = this.props.user.get('errors');

    const printErrors = (errors) => {
      if(errors == undefined) { return; }
      return errors.map((errorMessages, field) => {
        return (<div>{field}: {errorMessages.toJS().join()}</div>)
      }).toList()
    };

    return (
        <Modal trigger={<Button color="green">Login</Button>}>
          <Modal.Header textAlign="center">Login</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleLoginSubmit} 
                  success={this.props.user.get('isLoggedIn')}
                  error={errors != undefined}>
              <Form.Field error={errors && errors.has('email')}>
                <label>Email</label>
                <input placeholder='Email' name="email" onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field error={errors && errors.has('password')}>
                <label>Password</label>
                <input placeholder='password' name="password" onChange={this.handleChange}/>
              </Form.Field>
              <Button type='submit'>Submit</Button>
              <Message
                  success
                  header='Form Completed'
                  content="Welcome to back!"
              />
              <Message error>
                <Message.Header>Error</Message.Header>
                <Message.Content>
                  {printErrors(errors)}
                </Message.Content>
              </Message>
            </Form>
          </Modal.Content>
        </Modal>
    )
  };

  renderSearchHistory = () => {
    if(!this.props.user.get('isLoggedIn')) {
      return;
    }

    return(
        <Dropdown text="Search History">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/">Clear All</Link>
            </Dropdown.Item>
            {this.renderSearches()}
          </Dropdown.Menu>
        </Dropdown>
    )
  };

  renderSearches = () => {
    const searches = this.props.user.get('searchHistory');
    return searches.map((search) => {
      return(
          <Dropdown.Item>
            <Link to={`/bookings/${search.get('search')}`}>{search.get('search')}</Link>
          </Dropdown.Item>
      )
    })
  };
  
  renderLogout = () => {
    if(!this.props.user.get('isLoggedIn')) { return; }
    
    return(
        <Button color="red" onClick={this.props.sendLogout}>Logout</Button>
    )
  };

  render() {
    return (
        <Container>
          <Grid columns={3} padded>
            <Grid.Row>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <Link to="/"><Header as="h1" textAlign="center">Trackster</Header></Link>
              </Grid.Column>
              <Grid.Column textAlign="right">
                {this.renderSignUp()}
                {this.renderLogin()}
                <SearchHistory user={this.props.user} fetchSearchHistory={this.props.fetchSearchHistory} sendClearSearchHistory={this.props.sendClearSearchHistory}/>
                {this.renderLogout()}
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
