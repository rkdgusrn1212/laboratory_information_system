import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { Consultation } from './types';

export type CreateConsultationRequest = Omit<
  Consultation,
  'consultationNo' | 'consultationTime'
>;
export type CreateConsultationResponse = Consultation;

const consultationApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/consultation`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'consultationApi',
  endpoints: (builder) => ({
    createConsultation: builder.mutation<
      CreateConsultationResponse,
      CreateConsultationRequest
    >({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '',
      }),
    }),
  }),
});

export default consultationApi;
export const { useCreateConsultationMutation } = consultationApi;
