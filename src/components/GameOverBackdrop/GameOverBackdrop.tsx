import React from 'react';
import { Backdrop, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame } from '../../slices/gameSlice';
import { gameResultSelector } from '../../slices/selectors';

export const GameOverBackdrop = () => {
  const dispatch = useDispatch();
  const gameResult = useSelector(gameResultSelector);
  const handleClick = () => dispatch(resetGame());

  return (
    <Backdrop open={Boolean(gameResult)} onClick={handleClick}>
      {gameResult && <Typography fontSize='3rem'>{`You ${gameResult}`}</Typography>}
    </Backdrop>
  );
};
