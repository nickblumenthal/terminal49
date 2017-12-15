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
    this.state = { name: this.props.name };
  }

  render() {
    return (
        <Form className="search">
          <Form.Field>
            <label>Booking Number</label>
            <input placeholder='Booking Number' />
          </Form.Field>
          <Button type='submit'>Search</Button>
        </Form>
    );
  }
}
