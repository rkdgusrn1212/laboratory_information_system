import {
  useState,
  useCallback,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {
  isIssueValidationCodeError,
  useIssueValidationCodeMutation,
  CreateAuthField,
  useCreateAuthMutation,
  isCreateAuthError,
  useSigninMutation,
  useLazyIsExistQuery,
} from '../../services/authApi';
import { Stack } from '@mui/system';
import { isValidationError, mapValidationError } from '../../services/types';
import { PasswordPattern, ValidationEmailPattern } from '../../utils/patterns';
import { Alert, Snackbar } from '@mui/material';
const CreateAuthForm: React.FC<{
  onSuccess: () => void;
  onException: () => void; //컴포넌트 내에서 처리 못한 애러 발생
}> = ({ onSuccess, onException }) => {
  const [createAuth, createAuthState] = useCreateAuthMutation();
  const [signin] = useSigninMutation();
  const [validationEmail, setValidationEmail] = useState('');
  const [issueValidationCode, issueValidationCodeState] =
    useIssueValidationCodeMutation();
  const [authId, setAuthId] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [validationCode, setValidationCode] = useState('');
  const [validationEmailHelp, setValidationEmailHelp] = useState<string | null>(
    null,
  );
  const [authIdHelp, setAuthIdHelp] = useState<string | null>(null);
  const [authPasswordHelp, setAuthPasswordHelp] = useState<string | null>(null);
  const [validationCodeHelp, setValidationCodeHelp] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    isSuccess: false,
    message: '',
    open: false,
  });

  const handleCreateAuthClick = () => {
    createAuth({
      authId,
      authPassword,
      validationEmail,
      validationCode,
    })
      .unwrap()
      .then(() => {
        signin({ authId, authPassword })
          .unwrap()
          .then(() => onSuccess())
          .catch(() => navigate('/', { replace: true }));
      })
      .catch((error) => {
        if (isCreateAuthError(error)) {
          switch (error.data.code) {
            case 'DUPLICATED_ID':
              setAuthIdHelp(error.data.message);
              break;
            case 'EMAIL_NOT_EXIST':
              setValidationEmailHelp(error.data.message);
              break;
            case 'WRONG_CODE':
              setValidationCodeHelp(error.data.message);
              break;
            default:
              onException();
          }
        } else if (isValidationError<CreateAuthField>(error)) {
          const validationError = mapValidationError<CreateAuthField>(error);
          if (validationError.validationEmail)
            setValidationEmailHelp(validationError.validationEmail);
          if (validationError.authId) setAuthIdHelp(validationError.authId);
          if (validationError.authPassword)
            setAuthPasswordHelp(validationError.authPassword);
          if (validationError.validationCode)
            setValidationCodeHelp(validationError.validationCode);
        } else {
          onException();
        }
      });
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setValidationEmail(value);
    if (value.length < 1) {
      setValidationEmailHelp('이메일이 비어있습니다.');
      return;
    } else if (!ValidationEmailPattern.test(value)) {
      setValidationEmailHelp('이메일 형식이 안맞습니다.');
      return;
    } else {
      setValidationEmailHelp(null);
    }
  };

  const handleIssueClick: MouseEventHandler<HTMLButtonElement> = () => {
    issueValidationCode({
      validationEmail: validationEmail,
    })
      .unwrap()
      .catch((error) => {
        if (isIssueValidationCodeError(error)) {
          setValidationEmailHelp(error.data.message);
        } else if (isValidationError(error)) {
          setValidationEmailHelp(error.data.array[0]?.message);
        } else {
          setValidationEmailHelp('알수없는 오류가 발생했습니다.');
        }
      });
  };

  const handleCancelClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    setAuthId('');
    setAuthPassword('');
    setValidationCode('');
    issueValidationCodeState.reset();
  }, [issueValidationCodeState]);

  const handleIdChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setAuthId(value);
    if (value.length < 1 || value.length > 40) {
      setAuthIdHelp('아이디는 1자 이상 40자 이하입니다.');
    } else {
      setAuthIdHelp(null);
    }
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const value = event.target.value;
    setAuthPassword(value);
    if (!PasswordPattern.test(value)) {
      setAuthPasswordHelp(
        '영문, 숫자, 특수문자가 각각 하나이상 포함된 9자 이상 40자 이하의 문자열을 입력하세요.',
      );
    } else {
      setAuthPasswordHelp(null);
    }
  };

  const handleMouseUpAndLeaveVisibility = () => setPasswordVisibility(false);

  const handleMouseDownVisibility = () => setPasswordVisibility(true);

  const handleCodeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setValidationCode(value);
    if (value.length < 1) {
      setValidationCodeHelp('인증번호가 비어있습니다');
    } else {
      setValidationCodeHelp(null);
    }
  };

  const [isExist] = useLazyIsExistQuery();

  const handleDuplicateClick = () => {
    isExist({ authId })
      .unwrap()
      .then((result) => {
        if (result) {
          setOpen({
            message: '이미 존재하는 아이디 입니다.',
            isSuccess: false,
            open: true,
          });
        } else {
          setOpen({
            message: '사용 가능한 아이디 입니다.',
            isSuccess: true,
            open: true,
          });
        }
      })
      .catch(() => {
        setOpen({
          message: '요청에 실패했습니다.',
          isSuccess: false,
          open: true,
        });
      });
  };

  const handleClose = () => {
    setOpen((open) => ({ ...open, open: false }));
  };

  return (
    <Box display="flex" justifyContent="center">
      <Stack sx={{ my: 3 }} gap={2} width="100%" maxWidth={600}>
        <TextField
          required
          size="small"
          fullWidth
          id="email"
          label="이메일"
          name="email"
          value={validationEmail}
          onChange={handleEmailChange}
          autoComplete="email"
          helperText={validationEmailHelp}
          error={validationEmailHelp != null}
          disabled={issueValidationCodeState.isSuccess}
        />
        {issueValidationCodeState.isSuccess || (
          <Box sx={{ position: 'relative' }}>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={handleIssueClick}
              disabled={issueValidationCodeState.isLoading}
            >
              인증번호 발급
            </Button>
            {issueValidationCodeState.isLoading && (
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
        )}
        {issueValidationCodeState.isSuccess && (
          <Box sx={{ display: 'flex' }}>
            <Grow in={issueValidationCodeState.isSuccess}>
              <Stack gap={1} width="100%">
                <TextField
                  required
                  fullWidth
                  label="아이디"
                  error={authIdHelp != null}
                  helperText={authIdHelp}
                  value={authId}
                  onChange={handleIdChange}
                  autoComplete="username"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          size="small"
                          sx={{ whiteSpace: 'nowrap' }}
                          variant="text"
                          color="secondary"
                          onClick={handleDuplicateClick}
                        >
                          중복확인
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="비밀번호"
                  value={authPassword}
                  onChange={handlePasswordChange}
                  error={authPasswordHelp != null}
                  helperText={authPasswordHelp}
                  type={passwordVisiblity ? 'text' : 'password'}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onMouseLeave={handleMouseUpAndLeaveVisibility}
                          onMouseUp={handleMouseUpAndLeaveVisibility}
                          onMouseDown={handleMouseDownVisibility}
                        >
                          {passwordVisiblity ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="인증번호"
                  error={validationCodeHelp != null}
                  helperText={validationCodeHelp}
                  value={validationCode}
                  autoComplete="one-time-code"
                  onChange={handleCodeChange}
                />
                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                  <Button
                    color="secondary"
                    variant="text"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={handleCancelClick}
                  >
                    취소
                  </Button>
                </Box>
              </Stack>
            </Grow>
          </Box>
        )}
        {issueValidationCodeState.isSuccess && (
          <Box display="flex" width="100%" justifyContent="flex-end">
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                onClick={handleCreateAuthClick}
                disabled={
                  validationEmail.length < 1 ||
                  authId.length < 1 ||
                  authPassword.length < 1 ||
                  validationCode.length < 1 ||
                  validationEmailHelp != null ||
                  authIdHelp != null ||
                  authPasswordHelp != null ||
                  validationCodeHelp != null
                }
              >
                아이디 생성
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
        )}
      </Stack>
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
export default CreateAuthForm;
