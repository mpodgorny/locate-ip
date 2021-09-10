import { configureStore } from '@reduxjs/toolkit';
import CurrentLocalSlice from 'features/CurrentLocalSlice';

export const store = configureStore({
  reducer: {
    currentLocal: CurrentLocalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
