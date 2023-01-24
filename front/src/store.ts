import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import authSlice from './services/authSlice';
import signupFormSlice from './services/signupFormSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    signupForm: signupFormSlice.reducer,
  },
  middleware: (getDM) => getDM().concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
