import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App/App';
import { store } from './store/store';
import { SocketActions } from './components/SocketActions/SocketActions';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketActions />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
