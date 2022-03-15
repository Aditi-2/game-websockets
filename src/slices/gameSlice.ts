import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameOperation = -1 | 0 | 1;
export type GameResult = 'win' | 'lose';
export type PlayerType = 'playerOne' | 'playerTwo';
export type GameMove = {
    userId: string;
    receivedNumber: number;
    operation: GameOperation;
    result: number
}

interface GameState {
    playerOne?: string;
    playerTwo?: string;
    moves: GameMove[];
    nextMove: 'playerOne' | 'playerTwo'
    gameResult?: GameResult;
}

const initialState: GameState = {
    moves: [],
    nextMove: 'playerOne',
}

const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,
    reducers: {
      addMove(state, action: PayloadAction<GameMove>) {
        state.moves.push(action.payload)
      },
      setGameResult(state, action: PayloadAction<GameResult>) {
        state.gameResult = action.payload
      },
      setNextPlayer(state, action: PayloadAction<PlayerType>) {
          state.nextMove = action.payload
      },
      setPlayer(state, action: PayloadAction<{type: PlayerType, playerId: string}>) {
          const {playerId, type} = action.payload;
          state[type] = playerId
      }
    }
  })

  export const {
    addMove,
    setGameResult,
    setNextPlayer,
    setPlayer
  } = gameSlice.actions
  
  export default gameSlice.reducer