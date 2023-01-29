import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import accountSlice from './services/accountSlice';

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDM) => getDM().concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
