import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { TestPrescription, Prescription } from './types';

export type UpdateTestPrescriptionRequest = Partial<
  Omit<TestPrescription, keyof Prescription>
> &
  Pick<TestPrescription, 'prescriptionCode'>;

const testPrescriptionApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/test-prescription`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'testPrescriptionApi',
  endpoints: (builder) => ({
    updateTestPrescription: builder.mutation<
      void,
      UpdateTestPrescriptionRequest
    >({
      query: (data) => ({
        body: data,
        method: 'PATCH',
        url: '',
      }),
    }),
  }),
});
export default testPrescriptionApi;
export const { useUpdateTestPrescriptionMutation } = testPrescriptionApi;
