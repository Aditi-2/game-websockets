import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomType } from '../types/common';

export enum LoggedInStatus {
  LoggedIn = 'LoggedIn',
  LoggedOut = 'LoggedOut',
  Pending = 'Pending',
  Error = 'Error',
}

interface UserState {
  loginStatus: LoggedInStatus;
  userId?: string;
  username?: string;
  room?: string;
  roomType?: RoomType;
  roomSelected?: boolean;
}

const initialState: UserState = {
  loginStatus: LoggedInStatus.LoggedOut,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    onLoginStatusChange: (
      state,
      action: PayloadAction<{ username?: string; status: LoggedInStatus; userId?: string }>,
    ) => {
      state.loginStatus = action.payload.status;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    onRoomConnectionChange: (state, action: PayloadAction<{ room?: string; type?: RoomType }>) => {
      state.room = action.payload.room;
      state.roomType = action.payload.type;
      state.roomSelected = Boolean(action.payload.room);
    },
    disconnectRoom: (state) => {
      state.roomSelected = false;
    },
  },
});

export const { onLoginStatusChange, onRoomConnectionChange, disconnectRoom } = userSlice.actions;

export default userSlice.reducer;
