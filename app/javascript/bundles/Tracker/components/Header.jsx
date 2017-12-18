import PropTypes from 'prop-types';
import React from 'react';

import {Button, Container, Dropdown, Form, Grid, Header, Image, Message, Modal} from 'semantic-ui-react'
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
          <Grid columns={3} padded verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                <Link to="/">
                  <Image size="tiny" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5IDU5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OSA1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiNFNkU3RTg7IiBkPSJNMzAuMTk4LDIxLjExM0w2LjUsMzBjMCwwLTEuNDE3LDksMTAsMjBoMTRoMTRjMTEuNDE3LTExLDEwLTIwLDEwLTIwbC0yMy42OTgtOC44ODcgIEMzMC42MDcsMjEuMDQsMzAuMzkzLDIxLjA0LDMwLjE5OCwyMS4xMTN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyODU2ODA7IiBkPSJNMzUuNSwxM2gtMTBWMi4xOThDMjUuNSwwLjk4NCwyNi40ODQsMCwyNy42OTgsMGg1LjYwNEMzNC41MTYsMCwzNS41LDAuOTg0LDM1LjUsMi4xOThWMTN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM5NUE1QTU7IiBkPSJNMzAuMTk4LDIxLjExM2MwLjE5NS0wLjA3MywwLjQwOS0wLjA3MywwLjYwNCwwTDQ5LjUsMjguMTI1VjE0Ljg3NkM0OS41LDEzLjg0LDQ4LjY2LDEzLDQ3LjYyNCwxMyAgSDEzLjM3NmMtMS4wMzYsMC0xLjg3NiwwLjg0LTEuODc2LDEuODc2djEzLjI0OUwzMC4xOTgsMjEuMTEzeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTQzLjUsMThoLTJjLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoMmMwLjU1MywwLDEsMC40NDgsMSwxUzQ0LjA1MywxOCw0My41LDE4eiBNMzguNSwxOGgtMiAgYy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDJjMC41NTMsMCwxLDAuNDQ4LDEsMVMzOS4wNTMsMTgsMzguNSwxOHogTTMzLjUsMThoLTJjLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoMiAgYzAuNTUzLDAsMSwwLjQ0OCwxLDFTMzQuMDUzLDE4LDMzLjUsMTh6IE0yOC41LDE4aC0yYy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDJjMC41NTMsMCwxLDAuNDQ4LDEsMVMyOS4wNTMsMTgsMjguNSwxOHogICBNMjMuNSwxOGgtMmMtMC41NTMsMC0xLTAuNDQ4LTEtMXMwLjQ0Ny0xLDEtMWgyYzAuNTUzLDAsMSwwLjQ0OCwxLDFTMjQuMDUzLDE4LDIzLjUsMTh6IE0xOC41LDE4aC0yYy0wLjU1MywwLTEtMC40NDgtMS0xICBzMC40NDctMSwxLTFoMmMwLjU1MywwLDEsMC40NDgsMSwxUzE5LjA1MywxOCwxOC41LDE4eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojQkRDM0M3OyIgZD0iTTMwLjE5OCwyMS4xMTNMNi41LDMwYzAsMC0xLjQxNyw5LDEwLDIwaDE0VjIxLjA1OEMzMC4zOTgsMjEuMDU4LDMwLjI5NSwyMS4wNzcsMzAuMTk4LDIxLjExM3oiLz4KPHBvbHlsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiBwb2ludHM9IjExLjUsMzMgMzAuNSwyNiAgIDQ4LjUsMzMgIi8+CjxwYXRoIHN0eWxlPSJmaWxsOiM0NDgyQzM7IiBkPSJNMzguNSw1MGgtMTZsMS44NTYtMTIuOTkyQzI0LjQzOSwzNi40MywyNC45MzQsMzYsMjUuNTE4LDM2aDkuOTYzYzAuNTg0LDAsMS4wOCwwLjQzLDEuMTYzLDEuMDA4ICBMMzguNSw1MHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzQ1N0JBMzsiIGQ9Ik0zMy4zMDIsMEgzMC41djEzaDVWMi4xOThDMzUuNSwwLjk4NCwzNC41MTYsMCwzMy4zMDIsMHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzM1NDk1RTsiIGQ9Ik0zMC41LDM2aC00Ljk4MmMtMC41ODQsMC0xLjA4LDAuNDMtMS4xNjMsMS4wMDhMMjIuNSw1MGg4VjM2eiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMyODU2ODA7IiBkPSJNNTYuNSw0OWgtNTRjLTAuNTUzLDAtMSwwLjQ0OC0xLDFzMC40NDcsMSwxLDFoNTRjMC41NTMsMCwxLTAuNDQ4LDEtMVM1Ny4wNTMsNDksNTYuNSw0OXoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMyODU2ODA7IiBkPSJNNDUuNSw1M2gtMjljLTAuNTUzLDAtMSwwLjQ0OC0xLDFzMC40NDcsMSwxLDFoMjljMC41NTMsMCwxLTAuNDQ4LDEtMVM0Ni4wNTMsNTMsNDUuNSw1M3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMyODU2ODA7IiBkPSJNMzcuNSw1N2gtMTRjLTAuNTUzLDAtMSwwLjQ0OC0xLDFzMC40NDcsMSwxLDFoMTRjMC41NTMsMCwxLTAuNDQ4LDEtMVMzOC4wNTMsNTcsMzcuNSw1N3oiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Link to="/"><Header as="h1" textAlign="center">Trackster</Header></Link>
              </Grid.Column>
              <Grid.Column textAlign="right">
                {this.renderSignUp()}
                {this.renderLogin()}
                <SearchHistory user={this.props.user}
                               fetchSearchHistory={this.props.fetchSearchHistory}
                               sendClearSearchHistory={this.props.sendClearSearchHistory}/>
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
