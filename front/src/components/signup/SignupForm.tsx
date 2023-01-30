import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAccount, signout } from '../../services/accountSlice';
import {
  CreateAuthField,
  CreateAuthRequest,
  isCreateAuthError,
  useCreateAuthMutation,
  useWriteDetailsMutation,
  WriteDetailsRequest,
} from '../../services/authApi';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { isValidationError } from '../../services/types';

const steps = ['인증 및 아이디 생성', '직책 선택', '상세정보 입력'];

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const typeRef = useRef<number>(null);
  const accountState = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<number>(0);
  const [createAuth, createAuthState] = useCreateAuthMutation();
  const [writeDetails, writeDetailsState] = useWriteDetailsMutation();
  const [createAuthForm, setCreateAuthForm] = useState<CreateAuthRequest>();
  const [toastOpen, setToastOpen] = useState(false);

  const handleCreateAuthFormComplete = useCallback(
    (form: CreateAuthRequest | undefined) => {
      setCreateAuthForm(form);
    },
    [],
  );

  useEffect(() => {
    if (accountState) {
      if (accountState.principal.authorities[0] === 'ROLE_AUTHONLY') {
        setStep((step) => (step < 1 || step > 2 ? 1 : step));
      } else {
        setStep(3);
      }
    } else {
      setStep(0);
    }
  }, [accountState]);

  const handleNext = useCallback(() => {
    switch (step) {
      case 0:
        createAuth(createAuthForm as CreateAuthRequest);
        break;
      case 1:
        setStep(2);
        break;
      case 2:
        writeDetails({} as WriteDetailsRequest);
        break;
    }
  }, [step, createAuth, writeDetails, createAuthForm]);

  const handleBack = useCallback(() => {
    switch (step) {
      case 2:
        setStep(1);
        break;
      case 1:
        dispatch(signout());
        break;
    }
  }, [step, dispatch]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const createAuthError = useMemo(() => {
    const result = {} as { [key in CreateAuthField]: string | undefined };
    if (createAuthState.isError) {
      const error = createAuthState.error;
      if (isCreateAuthError(error)) {
        switch (error.data.code) {
          case 'DUPLICATED_ID':
            result.authId = error.data.message;
            break;
          case 'EMAIL_NOT_EXIST':
            result.validationEmail = error.data.message;
            break;
          case 'WRONG_CODE':
            result.validationCode = error.data.message;
            break;
          default:
            setToastOpen(true);
        }
      } else if (isValidationError<CreateAuthField>(error)) {
        for (const item of error.data.array) {
          result[item.field] = item.message;
        }
      } else {
        setToastOpen(true);
      }
    }
    console.log(result);
    return result;
  }, [createAuthState.error, createAuthState.isError]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Logo size={30} sx={{ mt: 3 }} />
      <Box sx={{ mt: 3, display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        <AssignmentIndIcon fontSize="large" />
        <Typography variant="h5">가입신청</Typography>
      </Box>
      <Divider />
      <Stepper activeStep={step} alternativeLabel sx={{ mt: 3 }}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ mt: 5, mb: 2 }}>
        {step == 3 ? (
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
              switch (step) {
                case 0:
                  return (
                    <ValidationForm
                      onCreateAuthFormComplete={handleCreateAuthFormComplete}
                      error={createAuthError}
                    />
                  );
                case 1:
                  return <StaffTypeForm ref={typeRef} />;
                case 2:
                  return <StaffDetailForm />;
              }
            })()}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
              <Button
                color="inherit"
                disabled={step === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                이전
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Box sx={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!createAuthForm || createAuthState.isLoading}
                >
                  {(() => {
                    switch (step) {
                      case 0:
                        return '아이디 생성';
                      case 1:
                        return '다음';
                      case 2:
                        return '가입신청';
                    }
                  })()}
                </Button>
                {createAuthState.isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'primary',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          "알수없는 오류가 발생했습니다."
        </Alert>
      </Snackbar>
      {step == 3 || (
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
