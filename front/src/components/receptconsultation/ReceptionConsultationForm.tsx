import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import Stepper from '@mui/material/Stepper';
import Stack from '@mui/material/Stack';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import StepRrn from './StepRrn';
import StepNameAndPhone from './StepNameAndPhone';
import StepPrivacyPolicy from './StepPrivacyPolicy';
import StepSelectDoctor from './StepSelectDoctor';
import { Department, Doctor, Patient } from '../../services/types';
import { CreatePatientRequest } from '../../services/patientApi';
import StepFinish from './StepFinsish';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <VideoLabelIcon />,
    5: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  '주민번호 입력',
  '이름/ 휴대폰 번호 입력',
  '개인정보 수집·이용 제공동의',
  '진료의 선택',
  '접수완료',
];

interface InnerFormProps {
  step: number;
  onSuccess: // eslint-disable-next-line no-unused-vars
  (data: { patient?: Partial<Patient>; doctor?: Doctor & Department }) => void;
  onException: () => void;
  onReset: () => void;
  patient: Partial<Patient>;
  doctor: Partial<Doctor & Department>;
  isExistPatient: boolean;
}

const InnerForm = ({
  step,
  patient,
  doctor,
  onReset,
  onSuccess,
  onException,
  isExistPatient,
}: InnerFormProps) => {
  switch (step) {
    case 0:
      return <StepRrn onSuccess={onSuccess} isExistPatient={isExistPatient} />;
    case 1:
      return <StepNameAndPhone onSuccess={onSuccess} />;
    case 2:
      return (
        <StepPrivacyPolicy
          patient={patient as CreatePatientRequest}
          onSuccess={onSuccess}
          onException={onException}
        />
      );
    case 3:
      return (
        <StepSelectDoctor
          patient={patient as Patient}
          onSuccess={onSuccess}
          onException={onException}
        />
      );
    case 4:
      return (
        <StepFinish
          patient={patient as Patient}
          doctor={doctor as Doctor & Department}
          onReset={onReset}
        />
      );
    default:
      return null;
  }
};

const ReceptionConsultationForm: React.FC<{
  isNew: boolean;
  onReset: () => void;
}> = ({ isNew, onReset }) => {
  const [step, setStep] = useState(0);
  const [patient, setPatient] = useState<Partial<Patient>>({});
  const [toastOpen, setToastOpen] = useState(false);
  const [doctor, setDoctor] = useState<Partial<Doctor & Department>>({});

  const handleSuccess = (data: {
    patient?: Partial<Patient>;
    doctor?: Doctor & Department;
  }) => {
    if (data.patient) setPatient({ ...patient, ...data.patient });
    if (data.doctor) setDoctor(data.doctor);
    switch (step) {
      case 0:
        if (isNew) {
          setStep(1);
        } else {
          setStep(3);
        }
        break;
      default:
        setStep(step + 1);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const handleException = () => {
    setToastOpen(true);
  };

  const handleReset = () => {
    setStep(0);
    setPatient({});
    setDoctor({});
    onReset();
  };

  return (
    <Stack sx={{ width: '100%', px: 2 }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={step}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <b>{label}</b>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <InnerForm
        step={step}
        patient={patient}
        doctor={doctor}
        onReset={handleReset}
        onSuccess={handleSuccess}
        onException={handleException}
        isExistPatient={!isNew}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          알수없는 오류가 발생했습니다.
        </Alert>
      </Snackbar>
    </Stack>
  );
};
export default ReceptionConsultationForm;
