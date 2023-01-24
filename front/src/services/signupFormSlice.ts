import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DetailsForm {
  authId: string | undefined;
  authPassword: string | undefined;
  staffName: string | undefined;
  staffBirth: string | undefined;
  staffPhone: string | undefined;
  staffImage: string | undefined;
  staffRrn: string | undefined;
}

export interface SignupForm extends DetailsForm {
  staffType: number | undefined;
  validationEmail: string | undefined;
}

export interface SignupFormState {
  form: SignupForm;
  status:
    | 'uninitialized'
    | 'typeCompleted'
    | 'detailsCompleted'
    | 'emailCompleted'
    | 'finished';
}

const initialState: SignupFormState = {
  form: {} as SignupForm,
  status: 'uninitialized',
};

const signupFormSlice = createSlice({
  name: 'signupForm',
  initialState: initialState,
  reducers: {
    completeType: (state, action: PayloadAction<number>) => {
      if (state.status !== 'uninitialized') {
        return;
      }
      state.form['staffType'] = action.payload;
      state.status = 'typeCompleted';
    },
    completeDetails: (state, action: PayloadAction<DetailsForm>) => {
      if (state.status !== 'typeCompleted') return;
      state.form = { ...action.payload, ...state.form };
      state.status = 'detailsCompleted';
    },
    completeEmail: (state, action: PayloadAction<string>) => {
      if (state.status !== 'detailsCompleted') return;
      state.form['validationEmail'] = action.payload;
      state.status = 'emailCompleted';
    },
    cancelEmail: (state) => {
      if (state.status !== 'emailCompleted') return;
      state.form.validationEmail = '';
      state.status = 'detailsCompleted';
    },
    cancelDetails: (state) => {
      if (state.status !== 'detailsCompleted') return;
      state.form = {} as SignupForm;
      state.status = 'typeCompleted';
    },
    reset: () => initialState,
  },
});
export const {
  completeType,
  completeDetails,
  completeEmail,
  cancelEmail,
  cancelDetails,
  reset,
} = signupFormSlice.actions;
export default signupFormSlice;
