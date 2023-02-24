import React, { useState, ChangeEventHandler } from 'react';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Snackbar } from '@mui/material';

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
import DoctorCertificationMaskedInput from '../common/DoctorCertificationMaskedInput';
import DepartmentSelectInput from '../common/DepartmentSelectInput';
import { SelectChangeEvent } from '@mui/material';
import { useRegisterDoctorMutation } from '../../services/doctorApi';
import { useAppSelector } from '../../hooks';
import { selectAccount } from '../../services/accountSlice';
import { useRegisterNurseMutation } from '../../services/nurseApi';

const StaffDetailsForm: React.FC<{
  onSuccess: () => void;
  onException: () => void;
}> = ({ onSuccess, onException }) => {
  const account = useAppSelector(selectAccount);
  const [writeDetails, writeDetailsState] = useWriteDetailsMutation();
  const [registerDoctor] = useRegisterDoctorMutation();
  const [registerNurse] = useRegisterNurseMutation();
  const [staffName, setStaffName] = useState(
    account?.principal.staffVo ? account.principal.staffVo.staffName : '',
  );
  const [staffType, setStaffType] = useState<number | null>(null);
  const [staffPhone, setStaffPhone] = useState(
    account?.principal.staffVo ? account.principal.staffVo.staffPhone : '',
  );
  const phoneInit = staffPhone;
  const [staffRrn, setStaffRrn] = useState(
    account?.principal.staffVo ? account.principal.staffVo.staffRrn : '',
  );
  const rrnInit = staffRrn;
  const [doctorCertification, setDoctorCertification] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [staffNameHelp, setStaffNameHelp] = useState<string | null>(null);
  const [staffPhoneHelp, setStaffPhoneHelp] = useState<string | null>(null);
  const [staffRrnHelp, setStaffRrnHelp] = useState<string | null>(null);
  const [doctorCertificationHelp, setDoctorCertificationHelp] = useState<
    string | null
  >(null);

  const doRegisterType = () => {
    if (staffType === 0) {
      registerNurse()
        .unwrap()
        .then(() => onSuccess())
        .catch(() => {
          setOpen({
            message: '요청에 실패했습니다.',
            isSuccess: false,
            open: true,
          });
        });
    } else if (staffType === 1) {
      registerDoctor({
        departmentCode,
        doctorCertification: parseInt(doctorCertification),
      })
        .unwrap()
        .then(() => onSuccess())
        .catch(() => {
          setOpen({
            message: '요청에 실패했습니다.',
            isSuccess: false,
            open: true,
          });
        });
    }
  };

  const handleSubmitClick = () => {
    if (account?.principal.authorities[0] === 'ROLE_AUTHONLY') {
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
          .then(doRegisterType)
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
              setOpen({
                message: '요청에 실패했습니다.',
                isSuccess: false,
                open: true,
              });
            }
          });
      }
    } else if (account?.principal.authorities[0] === 'ROLE_NANTYPE') {
      doRegisterType();
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

  const handleCertificationSet = (value: string) => {
    setDoctorCertification(value);
    const num = parseInt(value);
    if (num < 1000 || num > 999999) {
      setDoctorCertificationHelp('4-6자리의 의사면허를 입력해주세요');
    } else {
      setDoctorCertificationHelp(null);
    }
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartmentCode(event.target.value);
  };

  const [open, setOpen] = useState({
    isSuccess: false,
    message: '',
    open: false,
  });

  const handleClose = () => {
    setOpen((open) => ({ ...open, open: false }));
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
            initValue={rrnInit}
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
          initValue={phoneInit}
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
            <DoctorCertificationMaskedInput
              sx={{ mt: 1 }}
              label="의사면허"
              fullWidth
              size="small"
              onValueSet={handleCertificationSet}
              error={doctorCertificationHelp != null}
              helpText={doctorCertificationHelp}
            />
            <DepartmentSelectInput
              sx={{ mt: 1 }}
              label="진료과"
              value={departmentCode}
              fullWidth
              onChange={handleDepartmentChange}
              size="small"
              variant="outlined"
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

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open.open}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleClose}
          severity={open.isSuccess ? 'success' : 'warning'}
          sx={{ width: '100%' }}
        >
          {open.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default StaffDetailsForm;
