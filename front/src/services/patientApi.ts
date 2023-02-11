import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import { CreatablePatient } from './types';

export type CreatePatientRequest = CreatablePatient;

export const patientApi = createApi({
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
    createPatient: builder.mutation<unknown, CreatePatientRequest>({
      query: (data) => ({
        body: { ...data, patientNo: 1 },
        method: 'POST',
        url: '',
      }),
    }),
  }),
});
export default patientApi;
export const { useCreatePatientMutation } = patientApi;
