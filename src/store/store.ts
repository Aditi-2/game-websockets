import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { roomsApi } from '../api/rooms';
import { usersApi } from '../api/users';
import gameReducer from '../slices/gameSlice';

 export const store = configureStore({
  reducer: {
    gameReducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
