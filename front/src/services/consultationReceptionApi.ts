import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import server from '../server.json';
import { RootState } from '../store';
import {
  Doctor,
  ListOrder,
  Patient,
  ListRequest,
  ConsultationReception,
  ConsultationWalkIn,
  ConsultationAppointment,
} from './types';

export type CreateConsultationAppointmentRequest = Omit<
  ConsultationReception,
  'consultationReceptionTime' | 'consultationReceptionNo'
>;

export type CreateConsultationWalkInRequest = Pick<Doctor, 'staffNo'> &
  Pick<Patient, 'patientNo'>;

export interface ReadConsultationWalkInRequest extends ListRequest {
  staffNo?: number;
  staffNoOrder?: ListOrder;
  consultationWalkInStart?: number;
  consultationWalkInEnd?: number;
  consultationWalkInOrderOrder?: ListOrder;
}

export type ReadConsultationWalkInResponse = ConsultationWalkIn[];

export interface ReadConsultationAppointmentRequest extends ListRequest {
  staffNo?: number;
  staffNoOrder?: ListOrder;
  consultationReceptionAppointmentStart?: number;
  consultationReceptionAppointmentEnd?: number;
  consultationReceptionAppointmentOrder?: ListOrder;
}

export type ReadConsultationAppointmentResponse = ConsultationAppointment[];

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
    createConsultationAppointment: builder.mutation<
      unknown,
      CreateConsultationAppointmentRequest
    >({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'appointment',
      }),
    }),
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
    readConsultationWalkInList: builder.query<
      ReadConsultationWalkInResponse,
      ReadConsultationWalkInRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'walk-in/list',
      }),
    }),
    readConsultationAppointmentList: builder.query<
      ReadConsultationAppointmentResponse,
      ReadConsultationAppointmentRequest
    >({
      query: (data) => ({
        params: data,
        method: 'GET',
        url: 'appointment/list',
      }),
    }),
  }),
});

export default consultationReceptionApi;
export const {
  useCreateConsultationWalkInMutation,
  useReadConsultationWalkInListQuery,
  useLazyReadConsultationWalkInListQuery,
  useCreateConsultationAppointmentMutation,
  useLazyReadConsultationAppointmentListQuery,
  useReadConsultationAppointmentListQuery,
} = consultationReceptionApi;
