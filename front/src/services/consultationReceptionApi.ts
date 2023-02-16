import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { Doctor, Patient } from './types';

export type CreateConsultationWalkInRequest = Pick<Doctor, 'staffNo'> &
  Pick<Patient, 'patientNo'>;

const consultationReceptionApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/consultation-reception`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'consultationReceptionApi',
  endpoints: (builder) => ({
    createConsultationWalkIn: builder.mutation<
      unknown,
      CreateConsultationWalkInRequest
    >({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'walk-in',
      }),
    }),
  }),
});

export default consultationReceptionApi;
export const { useCreateConsultationWalkInMutation } = consultationReceptionApi;
