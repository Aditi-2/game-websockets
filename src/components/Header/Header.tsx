import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAllUsersQuery } from '../../api/users';
import { onSecondPlayerJoin } from '../../slices/gameSlice';
import { RootState } from '../../store/store';
import { Wrapper, StyledWrapper, Title, Moto, Logo } from './Header.styled';

export const Header = () => {
  const { data = [] } = useAllUsersQuery();
  const dispatch = useDispatch();
  const room = useSelector((state: RootState) => state.userReducer.room);
  const roomJoined = useSelector((state: RootState) => state.userReducer.roomSelected);
  const roomType = useSelector((state: RootState) => state.userReducer.roomType);
  const username = useSelector((state: RootState) => state.userReducer.username);

  const secondPlayer =
    roomType === 'human' ? data.find((o) => o.name !== username && o.room === room)?.name : 'CPU';

  React.useEffect(() => {
    dispatch(onSecondPlayerJoin(secondPlayer));
  }, [secondPlayer, roomType]);

  const loginTitle = !username ? 'Login' : undefined;
  const roomTitle = username && !roomJoined ? 'Join a room to play' : undefined;
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
