import React, { useState, ChangeEventHandler, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Snackbar, Typography } from '@mui/material';

import { PhonePattern, RrnPattern } from '../../utils/patterns';
import RrnMaskedInput from '../common/RrnMaskedInput';
import PhoneInput from '../common/PhoneMaskedInput';
import Logo from '../common/Logo';
import { grey } from '@mui/material/colors';
import Link from '@mui/material/Link';
import { Container } from '@mui/system';
import {
  isValidationError,
  mapValidationError,
  Staff,
} from '../../services/types';
import { useLazyReadDoctorQuery } from '../../services/doctorApi';
import { useLazyReadDepartmentQuery } from '../../services/departmentApi';
import {
  UpdateDetailsRequest,
  useUpdateDetailsMutation,
} from '../../services/authApi';
import rrnParser from '../../utils/rrnParser';
import { useNavigate } from 'react-router-dom';

const MyInfoForm: React.FC<{ staff: Staff }> = ({ staff }) => {
  const [staffName, setStaffName] = useState(staff.staffName);
  const [staffPhone, setStaffPhone] = useState(staff.staffPhone);
  const phoneInit = staffPhone;
  const [staffRrn, setStaffRrn] = useState(staff.staffRrn);
  const rrnInit = staffRrn;
  const [staffNameHelp, setStaffNameHelp] = useState<string | null>(null);
  const [staffPhoneHelp, setStaffPhoneHelp] = useState<string | null>(null);
  const [staffRrnHelp, setStaffRrnHelp] = useState<string | null>(null);
  const [readDoctor, readDoctorResult] = useLazyReadDoctorQuery({
    pollingInterval: 60000,
  });
  const [readDepartment, readDepartmentResult] = useLazyReadDepartmentQuery({
    pollingInterval: 60000,
  });
  const [updateDetails, updateDetailsResult] = useUpdateDetailsMutation();
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    const parsedRrn = rrnParser(staffRrn);
    if (!parsedRrn) setStaffRrnHelp('주민번호를 확인해주세요');
    else {
      updateDetails({
        staffName,
        staffRrn,
        staffBirth: parsedRrn.birth,
        staffMale: parsedRrn.male,
        staffPhone,
        staffImage: null,
      })
        .unwrap()
        .then()
        .catch((error) => {
          if (isValidationError<keyof UpdateDetailsRequest>(error)) {
            const validationError =
              mapValidationError<keyof UpdateDetailsRequest>(error);
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
  };
  useEffect(() => {
    if (staff.staffType === 'DOC') {
      readDoctor(staff.staffNo)
        .unwrap()
        .then((data) => readDepartment(data.departmentCode));
    }
  }, [staff.staffNo, readDepartment, readDoctor, staff.staffType]);

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

  const [open, setOpen] = useState({
    isSuccess: false,
    message: '',
    open: false,
  });

  const handleClose = () => {
    setOpen((open) => ({ ...open, open: false }));
  };

  return (
    <Box p={3}>
      <Box sx={{ background: '#ffffff' }}>
        <Container sx={{ px: 2, pb: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="end"
            height={80}
          >
            <Typography
              variant="h3"
              textAlign="start"
              color="#007bcb"
              fontWeight="bold"
            >
              내 정보 수정
            </Typography>
            <Link href="/" underline="hover">
              <Logo
                size={20}
                color={grey['700']}
                sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}
              />
            </Link>
          </Box>
        </Container>
      </Box>
      <Box display="flex" mt={5} justifyContent="center">
        <Box width="100%" maxWidth={600}>
          <Link
            underline="hover"
            onClick={() => {
              navigate(-1);
            }}
          >
            &lt; 이전 페이지
          </Link>
          <Typography fontFamily="cafe-surround" mt={2} mb={1} fontSize={32}>
            기본정보
          </Typography>
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
          <Box display="flex" my={2} width="100%" justifyContent="flex-end">
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                onClick={handleSubmitClick}
                disabled={
                  staffName.length < 1 ||
                  staffPhone.length < 1 ||
                  staffRrn.length < 1 ||
                  staffNameHelp != null ||
                  staffPhoneHelp != null ||
                  staffRrnHelp != null
                }
                color="secondary"
              >
                등록
              </Button>
              {updateDetailsResult.isLoading && (
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
          <Typography fontFamily="cafe-surround" mt={3} mb={1} fontSize={32}>
            유형별 상세 정보
          </Typography>{' '}
          <Box
            flexDirection="row-reverse"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Avatar
              src={
                staff.staffType === 'NUR'
                  ? '/images/nurse_icon.png'
                  : staff.staffType === 'DOC'
                  ? '/images/doctor_icon.png'
                  : undefined
              }
              sx={{
                bgcolor:
                  staff.staffType === 'NUR'
                    ? 'orange'
                    : staff.staffType === 'DOC'
                    ? 'skyblue'
                    : undefined,
                width: 126,
                height: 126,
                my: 1,
                p: 2,
              }}
            />
            <Box>
              <Box display="flex" alignItems="center">
                <Typography fontSize={20} fontWeight="bold">
                  계정 유형 : &nbsp;
                </Typography>
                <Typography
                  fontSize={20}
                  fontWeight="bold"
                  fontFamily="cafe-surround"
                >
                  {staff.staffType === 'NUR'
                    ? '간호사'
                    : staff.staffType === 'DOC'
                    ? '의사'
                    : undefined}
                  &nbsp; &nbsp;
                </Typography>
              </Box>
              {staff.staffType === 'DOC' && (
                <>
                  <Box display="flex" alignItems="center">
                    <Typography fontSize={20} fontWeight="bold">
                      의사면허 :&nbsp;
                    </Typography>
                    <Typography
                      fontSize={20}
                      fontWeight="bold"
                      fontFamily="cafe-surround"
                    >
                      {readDoctorResult.data?.doctorCertification}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography fontSize={20} fontWeight="bold">
                      진료과 :&nbsp;
                    </Typography>
                    <Typography
                      fontSize={20}
                      fontWeight="bold"
                      fontFamily="cafe-surround"
                    >
                      {readDepartmentResult.data?.departmentName +
                        ' (' +
                        readDepartmentResult.data?.departmentCode +
                        ')'}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
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
      <Box sx={{ mt: 5, mb: 2 }}></Box>
    </Box>
  );
};
export default MyInfoForm;
