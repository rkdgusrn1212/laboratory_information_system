import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { Department, ListRequest } from './types';

export type ReadDepartmentListRequest = Partial<{
  departmentCodeKey: string;
  departmentCodeOrder: 'DESC' | 'ASC';
  departmentNameKey: string;
  departmentNameOrder: 'DESC' | 'ASC';
}> &
  ListRequest;

export type ReadDepartmentListResponse = Department[];

const departmentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/department/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'departmentApi',
  endpoints: (builder) => ({
    readDepartmentList: builder.mutation<
      ReadDepartmentListResponse,
      ReadDepartmentListRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'list',
      }),
    }),
  }),
});
export default departmentApi;
export const { useReadDepartmentListMutation } = departmentApi;
