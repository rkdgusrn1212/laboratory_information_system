import { useState, ChangeEventHandler } from 'react';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import {
  isWriteDetailsError,
  useWriteDetailsMutation,
  WriteDetailsField,
  WriteDetailsRequest,
} from '../../services/authApi';
import { isValidationError, mapValidationError } from '../../services/types';
import { PhonePattern, RrnPattern } from '../../utils/patterns';
import rrnParser from '../../utils/rrnParser';
import RrnMaskedInput from '../common/RrnMaskedInput';
import PhoneInput from '../common/PhoneMaskedInput';

const StaffDetailsForm: React.FC<{
  onSuccess: () => void;
  onException: () => void;
}> = ({ onSuccess, onException }) => {
  const [writeDetails, writeDetailsState] = useWriteDetailsMutation();
  const [staffName, setStaffName] = useState('');
  const [staffType, setStaffType] = useState<number | null>(null);
  const [staffPhone, setStaffPhone] = useState('');
  const [staffRrn, setStaffRrn] = useState('');
  const [doctorCertification, setDoctorCertification] = useState('');
  const [doctorDepartmentCode, setDoctorDepartmentCode] = useState('');
  const [staffNameHelp, setStaffNameHelp] = useState<string | null>(null);
  const [staffPhoneHelp, setStaffPhoneHelp] = useState<string | null>(null);
  const [staffRrnHelp, setStaffRrnHelp] = useState<string | null>(null);

  const handleSubmitClick = () => {
    const parsedRrn = rrnParser(staffRrn);
    if (!parsedRrn) setStaffRrnHelp('주민번호를 확인해주세요');
    else {
      writeDetails({
        staffName,
        staffRrn,
        staffBirth: parsedRrn.birth,
        staffMale: parsedRrn.male,
        staffPhone,
        staffImage: null,
        staffType,
      } as WriteDetailsRequest)
        .unwrap()
        .then(() => onSuccess())
        .catch((error) => {
          if (isWriteDetailsError(error)) {
            onException();
          } else if (isValidationError<WriteDetailsField>(error)) {
            const validationError =
              mapValidationError<WriteDetailsField>(error);
            if (validationError.staffPhone)
              setStaffPhoneHelp(validationError.staffPhone);
            if (validationError.staffRrn)
              setStaffRrnHelp(validationError.staffRrn);
            if (validationError.staffMale || validationError.staffBirth)
              setStaffRrnHelp('주민번호를 확인해주세요');
            if (validationError.staffName)
              setStaffNameHelp(validationError.staffName);
          } else {
            onException();
          }
        });
    }
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setStaffName(value);
    if (value.length < 1) {
      setStaffNameHelp('이름이 비어있습니다.');
    } else if (value.length > 40) {
      setStaffNameHelp('이름은 40자를 넘을 수 없습니다.');
    } else {
      setStaffNameHelp(null);
    }
  };

  const handlePhoneValueSet = (value: string) => {
    setStaffPhone(value);
    if (value.length < 1) {
      setStaffPhoneHelp('전화번호가 비어있습니다.');
    } else if (!PhonePattern.test(value)) {
      setStaffPhoneHelp('전화번호 형식에 맞지 않습니다.');
    } else {
      setStaffPhoneHelp(null);
    }
  };

  const handleRrnValueSet = (value: string) => {
    setStaffRrn(value);
    if (value.length < 1) {
      setStaffRrnHelp('주민번호가 비어있습니다.');
    } else if (!RrnPattern.test(value)) {
      setStaffRrnHelp('주민번호 형식에 맞지 않습니다.');
    } else {
      setStaffRrnHelp(null);
    }
  };

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: number | null,
  ) => {
    setStaffType(value);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box width="100%" maxWidth={600}>
        <Box sx={{ mt: 2 }} display="flex" alignItems="baseline" gap={2}>
          <TextField
            autoComplete="name"
            size="small"
            required
            onChange={handleNameChange}
            label="성명"
            helperText={staffNameHelp}
            error={staffNameHelp != null}
            value={staffName}
          />
          <RrnMaskedInput
            size="small"
            required
            fullWidth
            onValueSet={handleRrnValueSet}
            helpText={staffRrnHelp}
            error={staffRrnHelp != null}
            label="주민번호"
          />
        </Box>
        <PhoneInput
          sx={{ mt: 1 }}
          size="small"
          required
          fullWidth
          label="전화번호"
          onValueSet={handlePhoneValueSet}
          helpText={staffPhoneHelp}
          error={staffPhoneHelp != null}
        />
        <ToggleButtonGroup
          fullWidth
          sx={{ mt: 2 }}
          color="standard"
          value={staffType}
          exclusive
          onChange={handleTypeChange}
        >
          <ToggleButton value={0}>
            <Box sx={{ display: 'block', p: 1 }}>
              <Avatar
                src="/images/nurse_icon.png"
                sx={{
                  margin: 'auto',
                  p: 1,
                  bgcolor: 'skyblue',
                  width: 56,
                  height: 56,
                }}
              />
              간호사
            </Box>
          </ToggleButton>
          <ToggleButton value={1}>
            <Box sx={{ display: 'block', p: 1 }}>
              <Avatar
                src="/images/doctor_icon.png"
                sx={{
                  margin: 'auto',
                  p: 1,
                  bgcolor: 'orange',
                  width: 56,
                  height: 56,
                }}
              />
              의사
            </Box>
          </ToggleButton>
        </ToggleButtonGroup>

        {staffType === 1 && (
          <>
            <TextField
              sx={{ mt: 1 }}
              label="의사면허"
              fullWidth
              size="small"
              variant="outlined"
              margin="dense"
            />
            <TextField
              sx={{ mt: 1 }}
              label="진료과"
              fullWidth
              size="small"
              variant="outlined"
              margin="dense"
            />
          </>
        )}
        <Box display="flex" my={2} width="100%" justifyContent="flex-end">
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="contained"
              onClick={handleSubmitClick}
              disabled={
                staffName.length < 1 ||
                staffPhone.length < 1 ||
                staffRrn.length < 1 ||
                staffType == null ||
                staffNameHelp != null ||
                staffPhoneHelp != null ||
                staffRrnHelp != null
              }
              color="secondary"
            >
              등록
            </Button>
            {writeDetailsState.isLoading && (
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
    </Box>
  );
};
export default StaffDetailsForm;
