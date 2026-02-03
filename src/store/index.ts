import { configureStore } from '@reduxjs/toolkit';
import cestaReducer from './cestaSlice';

export const store = configureStore({
  reducer: {
    cesta: cestaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;