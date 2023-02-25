import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import {
  Account,
  GeneralErrorWithMessage,
  isGeneralError,
  Staff,
} from './types';

export type SigninResponse = Account;

export interface SigninRequest {
  authId: string;
  authPassword: string;
}

export interface issueValidationCodeRequest {
  validationEmail: string;
}

type IssueValidationCodeError = {
  data: {
    code: 'UNKNOWN' | 'DUPLICATED_EMAIL' | 'INVALID_EMAIL';
  };
} & GeneralErrorWithMessage;

export function isIssueValidationCodeError(
  error: unknown,
): error is IssueValidationCodeError {
  return isGeneralError(error) && error.data.subject === 'issueValidationError';
}

export interface CreateAuthRequest {
  authId: string;
  authPassword: string;
  validationEmail: string;
  validationCode: string;
}

export type CreateAuthField = keyof CreateAuthRequest;

type CreateAuthError = {
  data: {
    code:
      | 'UNKNOWN'
      | 'DUPLICATED_ID'
      | 'WRONG_CODE'
      | 'EMAIL_NOT_EXIST'
      | 'DUPLICATED_EMAIL';
  };
} & GeneralErrorWithMessage;

export function isCreateAuthError(error: unknown): error is CreateAuthError {
  return isGeneralError(error) && error.data.subject === 'createAuth';
}

export type WriteDetailsRequest = Omit<
  Staff,
  'staffNo' | 'staffAdmitted' | 'staffType'
>;

export type WriteDetailsField = keyof WriteDetailsRequest;

type WriteDetailsError = {
  data: {
    code: 'UNKNOWN';
  };
} & GeneralErrorWithMessage;

export function isWriteDetailsError(
  error: unknown,
): error is WriteDetailsError {
  return isGeneralError(error) && error.data.subject === 'writeDetails';
}

export type WriteDetailsResponse = Account;

export type UpdateDetailsRequest = Omit<
  Staff,
  'staffNo' | 'staffAdmitted' | 'staffType'
>;

export type UpdateDetailsResponse = Account;

export type IsExistRequest = Pick<SigninRequest, 'authId'>;

const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/auth/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
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
    issueValidationCode: builder.mutation<unknown, issueValidationCodeRequest>({
      query: (body) => ({
        body: body,
        method: 'POST',
        url: 'issue-validation-code',
      }),
    }),
    createAuth: builder.mutation<void, CreateAuthRequest>({
      query: (body) => ({
        body: body,
        method: 'POST',
        url: 'create-auth',
      }),
    }),
    writeDetails: builder.mutation<WriteDetailsResponse, WriteDetailsRequest>({
      query: (body) => ({
        body: body,
        method: 'POST',
        url: 'write-details',
      }),
    }),
    updateDetails: builder.mutation<
      UpdateDetailsResponse,
      UpdateDetailsRequest
    >({
      query: (body) => ({
        body: body,
        method: 'POST',
        url: 'update-details',
      }),
    }),
    isExist: builder.query<boolean, IsExistRequest>({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'is-exist',
      }),
    }),
  }),
});
export default authApi;
export const {
  useSigninMutation,
  useIssueValidationCodeMutation,
  useCreateAuthMutation,
  useWriteDetailsMutation,
  useIsExistQuery,
  useLazyIsExistQuery,
  useUpdateDetailsMutation,
} = authApi;
