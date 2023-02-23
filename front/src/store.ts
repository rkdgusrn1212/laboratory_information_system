import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authApi from './services/authApi';
import accountSlice from './services/accountSlice';
import patientApi from './services/patientApi';
import doctorApi from './services/doctorApi';
import departmentApi from './services/departmentApi';
import consultationReceptionApi from './services/consultationReceptionApi';
import prescriptionApi from './services/prescriptionApi';
import behaviorApi from './services/behaviorApi';
import specimenTypeApi from './services/specimenTypeApi';
import specimenContainerApi from './services/specimenContainerApi';
import testPrescriptionApi from './services/testPrescriptionApi';
import testFieldApi from './services/testFieldApi';
import consultationApi from './services/consultationApi';
import prescriptionOrderApi from './services/prescriptionOrderApi';

const rootReducer = combineReducers({
  account: accountSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [consultationReceptionApi.reducerPath]: consultationReceptionApi.reducer,
  [prescriptionApi.reducerPath]: prescriptionApi.reducer,
  [behaviorApi.reducerPath]: behaviorApi.reducer,
  [specimenTypeApi.reducerPath]: specimenTypeApi.reducer,
  [specimenContainerApi.reducerPath]: specimenContainerApi.reducer,
  [testPrescriptionApi.reducerPath]: testPrescriptionApi.reducer,
  [testFieldApi.reducerPath]: testFieldApi.reducer,
  [consultationApi.reducerPath]: consultationApi.reducer,
  [prescriptionOrderApi.reducerPath]: prescriptionOrderApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDM) =>
    getDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(patientApi.middleware)
      .concat(doctorApi.middleware)
      .concat(departmentApi.middleware)
      .concat(consultationReceptionApi.middleware)
      .concat(prescriptionApi.middleware)
      .concat(behaviorApi.middleware)
      .concat(specimenTypeApi.middleware)
      .concat(specimenContainerApi.middleware)
      .concat(testPrescriptionApi.middleware)
      .concat(testFieldApi.middleware)
      .concat(consultationApi.middleware)
      .concat(prescriptionOrderApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
