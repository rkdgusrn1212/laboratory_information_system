import {
  useState,
  useCallback,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import CircularProgress from '@mui/material/CircularProgress';
import green from '@mui/material/colors/green';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {
  issueValidationCodeRequest,
  isIssueValidationCodeError,
  useIssueValidationCodeMutation,
  CreateAuthRequest,
} from '../../services/authApi';
import { Stack } from '@mui/system';
import { isValidationError } from '../../services/types';

const validationEmailPattern =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&^])[A-Za-z0-9@$!%*#?&^]{9,40}$/;

const ValidationForm: React.FC<{
  onCreateAuthFormComplete: (form: CreateAuthRequest | undefined) => void;
}> = ({ onCreateAuthFormComplete }) => {
  const [validationEmail, setValidationEmail] = useState('');
  const [issueValidationCode, issueValidationCodeState] =
    useIssueValidationCodeMutation();
  const [authId, setAuthId] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [validationCode, setValidationCode] = useState('');
  const [validationEmailValid, setValidationEmailFieldValid] = useState(false);
  const [authIdValid, setAuthIdValid] = useState(false);
  const [authPasswordValid, setAuthPasswordValid] = useState(false);
  const [validationCodeValid, setValidationCodeValid] = useState(false);

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValidationEmailFieldValid(
        validationEmailPattern.test(event.target.value),
      );
      setValidationEmail(event.target.value);
    },
    [],
  );

  const handleIssueClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    issueValidationCode({
      validationEmail: validationEmail,
    } as issueValidationCodeRequest);
  }, [validationEmail, issueValidationCode]);

  const handleCancelClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    setAuthId('');
    setAuthPassword('');
    setValidationCode('');
    issueValidationCodeState.reset();
  }, [issueValidationCodeState]);

  const handleIdChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = event.target.value;
      setAuthIdValid(value.length > 0 && value.length <= 40);
      setAuthId(value);
    },
    [],
  );

  const handlePasswordChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => {
    setAuthPasswordValid(passwordPattern.test(event.target.value));
    setAuthPassword(event.target.value);
  }, []);

  const handleMouseUpAndLeaveVisibility = useCallback(
    () => setPasswordVisibility(false),
    [],
  );

  const handleMouseDownVisibility = useCallback(
    () => setPasswordVisibility(true),
    [],
  );

  const handleCodeChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValidationCodeValid(event.target.value.length > 0);
      setValidationCode(event.target.value);
    },
    [],
  );

  useEffect(() => {
    if (
      issueValidationCodeState.isSuccess &&
      authIdValid &&
      authPasswordValid &&
      validationCodeValid
    ) {
      onCreateAuthFormComplete({
        authId,
        authPassword,
        validationCode,
        validationEmail,
      });
    } else {
      onCreateAuthFormComplete(undefined);
    }
  }, [
    issueValidationCodeState.isSuccess,
    onCreateAuthFormComplete,
    authId,
    authPassword,
    validationCode,
    validationEmail,
    authIdValid,
    authPasswordValid,
    validationCodeValid,
  ]);

  return (
    <Stack sx={{ mt: 3 }} gap={2}>
      <TextField
        required
        fullWidth
        id="email"
        label="이메일"
        name="email"
        value={validationEmail}
        onChange={handleEmailChange}
        autoComplete="email"
        helperText={(() => {
          if (validationEmail.length < 1) {
            return '이메일이 비어있습니다.';
          }
          if (!validationEmailValid) {
            return '이메일 형식이 안맞습니다.';
          }
          if (issueValidationCodeState.isError) {
            const error = issueValidationCodeState.error;
            if (isIssueValidationCodeError(error)) {
              return error.data.message;
            }
            if (isValidationError(error)) {
              return error.data.array[0]?.message;
            }
            return '알수없는 오류가 발생했습니다.';
          }
        })()}
        error={!validationEmailValid || issueValidationCodeState.isError}
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
                color: green[500],
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
                error={!authIdValid}
                helperText={authIdValid || '아이디는 1자 이상 40자 이하입니다.'}
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
                error={!authPasswordValid}
                helperText={
                  authPasswordValid ||
                  '영문, 숫자, 특수문자가 각각 하나이상 포함된 9자 이상 40자 이하의 문자열을 입력하세요.'
                }
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
                error={!validationCodeValid}
                helperText={validationCodeValid || '인증번호가 비어있습니다'}
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
    </Stack>
  );
};
export default ValidationForm;
