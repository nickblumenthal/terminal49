import ReactOnRails from 'react-on-rails';

import TrackerApp from '../bundles/Tracker/startup/TrackerApp';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  TrackerApp,
});