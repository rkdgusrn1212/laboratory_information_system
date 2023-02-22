import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { TestField, ListRequest } from './types';

export type ReadTestFieldListRequest = Partial<{
  testFieldCodeKey: string;
  testFieldCodeOrder: 'DESC' | 'ASC';
  testFieldNameKey: string;
  testFieldNameOrder: 'DESC' | 'ASC';
}> &
  ListRequest;

export type ReadTestFieldListResponse = TestField[];

const testFieldApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/test-field/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'testFieldApi',
  endpoints: (builder) => ({
    readTestFieldList: builder.mutation<
      ReadTestFieldListResponse,
      ReadTestFieldListRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'list',
      }),
    }),
  }),
});
export default testFieldApi;
export const { useReadTestFieldListMutation } = testFieldApi;
