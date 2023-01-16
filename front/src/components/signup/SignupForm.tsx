import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MemberTypeForm from './MemberTypeForm';
import MemberDetailForm from './MemberDetailForm';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Logo from '../common/Logo';
import ValidationForm from './ValidationForm';

const steps = ['이메일 인증', '직책 선택', '필수정보 입력', '가입완료'];

const InnerForm: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  switch (activeStep) {
    case 0:
      return <ValidationForm />;
    case 1:
      return <MemberTypeForm />;
    case 2:
      return <MemberDetailForm />;
    default:
      return null;
  }
};

const SignupForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
        {activeStep === steps.length ? (
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
            <InnerForm activeStep={activeStep} />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                이전
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? '가입하기' : '다음'}
              </Button>
            </Box>
          </>
        )}
      </Box>
      {activeStep === steps.length || (
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
