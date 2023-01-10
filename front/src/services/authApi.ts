import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Auth, JWT } from './types';
import server from '../server.json';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${server.host}/api/auth/` }),
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    getTokenByAuth: builder.query<JWT, Auth>({
      query: (auth) => ({
        body: auth,
        method: 'Post',
        url: 'signin',
      }),
    }),
  }),
});
export const { useGetTokenByAuthQuery } = authApi;
