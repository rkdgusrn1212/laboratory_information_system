import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import authApi from './authApi';

export interface Principal {
  name: string;
  birth: string;
  male: boolean;
  phone: string;
  email: string;
  image: string;
  type: number;
}

type AuthState = {
  principal: Principal | null;
  token: string | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { principal: null, token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    //api의 자동생성 action에 매핑
    builder.addMatcher(
      authApi.endpoints.signin.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.accessToken;
        state.principal = payload.principal;
        console.log(state.principal);
      },
    );
  },
});
export default authSlice;

export const selectPrincipal = (state: RootState) => state.auth.principal;
