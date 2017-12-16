import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TrackerContainer from '../containers/TrackerContainer'
import BookingDetailContainer from '../containers/BookingDetailContainer'

export default (
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
);
