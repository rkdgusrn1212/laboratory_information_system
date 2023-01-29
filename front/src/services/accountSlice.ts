import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import authApi from './authApi';
import { Account } from './types';

const accountSlice = createSlice({
  name: 'account',
  initialState: null as Account | null,
  reducers: {
    signout: () => null,
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.signin.matchFulfilled,
      (state, { payload }) => {
        state = payload;
      },
    );
  },
});
export default accountSlice;
export const { signout } = accountSlice.actions;
export const selectAccount = (state: RootState) => state.account;
