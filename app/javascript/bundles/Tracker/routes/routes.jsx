import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TrackerContainer from '../containers/TrackerContainer'
import BookingDetailContainer from '../containers/BookingDetailContainer'
import HeaderContainer from '../containers/HeaderContainer'

export default (
    <Route path="/" component={HeaderContainer} />
);
