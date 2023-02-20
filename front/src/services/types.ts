export const isArray = <T>(
  data: unknown,
  typeGuard: (elem: unknown) => elem is T,
): data is T[] => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every((elem) => {
      return typeGuard(elem);
    })
  );
};

export interface GeneralError {
  status: number;
  data: {
    subject: string;
  };
}

export const isGeneralError = (error: unknown): error is GeneralError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    typeof error.status === 'number' &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data != null &&
    'subject' in error.data &&
    typeof error.data.subject === 'string'
  );
};

export type GeneralErrorWithMessage = {
  data: {
    code: string;
    message: string;
  };
} & GeneralError;

export const isGeneralErrorWithMessage = (
  error: unknown,
): error is GeneralErrorWithMessage => {
  return (
    isGeneralError(error) &&
    'code' in error.data &&
    typeof error.data.code === 'string' &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  );
};

export type ValidationError<Fields extends string> = {
  data: { array: { field: Fields; value: string; message: string }[] };
} & GeneralError;

export const isValidationError = <T extends string>(
  error: unknown,
): error is ValidationError<T> => {
  return isGeneralError(error) && error.data.subject === 'validation';
};

export type MappedValidationError<T extends string> = {
  // eslint-disable-next-line no-unused-vars
  [key in T]: string | undefined;
};

export const mapValidationError = <T extends string>(
  error: ValidationError<T>,
): MappedValidationError<T> => {
  const result = {} as MappedValidationError<T>;
  for (const item of error.data.array) {
    result[item.field] = item.message;
  }
  return result;
};

export interface Staff {
  staffNo: number;
  staffName: string;
  staffBirth: string;
  staffMale: boolean;
  staffPhone: string;
  staffImage: string | null;
  staffRrn: string;
  staffAdmitted: boolean;
  staffType: number;
}

export const isStaff = (data: unknown): data is Staff =>
  typeof data === 'object' &&
  data != null &&
  'staffNo' in data &&
  typeof data.staffNo === 'number' &&
  'staffName' in data &&
  typeof data.staffName === 'string' &&
  'staffBirth' in data &&
  typeof data.staffBirth === 'string' &&
  'staffMale' in data &&
  typeof data.staffMale === 'boolean' &&
  'staffPhone' in data &&
  typeof data.staffPhone === 'string' &&
  'staffAdmitted' in data &&
  typeof data.staffAdmitted === 'boolean' &&
  'staffType' in data &&
  typeof data.staffType === 'number';

export interface Principal {
  authorities: (
    | 'ROLE_AUTHONLY'
    | 'ROLE_PENDING'
    | 'ROLE_STAFF'
    | 'ROLE_DOCTOR'
  )[];
  staffVo: Staff;
  username: string;
  validationEmail: string;
}

export interface Account {
  principal: Principal;
  accessToken: string;
}

export interface Patient {
  patientNo: number;
  patientName: string;
  patientRrn: string;
  patientBirth: string;
  patientMale: boolean;
  patientPhone: string;
}

export const isPatient = (data: unknown): data is Patient =>
  typeof data === 'object' &&
  data != null &&
  'patientNo' in data &&
  typeof data.patientNo === 'number' &&
  'patientName' in data &&
  typeof data.patientName === 'string' &&
  'patientRrn' in data &&
  typeof data.patientRrn === 'string' &&
  'patientBirth' in data &&
  typeof data.patientBirth === 'string' &&
  'patientMale' in data &&
  typeof data.patientMale === 'boolean' &&
  'patientPhone' in data &&
  typeof data.patientPhone === 'string';

export interface Department {
  departmentCode: string;
  departmentName: string;
}

export interface Doctor extends Staff {
  doctorCertification: number;
  departmentCode: string;
}

export const isDoctor = (data: unknown): data is Doctor =>
  isStaff(data) &&
  'doctorCertification' in data &&
  typeof data.doctorCertification === 'number' &&
  'departmentCode' in data &&
  typeof data.departmentCode === 'string';

export interface ConsultationReception {
  consultationReceptionNo: number;
  consultationReceptionTime: string;
  doctorNo: number;
  patientNo: number;
  consultationReceptionAppointment: string | null;
}

export const isConsultationReception = (
  data: unknown,
): data is ConsultationReception =>
  typeof data === 'object' &&
  data != null &&
  'consultationReceptionNo' in data &&
  typeof data.consultationReceptionNo === 'number' &&
  'consultationReceptionTime' in data &&
  typeof data.consultationReceptionTime === 'string' &&
  'doctorNo' in data &&
  typeof data.doctorNo === 'number' &&
  'patientNo' in data &&
  typeof data.patientNo === 'number' &&
  'consultationReceptionAppointment' in data &&
  (typeof data.consultationReceptionAppointment === 'string' ||
    data.consultationReceptionAppointment == null);

export interface ConsultationWalkIn extends ConsultationReception {
  consultationWalkInOrder: number;
}

export const isConsultationWalkIn = (
  data: unknown,
): data is ConsultationWalkIn =>
  isConsultationReception(data) &&
  'consultationWalkInOrder' in data &&
  typeof data.consultationWalkInOrder === 'number';

export interface ConsultationAppointment extends ConsultationReception {
  consultationReceptionAppointment: string;
}

export const isConsultationAppointment = (
  data: unknown,
): data is ConsultationAppointment =>
  isConsultationReception(data) &&
  data.consultationReceptionAppointment != null;

export interface Department {
  departmentCode: string;
  departmentName: string;
}

export interface ListRequest {
  pageSize: number;
  pageStart: number;
}

export type ListOrder = 'DESC' | 'ASC';

export interface Prescription {
  prescriptionCode: string;
  behaviorCode: string | null;
  prescriptionName: string;
  prescriptionClassificationCode: string;
  prescriptionSlipCode: string | null;
  prescriptionComment: string | null;
}
