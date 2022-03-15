import { configureStore } from '@reduxjs/toolkit'

/**
 * TODO: add reducers here
 */
export const store = configureStore({
  reducer: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch