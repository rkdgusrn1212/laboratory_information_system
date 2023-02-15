import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { Department, Doctor, ListOrder, ListRequest } from './types';

export type CreateDoctorRequest = Pick<
  Doctor,
  'staffNo' | 'departmentCode' | 'doctorCertification'
>;

export interface ReadDoctorListWithDepartmentRequest extends ListRequest {
  departmentCodeKey?: string;
  departmentCodeOrder?: ListOrder;
  departmentNameKey?: string;
  departmentNameOrder?: ListOrder;
}
export type ReadDoctorListWithDepartmentResponse = (Doctor & Department)[];

const doctorApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/doctor/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'doctorApi',
  endpoints: (builder) => ({
    createDoctor: builder.mutation<unknown, CreateDoctorRequest>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '',
      }),
    }),
    readDoctorListWithDepartment: builder.query<
      ReadDoctorListWithDepartmentResponse,
      ReadDoctorListWithDepartmentRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'list-with-department',
      }),
    }),
  }),
});
export default doctorApi;
export const { useCreateDoctorMutation, useReadDoctorListWithDepartmentQuery } =
  doctorApi;
