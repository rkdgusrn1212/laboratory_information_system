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

export type ReadableStaff = Omit<Staff, 'staffRrn'>;

export interface Principal {
  authorities: (
    | 'ROLE_AUTHONLY'
    | 'ROLE_PENDING'
    | 'ROLE_STAFF'
    | 'ROLE_DOCTOR'
  )[];
  staffVo: ReadableStaff;
  username: string;
  validationEmail: string;
}

export interface Account {
  principal: Principal;
  accessToken: string;
}

export interface Patient {
  patientNo: string;
  patientName: string;
  patientRrn: string;
  patientBirth: string;
  patientMale: boolean;
}

export type ReadablePatient = Omit<Patient, 'patientRrn'>;
