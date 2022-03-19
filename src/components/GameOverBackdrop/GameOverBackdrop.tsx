import React from 'react';
import { Backdrop, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resetGame } from '../../slices/gameSlice';

export const GameOverBackdrop = () => {
  const dispatch = useDispatch();
  const gameResult = useSelector((state: RootState) => state.gameReducer.gameResult);
  return (
    <Backdrop open={Boolean(gameResult)} onClick={() => dispatch(resetGame())}>
      {gameResult && <Typography fontSize='3rem'>{`You ${gameResult}`}</Typography>}
    </Backdrop>
  );
};
