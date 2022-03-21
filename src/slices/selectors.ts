import { RootState } from '../store/store';

export const gameResultSelector = (state: RootState) => state.gameReducer.gameResult;
export const gameStateSelector = (state: RootState) => state.gameReducer;

export const userStateSelector = (state: RootState) => state.userReducer;
export const userNameSelector = (state: RootState) => state.userReducer.username;
export const userIdSelector = (state: RootState) => state.userReducer.userId;
