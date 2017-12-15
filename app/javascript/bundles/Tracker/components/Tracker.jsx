import PropTypes from 'prop-types';
import React from 'react';

import { Button, Checkbox, Form } from 'semantic-ui-react'

export default class Tracker extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { bookingNumber: '' };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const bookingNumber = this.state.bookingNumber
  };

  render() {
    return (
        <Form className="search" onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Booking Number</label>
            <input placeholder='Booking Number' onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Search</Button>
        </Form>
    );
  }
}
