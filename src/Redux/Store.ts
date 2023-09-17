import { configureStore } from '@reduxjs/toolkit'
import { coffeeResucer } from './Reducer'
export const store = configureStore({
  reducer: {
    coffee: coffeeResucer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch