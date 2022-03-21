import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSecondPlayerName } from '../../hooks';
import { onSecondPlayerJoin } from '../../slices/gameSlice';
import { userStateSelector } from '../../slices/selectors';
import { Wrapper, StyledWrapper, Title, Moto, Logo } from './Header.styled';

export const Header = () => {
  const dispatch = useDispatch();
  const { room, roomSelected, roomType, username } = useSelector(userStateSelector);
  const secondPlayer = useSecondPlayerName(room, roomType);

  React.useEffect(() => {
    dispatch(onSecondPlayerJoin(secondPlayer));
  }, [secondPlayer, roomType]);

  const loginTitle = !username ? 'Login' : undefined;
  const roomTitle = username && !roomSelected ? 'Join a room to play' : undefined;
  const secondPlayerTitle = secondPlayer
    ? `Playing with ${secondPlayer}`
    : 'Waiting for other players';

  return (
    <Wrapper>
      <Logo />
      <StyledWrapper>
        <Title>{loginTitle ?? roomTitle ?? secondPlayerTitle}</Title>
        <Moto>Win the game or win the job</Moto>
      </StyledWrapper>
    </Wrapper>
  );
};
