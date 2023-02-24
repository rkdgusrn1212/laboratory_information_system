import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import server from '../server.json';
import { Patient, ListOrder } from './types';

export type CreatePatientRequest = Omit<Patient, 'patientNo'>;

export interface ReadPatientListRequest {
  patientNoKey: string;
  patientNoOrder: ListOrder;
  patientNameKey: string;
  patientNameOrder: ListOrder;
  patientMaleKey: string;
  patientMaleOrder: ListOrder;
  patientPhoneKey: string;
  patientPhoneOrder: ListOrder;
  patientRrnKey: string;
  patientRrnOrder: ListOrder;
  patientBirthStart: string;
  patientBirthEnd: string;
  patientBirthOrder: ListOrder;
}

export type ReadPatientListResponse = Patient[];

export type ReadPatientByPatientNoRequest = number;
export type ReadPatientByPatientNoResponse = Patient;

export type ReadPatientByPatientRrnResponse = Patient;
export type ReadPatientByPatientRrnRequest = Pick<Patient, 'patientRrn'>;

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
    readPatientList: builder.query<
      ReadPatientListResponse,
      ReadPatientListRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'list',
      }),
    }),
    readPatientByPatientNo: builder.query<
      ReadPatientByPatientNoResponse,
      ReadPatientByPatientNoRequest
    >({
      query: (data) => ({
        method: 'GET',
        url: data.toString(),
      }),
    }),
    readPatientByPatientRrn: builder.query<
      ReadPatientByPatientRrnResponse,
      ReadPatientByPatientRrnRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: '',
      }),
    }),
  }),
});
export default patientApi;
export const {
  useCreatePatientMutation,
  useReadPatientListQuery,
  useLazyReadPatientListQuery,
  useReadPatientByPatientNoQuery,
  useLazyReadPatientByPatientNoQuery,
  useLazyReadPatientByPatientRrnQuery,
  useReadPatientByPatientRrnQuery,
} = patientApi;
