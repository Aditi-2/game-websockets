import { useSelector } from 'react-redux';
import { userStateSelector } from './slices/selectors';
import { useAllUsersQuery } from './api/users';
import { RoomType } from './types/common';

export const useSecondPlayerName = (roomId?: string, roomType?: RoomType) => {
  const { data = [] } = useAllUsersQuery();
  const {
    username = '',
    roomSelected,
    room,
    roomType: selectedRoomType,
  } = useSelector(userStateSelector);
  if (!roomType && !roomSelected) {
    return undefined;
  }
  const innerRoomType = roomType ?? selectedRoomType;
  const innerRoomId = roomId ?? room;
  if (innerRoomType === 'cpu') {
    return 'CPU';
  }
  if (innerRoomType === 'human') {
    return data.find((o) => o.name !== username && o.room === innerRoomId)?.name;
  }
  return undefined;
};
