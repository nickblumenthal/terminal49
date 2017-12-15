import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../store/trackerStore';
import routes from '../routes/routes';

export default (_props, _railsContext) => {
  const store = null;

  return (
      <Provider store={configureStore(store)}>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </Provider>
  );
};
