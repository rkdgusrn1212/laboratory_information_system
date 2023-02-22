import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import { ListOrder, ListRequest, SpecimenContainer } from './types';

export interface ReadSpecimenContainerListRequest extends ListRequest {
  specimenContainerCodeKey?: string;
  specimenContainerCodeOrder?: ListOrder;
  specimenContainerNameKey: string;
  specimenContainerNameOrder?: ListOrder;
}

export type ReadSpecimenContainerListResponse = SpecimenContainer[];

const specimenContainerApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/specimen-container/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'specimenContainerApi',
  endpoints: (builder) => ({
    readSpecimenContainerList: builder.query<
      ReadSpecimenContainerListResponse,
      ReadSpecimenContainerListRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'list',
      }),
    }),
  }),
});
export default specimenContainerApi;
export const {
  useReadSpecimenContainerListQuery,
  useLazyReadSpecimenContainerListQuery,
} = specimenContainerApi;
