import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { PrescriptionOrder } from './types';

export type CreatePrescriptionOrderRequest = Omit<
  PrescriptionOrder,
  'prescriptionOrderNo'
>[];

const prescriptionOrderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/prescription-order`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'prescriptionOrderApi',
  endpoints: (builder) => ({
    createPrescriptionOrder: builder.mutation<
      void,
      CreatePrescriptionOrderRequest
    >({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '',
      }),
    }),
  }),
});
export default prescriptionOrderApi;
export const { useCreatePrescriptionOrderMutation } = prescriptionOrderApi;
