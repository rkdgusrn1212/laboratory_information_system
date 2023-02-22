import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import {
  Prescription,
  ListRequest,
  GeneralErrorWithMessage,
  isGeneralErrorWithMessage,
} from './types';

export type ReadPrescriptionResponse = Prescription;

export type ReadPrescriptionRequest = string;

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

export type CreatePrescriptionRequest = Partial<Prescription> &
  Pick<Prescription, 'prescriptionCode' | 'prescriptionName'>;

export type CreatePrescriptionError = {
  data: { code: 'DUPLICATED' };
} & GeneralErrorWithMessage;

export const isCreatePrescriptionError = (
  error: unknown,
): error is CreatePrescriptionError =>
  isGeneralErrorWithMessage(error) &&
  error.data.subject === 'createPrescription';

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
    readPrescription: builder.query<
      ReadPrescriptionResponse,
      ReadPrescriptionRequest
    >({
      query: (data) => ({
        method: 'GET',
        url: data,
      }),
    }),
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
    createPrescription: builder.mutation<void, CreatePrescriptionRequest>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '',
      }),
    }),
    countPrescription: builder.query<number, void>({
      query: () => ({
        method: 'GET',
        url: 'list/count',
      }),
    }),
  }),
});
export default prescriptionApi;
export const {
  useLazyReadPrescriptionListQuery,
  useReadPrescriptionListQuery,
  useCreatePrescriptionMutation,
  useCountPrescriptionQuery,
  useLazyCountPrescriptionQuery,
  useLazyReadPrescriptionQuery,
  useReadPrescriptionQuery,
} = prescriptionApi;
