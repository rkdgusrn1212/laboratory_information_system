import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import { Principal } from './authSlice';

export interface SignInResponse {
  accessToken: string;
  principal: Principal;
}
export interface SigninRequest {
  id: string;
  password: string;
}

export interface SignupRequest {
  authId: string;
  authPassword: string;
  validationEmail: string;
  staffName: string;
  staffMale: boolean;
  staffBirth: string;
  staffPhone: string;
  staffImage: string | null;
  staffRrn: string;
  staffType: number;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/auth/`,
    prepareHeaders: (headers, { getState }) => {
      // 스토어에 저장된 토큰이 있다면 요청에 실어 보낸다.
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    signin: builder.mutation<SignInResponse, SigninRequest>({
      query: (auth) => ({
        body: auth,
        method: 'Post',
        url: 'signin',
      }),
    }),
    signup: builder.mutation<boolean, SignupRequest>({
      query: (signUpResponse) => ({
        body: signUpResponse,
        method: 'Post',
        url: 'signup',
      }),
    }),
  }),
});
export default authApi;
export const { useSigninMutation, useSignupMutation } = authApi;
