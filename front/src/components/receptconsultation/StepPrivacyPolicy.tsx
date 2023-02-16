import { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import {
  CreatePatientRequest,
  useCreatePatientMutation,
} from '../../services/patientApi';
import { Patient } from '../../services/types';

interface StepPrivacyPolicyProps {
  patient: CreatePatientRequest;
  // eslint-disable-next-line no-unused-vars
  onSuccess: (data: { patient: Patient }) => void;
  onException: () => void;
}

const StepPrivacyPolicy: React.FC<StepPrivacyPolicyProps> = ({
  patient,
  onSuccess,
  onException,
}) => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createPatient, createPatientState] = useCreatePatientMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setChecked(event.target.checked);
    if (checked) {
      setError(null);
    }
  };

  const handleNextClick = () => {
    if (!checked) {
      setError('개인정보 수집·이용 목적에 동의를 해야 진행할 수 있습니다.');
      return;
    }
    createPatient(patient)
      .unwrap()
      .then((data) => {
        onSuccess({ patient: { ...patient, patientNo: data } });
      })
      .catch(() => {
        onException();
      });
  };

  return (
    <Box>
      <Typography variant="h5">개인정보 수집·이용 목적</Typography>
      <Typography variant="subtitle1" my={1}>
        (주)KHS laboratory Information System은 귀하의 소중한 개인정보를 아래와
        같은 목적으로 수집·이용합니다.
      </Typography>
      <Typography variant="body2">1. 진료서비스</Typography>
      <Typography variant="body2" my={1}>
        ○ 진료 및 입원, 검진예약, 조회 및 진료 서비스 이용에 따른 본인 확인과
        안내 절차에 사용
        <br />○ 진료예약 및 검사예약 및 검사예약 일정알림 및 진료상담서비스 ○
        진단 및 치료 등을 위한 서비스 (협의진료에 필요한 개인정보)
        <br /> ○ 진료비 청구, 수납, 환급 등의 원무 서비스 등
      </Typography>
      <Typography variant="body2" my={1}>
        2. 수집하려는 개인정보의 항목
      </Typography>
      <Typography variant="body2" my={1}>
        ○ 필수항목 : 성명, 주민등록번호, 성별, 나이, 연락처(휴대폰번호/전화번호)
      </Typography>
      <Typography variant="body2" my={1}>
        3. 개인정보의 보유 및 이용기간
      </Typography>
      <Typography variant="body2" my={1}>
        ○ 진료서비스를 위한 정보의 경우,「의료법」시행규칙 제15조(진료에 관한
        기록의 보존)를 기준으로 보존합니다.
        <br /> ○ 기록물의 경우, 「공공기록물 관리에 관한 법률」시행령
        제26조(보존기간)를 기준으로 보존합니다.
        <br /> ○ 수집한 개인정보는 기록물심의위원회의 심의를 거쳐 매년 1회
        보존기간 연장 혹은 파기 여부를 결정할 수 있습니다.
      </Typography>
      <Typography variant="body2" my={1}>
        * 상기 개인정보 수집 ∙ 이용에 대하여 동의를 거부할 수 있으며, 선택정보
        미동의 시 진료관련 서비스를 받을 수 있으나, 진료 외 기타 서비스가 제한될
        수 있습니다. 또한 진료서비스 외의 다른 목적으로 활용하지 않으며,
        수집·이용된 개인정보를 열람, 정정·삭제, 처리정지 하고자 할 때 에는
        개인정보 보호책임자를 통해 요구할 수 있습니다.
      </Typography>
      <Box display="flex" justifyContent="end" alignItems="baseline">
        <FormControl error={error != null}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="동의합니다"
            labelPlacement="end"
          />
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
        <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            onClick={handleNextClick}
            disabled={createPatientState.isLoading}
            color="secondary"
          >
            다음
          </Button>
          {createPatientState.isLoading && (
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
    </Box>
  );
};
export default StepPrivacyPolicy;
