import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { connnection, getWebSocketInstance } from '../SocketActions/ws';
import { LoggedInStatus } from '../../slices/userSlice';
import { Login } from '../Login/Login';
import { Home } from '../Home/Home';
import { Header } from '../Header/Header';
import { usePrefetch } from '../../api/rooms';
import { userStateSelector } from '../../slices/selectors';

const theme = createTheme();

function App() {
  const { loginStatus } = useSelector(userStateSelector);
  const prefetchAllRooms = usePrefetch('allRooms');

  React.useEffect(() => {
    getWebSocketInstance();
    connnection();
    prefetchAllRooms();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {LoggedInStatus.LoggedIn === loginStatus && <Home />}
      {LoggedInStatus.LoggedIn !== loginStatus && <Login />}
    </ThemeProvider>
  );
}

export default App;
