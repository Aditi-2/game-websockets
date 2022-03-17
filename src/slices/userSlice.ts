import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LoggedInStatus {
  LoggedIn = 'LoggedIn',
  LoggedOut = 'LoggedOut',
  Pending = 'Pending',
  Error = 'Error',
}

interface UserState {
  loginStatus: LoggedInStatus;
  username?: string;
  room?: string;
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
      action: PayloadAction<{ username?: string; status: LoggedInStatus }>,
    ) => {
      state.loginStatus = action.payload.status;
      state.username = action.payload.username;
    },
    onRoomConnectionChange: (state, action: PayloadAction<string | undefined>) => {
      state.room = action.payload;
    },
  },
});

export const { onLoginStatusChange, onRoomConnectionChange } = userSlice.actions;

export default userSlice.reducer;
