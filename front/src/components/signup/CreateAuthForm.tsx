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
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {
  issueValidationCodeRequest,
  isIssueValidationCodeError,
  useIssueValidationCodeMutation,
  CreateAuthRequest,
  CreateAuthField,
} from '../../services/authApi';
import { Stack } from '@mui/system';
import { isValidationError, MappedValidationError } from '../../services/types';

const validationEmailPattern =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&^])[A-Za-z0-9@$!%*#?&^]{9,40}$/;

const CreateAuthForm: React.FC<{
  onCreateAuthFormComplete: (form: CreateAuthRequest | undefined) => void;
  error: MappedValidationError<CreateAuthField>;
}> = ({ onCreateAuthFormComplete, error }) => {
  const [validationEmail, setValidationEmail] = useState('');
  const [issueValidationCode, issueValidationCodeState] =
    useIssueValidationCodeMutation();
  const [authId, setAuthId] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [validationCode, setValidationCode] = useState('');
  const [validationEmailHelp, setValidationEmailHelp] = useState<
    string | undefined
  >(undefined);
  const [authIdHelp, setAuthIdHelp] = useState<string | undefined>(undefined);
  const [authPasswordHelp, setAuthPasswordHelp] = useState<string | undefined>(
    undefined,
  );
  const [validationCodeHelp, setValidationCodeHelp] = useState<
    string | undefined
  >(undefined);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValidationEmail(event.target.value);
  };

  useEffect(() => {
    if (validationEmail.length < 1) {
      setValidationEmailHelp('이메일이 비어있습니다.');
      return;
    }
    if (!validationEmailPattern.test(validationEmail)) {
      setValidationEmailHelp('이메일 형식이 안맞습니다.');
      return;
    }
    if (issueValidationCodeState.isError) {
      const error = issueValidationCodeState.error;
      if (isIssueValidationCodeError(error)) {
        setValidationEmailHelp(error.data.message);
      } else if (isValidationError(error)) {
        setValidationEmailHelp(error.data.array[0]?.message);
      } else {
        setValidationEmailHelp('알수없는 오류가 발생했습니다.');
      }
      return;
    }
    setValidationEmailHelp(undefined);
  }, [
    validationEmail,
    issueValidationCodeState.error,
    issueValidationCodeState.isError,
  ]);

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

  const handleIdChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAuthId(event.target.value);
  };

  useEffect(() => {
    if (authId.length < 1 || authId.length > 40) {
      setAuthIdHelp('아이디는 1자 이상 40자 이하입니다.');
      return;
    }
    setAuthIdHelp(undefined);
  }, [authId]);

  useEffect(() => {
    setValidationEmailHelp((state) => error.validationEmail || state);
    setAuthIdHelp((state) => error.authId || state);
    setAuthPasswordHelp((state) => error.authPassword || state);
    setValidationCodeHelp((state) => error.validationCode || state);
  }, [
    error.validationEmail,
    error.authId,
    error.authPassword,
    error.validationCode,
  ]);

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setAuthPassword(event.target.value);
  };

  useEffect(() => {
    if (!passwordPattern.test(authPassword)) {
      setAuthPasswordHelp(
        '영문, 숫자, 특수문자가 각각 하나이상 포함된 9자 이상 40자 이하의 문자열을 입력하세요.',
      );
      return;
    }
    setAuthPasswordHelp(undefined);
  }, [authPassword]);

  const handleMouseUpAndLeaveVisibility = useCallback(
    () => setPasswordVisibility(false),
    [],
  );

  const handleMouseDownVisibility = useCallback(
    () => setPasswordVisibility(true),
    [],
  );

  const handleCodeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValidationCode(event.target.value);
  };

  useEffect(() => {
    if (validationCode.length < 1) {
      setValidationCodeHelp('인증번호가 비어있습니다');
      return;
    }
    setValidationCodeHelp(undefined);
  }, [validationCode]);

  useEffect(() => {
    if (
      !validationEmailHelp &&
      !authIdHelp &&
      !authPasswordHelp &&
      !validationCodeHelp
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
    onCreateAuthFormComplete,
    authId,
    authPassword,
    validationCode,
    validationEmail,
    validationEmailHelp,
    authIdHelp,
    authPasswordHelp,
    validationCodeHelp,
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
        helperText={validationEmailHelp}
        error={validationEmailHelp !== undefined}
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
                error={authIdHelp !== undefined}
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
                error={authPasswordHelp !== undefined}
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
                error={validationCodeHelp !== undefined}
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
    </Stack>
  );
};
export default CreateAuthForm;
