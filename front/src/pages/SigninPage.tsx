import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import SigninForm from '../components/signin/SigninForm';

const SigninContainer = styled.div`
  background-image: url('/images/main_bg.jpg');
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
`;

const SigninInnerContainer = styled.div`
  background: #000000aa;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 80px;
`;

const SigninPage = () => {
  return (
    <SigninContainer>
      <SigninInnerContainer>
        <Typography fontFamily="fantasy" textAlign="center" variant="h2">
          <i>KHS</i>
        </Typography>
        <Typography mb={3} fontFamily="fantasy" textAlign="center" variant="h5">
          Laboratory Information System
        </Typography>
        <SigninForm />
      </SigninInnerContainer>
    </SigninContainer>
  );
};
export default SigninPage;
