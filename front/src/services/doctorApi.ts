import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { Doctor } from './types';

export type CreateDoctorRequest = Pick<
  Doctor,
  'staffNo' | 'departmentCode' | 'doctorCertification'
>;

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
  }),
});
export default doctorApi;
export const { useCreateDoctorMutation } = doctorApi;
