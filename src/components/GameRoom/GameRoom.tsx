import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Fab, Grid } from '@mui/material';
import { UserInput } from './UserInput/UserInput';
import { Wrapper, UserInputContainer, GameRoomMovesContainer } from './GameRoom.styled';
import { leaveRoom, letsPlay, sendNumber } from '../SocketActions/ws';

import { RootState } from '../../store/store';
import { disconnectRoom } from '../../slices/userSlice';
import { onSecondPlayerJoin, resetMoves } from '../../slices/gameSlice';
import { GameOverBackdrop } from '../GameOverBackdrop/GameOverBackdrop';
import { GameOperation } from '../../types/common';

const GAME_OPTIONS: GameOperation[] = [-1, 0, 1];

export const GameRoom = () => {
  const dispatch = useDispatch();
  const { room, username, roomSelected } = useSelector((state: RootState) => state.userReducer);
  const { number, gamePlayState, moves } = useSelector((state: RootState) => state.gameReducer);
  const ref = React.createRef<HTMLDivElement>();

  const handleLeaveRoom = () => {
    leaveRoom();
    dispatch(disconnectRoom());
    dispatch(onSecondPlayerJoin());
  };

  /**
   * Scroll to last move
   */
  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [moves.length]);

  React.useEffect(() => {
    dispatch(resetMoves());
  }, [room]);

  return (
    <Wrapper>
      <GameRoomMovesContainer>
        <div>
          {typeof number !== 'undefined' && (
            <UserInput
              isFirstNumber
              move={{
                isCorrectResult: false,
                number,
                result: number,
                username: '',
                selectedNumber: 0,
              }}
            />
          )}
          {moves.length > 0 &&
            moves.map((move, index) =>
              move.username === username ? (
                <UserInputContainer>
                  <UserInput
                    reverse
                    move={move}
                    ref={index === moves.length - 1 ? ref : undefined}
                  />
                </UserInputContainer>
              ) : (
                <UserInput move={move} ref={index === moves.length - 1 ? ref : undefined} />
              ),
            )}
        </div>
      </GameRoomMovesContainer>
      <div>
        <Grid
          container
          display='flex'
          direction='row'
          justifyItems='cennter'
          alignItems='center'
          justifyContent='center'
        >
          {gamePlayState === 'wait' && (
            <Grid item xs={12} sx={{ minHeight: '6em' }}>
              <Typography sx={{ mt: 3, mb: 2 }}>Waiting for the turn....</Typography>
            </Grid>
          )}
          {room && typeof number === 'undefined' && gamePlayState === 'play' && (
            <Grid item xs={12}>
              <Button type='button' onClick={letsPlay} variant='contained' fullWidth sx={{ mb: 2 }}>
                Let&apos;s Play
              </Button>
            </Grid>
          )}
          {gamePlayState === 'play' &&
            room &&
            typeof number !== 'undefined' &&
            GAME_OPTIONS.map((selectedNumber: GameOperation) => (
              <Grid
                item
                xs={4}
                display='flex'
                justifyContent='center'
                key={selectedNumber}
                sx={{ minHeight: '6em' }}
              >
                <Fab
                  sx={{ mt: 3, mb: 2 }}
                  aria-label={`add ${selectedNumber}`}
                  size='large'
                  onClick={() => sendNumber({ number, selectedNumber })}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                >
                  {selectedNumber}
                </Fab>
              </Grid>
            ))}
        </Grid>
        {roomSelected && (
          <Button
            type='button'
            sx={{ mb: 2 }}
            fullWidth
            onClick={handleLeaveRoom}
            variant='contained'
          >
            Leave Room
          </Button>
        )}
      </div>

      <GameOverBackdrop />
    </Wrapper>
  );
};
