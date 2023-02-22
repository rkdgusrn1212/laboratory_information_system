import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import { ListOrder, ListRequest, SpecimenType } from './types';

export interface ReadSpecimenTypeListRequest extends ListRequest {
  specimenTypeCodeKey?: string;
  specimenTypeCodeOrder?: ListOrder;
  specimenTypeNameKey: string;
  specimenTypeNameOrder?: ListOrder;
}

export type ReadSpecimenTypeListResponse = SpecimenType[];

const specimenTypeApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/specimen-type/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'specimenTypeApi',
  endpoints: (builder) => ({
    readSpecimenTypeList: builder.query<
      ReadSpecimenTypeListResponse,
      ReadSpecimenTypeListRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'list',
      }),
    }),
  }),
});
export default specimenTypeApi;
export const {
  useReadSpecimenTypeListQuery,
  useLazyReadSpecimenTypeListQuery,
} = specimenTypeApi;
