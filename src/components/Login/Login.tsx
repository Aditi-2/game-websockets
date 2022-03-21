import React from 'react';
import { Box, Button, Container, TextField, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../SocketActions/ws';
import { LoggedInStatus, onLoginStatusChange } from '../../slices/userSlice';
import { userStateSelector } from '../../slices/selectors';

export const Login = () => {
  const [username, setUsername] = React.useState('');
  const dispatch = useDispatch();
  const { loginStatus } = useSelector(userStateSelector);

  const handleClick = () => {
    if (
      username &&
      (LoggedInStatus.LoggedOut === loginStatus || LoggedInStatus.Error === loginStatus)
    ) {
      login(username);
      dispatch(
        onLoginStatusChange({
          status: LoggedInStatus.Pending,
          username,
        }),
      );
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 10, px: 20 }}>
        <Grid container direction='column'>
          <Grid item>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              type='button'
              onClick={handleClick}
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
