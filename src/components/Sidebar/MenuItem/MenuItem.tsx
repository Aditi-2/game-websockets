import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuWrapper, ItemContent } from './MenuItem.styled';
import { ReactComponent as Arrow } from '../../../icons/arrow.svg';
import { Room } from '../../../types/common';
import { joinRoom, leaveRoom } from '../../SocketActions/ws';
import { onSecondPlayerJoin } from '../../../slices/gameSlice';
import { onRoomConnectionChange } from '../../../slices/userSlice';
import { userNameSelector, userRoomelectedSelector } from '../../../slices/selectors';
import { useSecondPlayerName } from '../../../hooks';

export const MenuItem = ({ item: { id, name, type } }: { item: Room }) => {
  const dispatch = useDispatch();
  const username = useSelector(userNameSelector) ?? '';
  const roomSelected = useSelector(userRoomelectedSelector) ?? '';
  const secondPlayerName = useSecondPlayerName(id, type);

  return (
    <MenuWrapper
      onClick={() => {
        if (roomSelected) {
          leaveRoom();
        }
        joinRoom({ room: id, roomType: type, username });
        dispatch(
          onRoomConnectionChange({
            room: id,
            type,
          }),
        );
        dispatch(onSecondPlayerJoin(secondPlayerName));
      }}
    >
      <ItemContent>
        {name} <Arrow />
      </ItemContent>
    </MenuWrapper>
  );
};
