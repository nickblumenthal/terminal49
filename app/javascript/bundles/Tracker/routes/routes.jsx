import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TrackerContainer from '../containers/TrackerContainer'

export default (
    <Switch>
      <Route
          path="/"
          component={TrackerContainer}
          exact
      />
    </Switch>
);
