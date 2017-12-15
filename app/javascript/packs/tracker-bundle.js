import 'babel-polyfill'
import ReactOnRails from 'react-on-rails';

import TrackerApp from '../bundles/Tracker/startup/TrackerApp';
import trackerStore from '../bundles/Tracker/store/trackerStore';

// This is how react_on_rails can see the Tracker in the browser.
ReactOnRails.register({
  TrackerApp,
});

ReactOnRails.registerStore({
  trackerStore,
});
