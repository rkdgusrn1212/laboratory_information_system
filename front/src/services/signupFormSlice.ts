import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DetailsForm {
  authId: string | undefined;
  authPassword: string | undefined;
  staffName: string | undefined;
  staffMale: boolean | undefined;
  staffBirth: string | undefined;
  staffPhone: string | undefined;
  staffImage: string | undefined;
  staffRrn: string | undefined;
}

export interface SignupForm extends DetailsForm {
  staffType: number | undefined;
}

export interface SignupFormState {
  form: SignupForm;
  step: 0 | 1 | 2 | 3;
}

const initialState: SignupFormState = {
  form: {} as SignupForm,
  step: 0,
};

const signupFormSlice = createSlice({
  name: 'signupForm',
  initialState: initialState,
  reducers: {
    completeType: (state, action: PayloadAction<number>) => {
      state.form['staffType'] = action.payload;
      state.step = 1;
    },
    completeDetails: (state, action: PayloadAction<DetailsForm>) => {
      state.form = { ...action.payload, ...state.form };
      state.step = 2;
    },
    completeValidation: (state) => {
      state.form = {} as SignupForm;
      state.step = 3;
    },
    cancelValidation: (state) => {
      state.step = 1;
    },
    cancelDetails: (state) => {
      state.form = { staffType: state.form.staffType } as SignupForm;
      state.step = 0;
    },
  },
});
export const {
  cancelDetails,
  cancelValidation,
  completeDetails,
  completeType,
  completeValidation,
} = signupFormSlice.actions;
export default signupFormSlice;
