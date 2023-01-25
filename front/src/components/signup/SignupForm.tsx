import { useRef } from 'react';
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
import {
  cancelDetails,
  cancelValidation,
  completeDetails,
  completeType,
  completeValidation,
  DetailsForm,
  SignupFormState,
} from '../../services/signupFormSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const steps = ['직책 선택', '필수정보 입력', '이메일 인증'];

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const typeRef = useRef<number>(null);
  const detailsRef = useRef<DetailsForm>(null);
  const validationRef = useRef<{ email: string; code: string }>(null);
  const signupFormState: SignupFormState = useAppSelector(
    (state) => state.signupForm,
  );
  const dispatch = useAppDispatch();

  const handleNext = () => {
    switch (signupFormState.step) {
      case 0:
        dispatch(completeType(typeRef.current as number));
        break;
      case 1:
        console.log(detailsRef.current as DetailsForm);
        dispatch(completeDetails(detailsRef.current as DetailsForm));
        break;
      case 2:
        dispatch(completeValidation());
        break;
    }
  };
  const handleBack = () => {
    switch (signupFormState.step) {
      case 2:
        dispatch(cancelValidation());
        break;
      case 1:
        dispatch(cancelDetails());
        break;
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Logo size={30} sx={{ mt: 3 }} />
      <Box sx={{ mt: 3, display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        <AssignmentIndIcon fontSize="large" />
        <Typography variant="h5">가입신청</Typography>
      </Box>
      <Divider />
      <Stepper
        activeStep={signupFormState.step}
        alternativeLabel
        sx={{ mt: 3 }}
      >
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
        {signupFormState.step == 3 ? (
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
              switch (signupFormState.step) {
                case 0:
                  return <StaffTypeForm ref={typeRef} />;
                case 1:
                  return <StaffDetailForm ref={detailsRef} />;
                case 2:
                  return <ValidationForm ref={validationRef} />;
              }
            })()}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
              <Button
                color="inherit"
                disabled={signupFormState.step === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                이전
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" onClick={handleNext}>
                {signupFormState.step === 2 ? '가입하기' : '다음'}
              </Button>
            </Box>
          </>
        )}
      </Box>
      {signupFormState.step == 3 || (
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
