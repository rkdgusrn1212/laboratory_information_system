import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import { Account, GenericErrorWithMessage, isGenericError } from './types';

export type SigninResponse = Account;

export interface SigninRequest {
  authId: string;
  authPassword: string;
}

export interface CreateValidationRequest {
  validationEmail: string;
}

type CreateValidationError = {
  data: {
    code: 'UNKNOWN' | 'DUPLICATED_EMAIL' | 'INVALID_EMAIL';
  };
} & GenericErrorWithMessage;

export function isCreateValidationError(
  error: unknown,
): error is CreateValidationError {
  return isGenericError(error) && error.data.subject === 'createValidation';
}

export interface CreateAuthRequest {
  authId: string;
  authPassword: string;
  validationEmail: string;
  validationCode: string;
}

type CreateAuthError = {
  data: {
    code: 'UNKNOWN' | 'DUPLICATED_ID' | 'WRONG_CODE' | 'EMAIL_NOT_EXIST';
  };
} & GenericErrorWithMessage;

export function isCreateAuthError(error: unknown): error is CreateAuthError {
  return isGenericError(error) && error.data.subject === 'createAuth';
}

export interface WriteDetailsRequest {
  staffName: string;
  staffBirth: string;
  staffMale: boolean;
  staffPhone: string;
  staffImage: string;
  staffRrn: string;
  staffType: number;
}

type WriteDetailsError = {
  data: {
    code: 'UNKNOWN';
  };
} & GenericErrorWithMessage;

export function isWriteDetailsError(
  error: unknown,
): error is WriteDetailsError {
  return isGenericError(error) && error.data.subject === 'writeDetails';
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/auth/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (auth) => ({
        body: auth,
        method: 'POST',
        url: 'signin',
      }),
    }),
    createValidation: builder.mutation<unknown, CreateValidationRequest>({
      query: (body) => ({
        body: body,
        method: 'POST',
        url: 'issue-validation-code',
      }),
    }),
    createAuth: builder.mutation<unknown, CreateAuthRequest>({
      query: (body) => ({
        body: body,
        method: 'POST',
        url: 'create-auth',
      }),
    }),
    writeDetails: builder.mutation<unknown, WriteDetailsRequest>({
      query: (body) => ({
        body: body,
        method: 'POST',
        url: 'write-details',
      }),
    }),
  }),
});
export default authApi;
export const {
  useSigninMutation,
  useCreateValidationMutation,
  useCreateAuthMutation,
  useWriteDetailsMutation,
} = authApi;
