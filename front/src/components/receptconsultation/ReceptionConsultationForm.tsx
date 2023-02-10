import { memo, useState, useCallback } from 'react';
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

import StepRrn from './StepRrn';
import { WritablePatient } from '../../services/types';
import StepNameAndPhone from './StepNameAndPhone';
import StepPrivacyPolicy from './StepPrivacyPolicy';

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
  // eslint-disable-next-line no-unused-vars
  onNextClick: (data: Partial<WritablePatient>) => void;
}

const InnerForm = memo(({ step, onNextClick }: InnerFormProps) => {
  switch (step) {
    case 0:
      return <StepRrn onRrnSubmit={onNextClick} />;
    case 1:
      return <StepNameAndPhone onStepAndPhoneSubmit={onNextClick} />;
    case 2:
      return <StepPrivacyPolicy onAgree={onNextClick as any} />;
    case 3:
      return <></>;
    case 4:
      return <></>;
    default:
      return null;
  }
});

const ReceptionConsultationForm: React.FC<{ isNew: boolean }> = ({ isNew }) => {
  const [step, setStep] = useState(0);
  const [patient, setPatient] = useState<WritablePatient>({
    patientName: '',
    patientRrn: '',
    patientBirth: '',
    patientMale: false,
    patientPhone: '',
  });

  const handleNextClick = useCallback(
    (data: Partial<WritablePatient>) => {
      setPatient({ ...patient, ...data });
      if (step == 0) {
        if (isNew) {
          setStep(1);
        } else {
          setStep(3);
        }
      } else {
        setStep(step + 1);
      }
    },
    [step, setStep, isNew, patient],
  );

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
      <InnerForm step={step} onNextClick={handleNextClick} />
    </Stack>
  );
};
export default ReceptionConsultationForm;
