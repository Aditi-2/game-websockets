import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameMove, GamePlayState, GameResult } from '../types/common';

interface GameState {
  moves: GameMove[];
  gamePlayState?: GamePlayState;
  gameResult: GameResult | null;
  number?: number;
  secondPlayer?: string;
}

const initialState: GameState = {
  moves: [],
  gameResult: null,
};

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    addMove(state, action: PayloadAction<GameMove>) {
      state.moves.push(action.payload);
    },
    onGameOver(state, action: PayloadAction<GameResult>) {
      state.gameResult = action.payload;
    },
    onGamePlayStateChange(state, action: PayloadAction<GamePlayState | undefined>) {
      state.gamePlayState = action.payload;
    },
    onNumberReceived: (state, action: PayloadAction<number>) => {
      state.number = action.payload;
    },
    onSecondPlayerJoin: (state, action: PayloadAction<string | undefined>) => {
      state.secondPlayer = action.payload;
    },
    resetMoves: (state) => {
      state.moves = [];
    },
    resetGame: (state) => {
      state.moves = [];
      state.gameResult = null;
      state.number = undefined;
    },
  },
});

export const {
  addMove,
  onGameOver,
  onGamePlayStateChange,
  onNumberReceived,
  onSecondPlayerJoin,
  resetMoves,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
