import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import authSlice from './services/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDM) => getDM().concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
