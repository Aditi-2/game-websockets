import { useSelector } from 'react-redux';
import { userNameSelector, userStateSelector } from './slices/selectors';
import { useAllUsersQuery } from './api/users';
import { RoomType } from './types/common';

export const useSecondPlayerName = (roomId?: string, roomType?: RoomType) => {
  const { data = [] } = useAllUsersQuery();
  const { username = '', roomSelected } = useSelector(userStateSelector);
  if (!roomSelected) {
    return undefined;
  }
  return roomType === 'human'
    ? data.find((o) => o.name !== username && o.room === roomId)?.name ?? 'CPU'
    : 'CPU';
};
