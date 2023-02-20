import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import { Prescription, ListRequest } from './types';

export interface ReadPrescriptionListRequest extends ListRequest {
  prescriptionCodeKey?: string;
  prescriptionCodeOrder?: string;
  prescriptionNameKey?: string;
  prescriptionNameOrder?: string;
  prescriptionClassificationCodeKey?: string;
  prescriptionClassificationCodeOrder?: string;
  prescriptionSlipCodeKey?: string;
  prescriptionSlipCodeOrder?: string;
  prescriptionCommentKey?: string;
  prescriptionCommentOrder?: string;
}

export type ReadPrescriptionListResponse = Prescription[];

const prescriptionApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server.host}/api/prescription`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account?.accessToken;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  reducerPath: 'prescriptionApi',
  endpoints: (builder) => ({
    readPrescriptionList: builder.query<
      ReadPrescriptionListResponse,
      ReadPrescriptionListRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'list',
      }),
    }),
  }),
});

export default prescriptionApi;
export const {
  useLazyReadPrescriptionListQuery,
  useReadPrescriptionListQuery,
} = prescriptionApi;
