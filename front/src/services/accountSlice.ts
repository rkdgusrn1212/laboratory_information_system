import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import authApi from './authApi';
import doctorApi from './doctorApi';
import nurseApi from './nurseApi';
import { Account } from './types';

const accountSlice = createSlice({
  name: 'account',
  initialState: null as Account | null,
  reducers: {
    signout: () => null,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signin.matchFulfilled,
      (state, { payload }) => payload,
    );
    builder.addMatcher(
      authApi.endpoints.writeDetails.matchFulfilled,
      (state, { payload }) => payload,
    );
    builder.addMatcher(
      authApi.endpoints.updateDetails.matchFulfilled,
      (state, { payload }) => payload,
    );
    builder.addMatcher(
      doctorApi.endpoints.registerDoctor.matchFulfilled,
      (state, { payload }) => payload,
    );
    builder.addMatcher(
      nurseApi.endpoints.registerNurse.matchFulfilled,
      (state, { payload }) => payload,
    );
  },
});
export default accountSlice;
export const { signout } = accountSlice.actions;
export const selectAccount = (state: RootState) => state.account;
