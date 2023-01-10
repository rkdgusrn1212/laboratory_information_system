import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDM) => getDM().concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
