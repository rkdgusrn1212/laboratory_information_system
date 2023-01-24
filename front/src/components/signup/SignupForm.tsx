import {
  useState,
  useRef,
  useCallback,
  FormEventHandler,
  useMemo,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StaffTypeForm from './StaffTypeForm';
import StaffDetailForm from './StaffDetailForm';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Logo from '../common/Logo';
import ValidationForm from './ValidationForm';
import { RootState, AppDispatch } from '../../store';
import {
  cancelDetails,
  cancelEmail,
  completeDetails,
  completeEmail,
  completeType,
  DetailsForm,
  reset,
  SignupFormState,
} from '../../services/signupFormSlice';
import { SignupRequest, useSignupMutation } from '../../services/authApi';

const steps = ['직책 선택', '필수정보 입력', '이메일 인증'];

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const typeRef = useRef<number>(null);
  const detailsRef = useRef<DetailsForm>(null);
  const validationRef = useRef<string>(null);
  const [signup, signupState] = useSignupMutation();
  const signupFormState: SignupFormState = useSelector(
    (state: RootState) => state.signupForm,
  );
  const useAppDispatch = useDispatch<AppDispatch>();

  const handleNext = () => {
    switch (signupFormState.status) {
      case 'uninitialized':
        useAppDispatch(completeType(typeRef.current as number));
        break;
      case 'typeCompleted':
        useAppDispatch(completeDetails(detailsRef.current as DetailsForm));
        break;
      case 'emailCompleted':
        useAppDispatch(completeEmail(validationRef.current as string));
        break;
    }
  };
  const handleBack = () => {
    switch (signupFormState.status) {
      case 'typeCompleted':
        useAppDispatch(reset());
        break;
      case 'detailsCompleted':
        useAppDispatch(cancelDetails());
        break;
      case 'emailCompleted':
        useAppDispatch(cancelEmail());
        useAppDispatch(cancelDetails());
        break;
    }
  };

  const handleSubmitSignupForm = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      useAppDispatch(completeEmail(validationRef.current as string));
      event.preventDefault();
    },
    [validationRef.current],
  );

  useEffect(() => {
    if (signupFormState.status === 'emailCompleted') {
      signup(signupFormState.form as SignupRequest);
    }
  }, [signupFormState.status]);

  const activeStep = useMemo(() => {
    switch (signupFormState.status) {
      case 'uninitialized':
        return 0;
      case 'typeCompleted':
        return 1;
      case 'detailsCompleted':
      case 'emailCompleted':
        return 2;
      case 'finished':
        return 3;
    }
  }, [signupFormState.status]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Logo size={30} sx={{ mt: 3 }} />
      <Box sx={{ mt: 3, display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        <AssignmentIndIcon fontSize="large" />
        <Typography variant="h5">가입신청</Typography>
      </Box>
      <Divider />
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ mt: 5 }}>
        {signupFormState.status === 'finished' ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <b>KHS 진단검사시스템</b> 가입이 신청되었습니다. 관리자의 최종
              승인 후 사용 가능합니다.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                onClick={() => {
                  navigate('/', { replace: true });
                }}
                fullWidth
                variant="contained"
              >
                <b>로그인 화면</b>으로 돌아가기
              </Button>
            </Box>
          </>
        ) : (
          <>
            {(() => {
              switch (signupFormState.status) {
                case 'uninitialized':
                  return <StaffTypeForm ref={typeRef} />;
                case 'typeCompleted':
                  return <StaffDetailForm ref={detailsRef} />;
                case 'detailsCompleted':
                case 'emailCompleted':
                  return (
                    <ValidationForm
                      ref={validationRef}
                      handleSubmit={handleSubmitSignupForm}
                    />
                  );
                default:
                  return null;
              }
            })()}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
              <Button
                color="inherit"
                disabled={signupFormState.status === 'uninitialized'}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                이전
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" onClick={handleNext}>
                {signupFormState.status === 'emailCompleted'
                  ? '가입하기'
                  : '다음'}
              </Button>
            </Box>
          </>
        )}
      </Box>
      {signupFormState.status === 'finished' || (
        <Box sx={{ mt: 3, mb: 3, display: 'inline-flex', gap: 1 }}>
          <Typography variant="body2">이미 계정이 있으신가요?</Typography>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/', { replace: true })}
          >
            로그인하기
          </Link>
        </Box>
      )}
    </Paper>
  );
};
export default SignupForm;
