export type Patient = {
  no: string;
  name: string;
  rnn: string;
  birth: Date;
  male: boolean;
  image: string | null;
};

export type GenericErrorReponse = {
  status: number;
  data: {
    subject: string;
  };
};

export function isGenericErrorReponse(
  error: unknown,
): error is GenericErrorReponse {
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
