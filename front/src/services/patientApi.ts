import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import { Patient } from './types';

export type CreatePatientRequest = Omit<Patient, 'patientNo'>;

const patientApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/patient`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'patientApi',
  endpoints: (builder) => ({
    createPatient: builder.mutation<number, CreatePatientRequest>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '',
      }),
    }),
  }),
});
export default patientApi;
export const { useCreatePatientMutation } = patientApi;
