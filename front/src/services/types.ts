export interface GenericError {
  status: number;
  data: {
    subject: string;
  };
}

export function isGenericError(error: unknown): error is GenericError {
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
}

export type GenericErrorWithMessage = {
  data: {
    code: string;
    message: string;
  };
} & GenericError;

export function isGenericErrorWithMessage(
  error: unknown,
): error is GenericErrorWithMessage {
  return (
    isGenericError(error) &&
    'code' in error.data &&
    typeof error.data.code === 'string' &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  );
}

export interface Staff {
  staffNo: number;
  staffName: string;
  staffBirth: string;
  staffMale: boolean;
  staffPhone: string;
  staffImage: string;
  staffRrn: string;
  staffAdmitted: boolean;
  staffType: number;
}

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
  no: string;
  name: string;
  rnn: string;
  birth: Date;
  male: boolean;
  image: string | null;
}
