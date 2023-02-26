import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import {
  Account,
  Department,
  Doctor,
  ExclusiveDoctor,
  ListOrder,
  ListRequest,
} from './types';

export type RegisterDoctorRequest = Pick<
  Doctor,
  'departmentCode' | 'doctorCertification'
>;

export interface ReadDoctorListWithDepartmentRequest extends ListRequest {
  departmentCodeKey?: string;
  departmentCodeOrder?: ListOrder;
  departmentNameKey?: string;
  departmentNameOrder?: ListOrder;
}
export type ReadDoctorListWithDepartmentResponse = (Doctor & Department)[];

export type ReadDoctorRequest = number;
export type ReadDoctorResponse = ExclusiveDoctor;

export type RegisterDoctorResponse = Account;

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
    registerDoctor: builder.mutation<
      RegisterDoctorResponse,
      RegisterDoctorRequest
    >({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'register',
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
    readDoctor: builder.query<ReadDoctorResponse, ReadDoctorRequest>({
      query: (data) => ({
        method: 'GET',
        url: data.toString(),
      }),
    }),
  }),
});
export default doctorApi;
export const {
  useRegisterDoctorMutation,
  useReadDoctorListWithDepartmentQuery,
  useReadDoctorQuery,
  useLazyReadDoctorQuery,
} = doctorApi;
