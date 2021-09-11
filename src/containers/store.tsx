import { configureStore } from '@reduxjs/toolkit';
import CurrentLocalSlice from 'features/CurrentLocalSlice';
import SearchSlice from 'features/SearchSlice';
export const store = configureStore({
  reducer: {
    currentLocal: CurrentLocalSlice,
    search: SearchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
