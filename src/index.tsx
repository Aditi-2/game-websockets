import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Global } from '@emotion/react';
import App from './components/App/App';
import { store } from './store/store';
import { SocketActions } from './components/SocketActions/SocketActions';
import { GlobalStyles } from './index.styled';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global styles={GlobalStyles} />
      <SocketActions />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
