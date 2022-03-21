import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { connnection } from '../SocketActions/ws';
import { RootState } from '../../store/store';
import { LoggedInStatus } from '../../slices/userSlice';
import { Login } from '../Login/Login';
import { Home } from '../Home/Home';
import { Header } from '../Header/Header';
import { usePrefetch } from '../../api/rooms';

const theme = createTheme();

function App() {
  const { loginStatus } = useSelector((state: RootState) => state.userReducer);
  const prefetchAllRooms = usePrefetch('allRooms');

  React.useEffect(() => {
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
