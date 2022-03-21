import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuWrapper, ItemContent } from './MenuItem.styled';
import { ReactComponent as Arrow } from '../../../icons/arrow.svg';
import { Room } from '../../../types/common';
import { joinRoom } from '../../SocketActions/ws';
import { RootState } from '../../../store/store';
import { onSecondPlayerJoin } from '../../../slices/gameSlice';
import { useAllUsersQuery } from '../../../api/users';
import { onRoomConnectionChange } from '../../../slices/userSlice';

export const MenuItem = ({ item: { id, name, owner, type } }: { item: Room }) => {
  const dispatch = useDispatch();
  const { data = [] } = useAllUsersQuery();
  const username = useSelector((state: RootState) => state.userReducer.username) ?? '';
  const secondPlayer = data.find((o) => o.name !== username && o.room === id);

  return (
    <MenuWrapper
      onClick={() => {
        joinRoom({ room: id, roomType: type, username });
        dispatch(
          onRoomConnectionChange({
            room: id,
            type,
          }),
        );
        if (type === 'cpu') {
          dispatch(onSecondPlayerJoin('CPU'));
        } else if (type === 'human' && secondPlayer) {
          dispatch(onSecondPlayerJoin(secondPlayer.name));
        }
      }}
    >
      <ItemContent>
        {name} <Arrow />
      </ItemContent>
    </MenuWrapper>
  );
};
