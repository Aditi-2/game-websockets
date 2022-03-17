/* eslint react/jsx-no-useless-fragment: 0 */
/* eslint react/function-component-definition: 0 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedInStatus, onLoginStatusChange } from './slices/userSlice';
import { RootState } from './store/store';
import { socket } from './ws';

/**
 * TODO: Configure all the state actions depending on incoming message here
 */
export const SocketActions = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.userReducer);
  socket.on('randomNumber', (args: any) => {
    console.log('randomNumber', args);
  });

  socket.on('activateYourTurn', (args: any) => {
    console.log('activateYourTurn', args);
  });

  socket.on('gameOver', (args: any) => {
    console.log('gameOver', args);
  });

  socket.on('onReady', (args: any) => {
    console.log('onReady', args);
  });

  socket.on('error', (args: any) => {
    console.log('error', args);
  });

  socket.on('message', (args: any) => {
    console.log('message: ', args);
    if (username && args.message === `Welcome ${username}`) {
      dispatch(
        onLoginStatusChange({
          username,
          status: LoggedInStatus.LoggedIn,
        }),
      );
    }
  });

  socket.on('listTrigger', (args: any) => {
    console.log('listTrigger', args);
  });

  return <></>;
};
