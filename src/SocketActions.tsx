import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAllUsersQuery } from './api/users';
import { addMove, onGameOver, onGamePlayStateChange, onNumberReceived } from './slices/gameSlice';
import { LoggedInStatus, onLoginStatusChange } from './slices/userSlice';
import { RootState } from './store/store';
import { GameOperation, GamePlayState } from './types/common';
import { socket } from './utils/ws';

const roundToTwoDecimals = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

/**
 * Headless component for adding subscriptions
 */
export const SocketActions = () => {
  const dispatch = useDispatch();
  const { refetch } = useAllUsersQuery();
  const username = useSelector((state: RootState) => state.userReducer.username);
  const userId = useSelector((state: RootState) => state.userReducer.userId);

  React.useEffect(() => {
    /**
     * Remove any previously attached listenners
     */
    socket.removeAllListeners();

    /**
     * Then add all the listeners again
     */
    socket.on(
      'randomNumber',
      (args: {
        number: string;
        isFirst: boolean;
        user: string;
        selectedNumber: GameOperation;
        isCorrectResult: boolean;
      }) => {
        const number = Number(args.number);
        if (args.isFirst) {
          dispatch(onNumberReceived(number));
        } else {
          dispatch(
            addMove({
              number,
              selectedNumber: args.selectedNumber,
              username: args.user,
              result: roundToTwoDecimals((args.selectedNumber + number) / 3),
              isCorrectResult: args.isCorrectResult,
            }),
          );
        }
      },
    );

    socket.on('activateYourTurn', (args: { user: string; state: GamePlayState }) => {
      if (args.user === userId) {
        dispatch(onGamePlayStateChange(args.state));
      } else {
        const state = args.state === 'wait' ? 'play' : 'wait';
        dispatch(onGamePlayStateChange(state));
      }
    });

    socket.on('gameOver', ({ user, isOver }: { user: string; isOver: boolean }) => {
      if (isOver && user === username) {
        dispatch(onGameOver('win'));
      }
      if (isOver && user !== username) {
        dispatch(onGameOver('lose'));
      }
    });

    socket.on('onReady', (args: { state: boolean }) => {
      refetch();
      if (args.state) {
        dispatch(onGamePlayStateChange('play'));
      } else {
        dispatch(onGamePlayStateChange());
      }
    });

    socket.on(
      'message',
      (args: { user: string; room?: string; message: string; socketId?: string }) => {
        if (username && args.socketId && args.message === `Welcome ${username}`) {
          dispatch(
            onLoginStatusChange({
              username,
              status: LoggedInStatus.LoggedIn,
              userId: args.socketId,
            }),
          );
        }
      },
    );
  }, [username, userId, refetch]);

  return <></>;
};
