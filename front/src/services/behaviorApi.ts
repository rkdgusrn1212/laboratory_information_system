import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import { ListOrder, ListRequest, Behavior } from './types';

export interface ReadBehaviorListRequest extends ListRequest {
  behaviorCodeKey?: string;
  behaviorCodeOrder?: ListOrder;
  behaviorClassificationKey?: string;
  behaviorClassificationOrder?: ListOrder;
  behaviorNameKrKey?: string;
  behaviorNameKrOrder?: ListOrder;
  behaviorNameEnKey?: string;
  behaviorNameEnOrder?: ListOrder;
}

export type ReadBehaviorListResponse = Behavior[];

const behaviorApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/behavior/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'behaviorApi',
  endpoints: (builder) => ({
    readBehaviorList: builder.query<
      ReadBehaviorListResponse,
      ReadBehaviorListRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'list',
      }),
    }),
  }),
});
export default behaviorApi;
export const { useLazyReadBehaviorListQuery, useReadBehaviorListQuery } =
  behaviorApi;
