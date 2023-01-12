import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Auth, JWT } from './types';
import server from '../server.json';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${server.host}/api/auth/` }),
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    signin: builder.query<JWT, Auth>({
      query: (auth) => ({
        body: auth,
        method: 'Post',
        url: 'signin',
      }),
    }),
    signout: builder.query<void, void>({
      query: () => ({}),
    }),
  }),
});
export const { useSigninQuery } = authApi;
