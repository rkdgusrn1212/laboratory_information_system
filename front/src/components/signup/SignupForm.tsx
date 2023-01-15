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
import Divider from '@mui/material/Divider';
import Logo from '../common/Logo';

const steps = ['직책 선택', '필수정보 입력', '계정 생성'];

const InnerForm: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  switch (activeStep) {
    case 0:
      return <MemberTypeForm />;
    case 1:
      return <MemberDetailForm />;
    case 2:
      return <></>;
    default:
      return null;
  }
};

const SignupForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Logo size={30} sx={{ mt: 3 }} />
      <Box sx={{ mt: 3, display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        <AssignmentIndIcon fontSize="large" />
        <Typography variant="h5">회원가입</Typography>
      </Box>
      <Divider />
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <InnerForm activeStep={activeStep} />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
      <Box sx={{ mt: 3, mb: 3, display: 'inline-flex', gap: 1 }}>
        <Typography variant="body2">이미 계정이 있으신가요?</Typography>
        <Link href="/" variant="body2">
          로그인하기
        </Link>
      </Box>
    </Paper>
  );
};
export default SignupForm;
