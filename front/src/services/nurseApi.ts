import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { Account } from './types';

export type RegisterNurseResponse = Account;

const nurseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/nurse/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'nurseApi',
  endpoints: (builder) => ({
    registerNurse: builder.mutation<RegisterNurseResponse, void>({
      query: () => ({
        method: 'POST',
        url: 'register',
      }),
    }),
  }),
});
export default nurseApi;
export const { useRegisterNurseMutation } = nurseApi;
