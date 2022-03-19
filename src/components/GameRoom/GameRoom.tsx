import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { UserInput } from './UserInput/UserInput';
import { Wrapper, UserInputContainer, GameRoomMovesContainer } from './GameRoom.styled';
import { leaveRoom, letsPlay, sendNumber } from '../../utils/ws';

import { RootState } from '../../store/store';
import { disconnectRoom } from '../../slices/userSlice';
import { onSecondPlayerJoin, resetMoves } from '../../slices/gameSlice';

export const GameRoom = () => {
  const dispatch = useDispatch();
  const { room, username, roomSelected } = useSelector((state: RootState) => state.userReducer);
  const { number, gamePlayState, moves } = useSelector((state: RootState) => state.gameReducer);
  const ref = React.createRef<HTMLDivElement>();

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
      {gamePlayState === 'wait' && <Typography>Waiting for the turn</Typography>}
      {room && typeof number === 'undefined' && gamePlayState === 'play' && (
        <Button
          type='button'
          onClick={letsPlay}
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Let&apos;s Play
        </Button>
      )}
      {gamePlayState === 'play' && room && typeof number !== 'undefined' && (
        <>
          <Button
            type='button'
            onClick={() => sendNumber({ number, selectedNumber: -1 })}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            -1
          </Button>
          <Button
            type='button'
            onClick={() => sendNumber({ number, selectedNumber: 0 })}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            0
          </Button>
          <Button
            type='button'
            onClick={() => sendNumber({ number, selectedNumber: 1 })}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            1
          </Button>
        </>
      )}
      {roomSelected && (
        <Button
          type='button'
          onClick={() => {
            leaveRoom();
            dispatch(disconnectRoom());
            dispatch(onSecondPlayerJoin());
          }}
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Leave Room
        </Button>
      )}
    </Wrapper>
  );
};
