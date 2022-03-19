import React from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../utils/ws';
import { RootState } from '../../store/store';
import { LoggedInStatus, onLoginStatusChange } from '../../slices/userSlice';

export const Login = () => {
  const [username, setUsername] = React.useState('');
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state: RootState) => state.userReducer);

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
      <Box sx={{ mt: 1 }}>
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

        <Button
          type='button'
          onClick={handleClick}
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};
