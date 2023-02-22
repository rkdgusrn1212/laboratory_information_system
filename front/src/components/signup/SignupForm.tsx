import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import teal from '@mui/material/colors/teal';

import Logo from '../common/Logo';
import CreateAuthForm from './CreateAuthForm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAccount, signout } from '../../services/accountSlice';
import StaffDetailsForm from './StaffDetailsForm';

const steps = ['인증 및 아이디 생성', '상세정보 입력'];

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);
  const [step, setStep] = useState(
    account == null
      ? 0
      : account.principal.authorities[0] === 'ROLE_AUTHONLY' ||
        account.principal.authorities[0] === 'ROLE_NANTYPE'
      ? 1
      : 2,
  );
  const [toastOpen, setToastOpen] = useState(false);

  const handleException = () => toastOpen;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        mt={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={1}
      >
        <Typography
          color={teal[300]}
          variant="h5"
          display="inline-flex"
          alignItems="center"
          gap={1}
        >
          <AssignmentIndIcon htmlColor={teal[300]} fontSize="medium" />
          가입신청
        </Typography>
        <Logo size={20} color={teal[300]} />
      </Box>
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
        {step == 0 && (
          <CreateAuthForm
            onSuccess={() => setStep(1)}
            onException={handleException}
          />
        )}
        {step == 1 && (
          <StaffDetailsForm
            onSuccess={() => setStep(2)}
            onException={handleException}
          />
        )}
        {step == 2 && (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <b>KHS 진단검사시스템</b> 가입이 신청되었습니다. 관리자의 최종
              승인 후 사용 가능합니다.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                onClick={() => {
                  dispatch(signout());
                  navigate('/', { replace: true });
                }}
                fullWidth
                variant="contained"
              >
                <b>로그인 화면</b>으로 돌아가기
              </Button>
            </Box>
          </>
        )}
      </Box>
      {step < 2 && (
        <Box sx={{ mt: 3, mb: 3, display: 'inline-flex', gap: 1 }}>
          <Typography variant="body2">
            {step == 0 ? '이미' : '다른'} 계정이 있으신가요?
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              dispatch(signout());
              navigate('/', { replace: true });
            }}
          >
            로그인하기
          </Link>
        </Box>
      )}
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
    </Box>
  );
};
export default SignupForm;
