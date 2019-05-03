import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './components/App';

// TODO: Switch to Concurrent Mode with future React release
ReactDOM.render(<App />, document.getElementById('tictactoe'));

serviceWorker.register();
