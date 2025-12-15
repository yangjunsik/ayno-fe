import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../assets/logo_hero.svg';
import { PATH } from '../routes/constants/path';
import { login } from '../api/auth';
import { getMyProfile } from '../api/user';
import { useAuth } from '../hooks/useAuth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  min-height: calc(100vh - 60px);
  background-color: #F9FAFB;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 32px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 40px 0 16px; /* Right padding for eye icon, standard left padding */
  border-radius: 8px;
  border: 1px solid ${({ hasError }) => (hasError ? '#EF4444' : '#E5E7EB')};
  font-size: 15px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? '#EF4444' : '#000')};
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: #666;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #000;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 24px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.p`
  color: #EF4444;
  font-size: 13px;
  text-align: center;
  margin-top: 4px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 320px;
  margin: 24px 0;
  color: #9CA3AF;
  font-size: 13px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #E5E7EB;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const SocialButton = styled.button<{ bgColor?: string; textColor?: string; border?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: ${({ border }) => border || 'none'};
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  color: ${({ textColor }) => textColor || '#000'};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    font-size: 20px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const SignupLink = styled.div`
  margin-top: 32px;
  font-size: 14px;
  color: #666;
  text-align: center;

  a {
    color: #000;
    font-weight: 600;
    text-decoration: none;
    margin-left: 8px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage(''); // Reset error

    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      await login({ username: email, password });

      // Login success: Fetch user profile
      const response = await getMyProfile();
      if (response.data) {
        authLogin(response.data);
        navigate(PATH.HOME);
      } else {
        // Fallback if no data
        navigate(PATH.HOME);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      const message = error.response?.data?.errorMessage || '아이디 또는 비밀번호가 일치하지 않습니다.';
      setErrorMessage(message);
    }
  };

  const handleKakaoLogin = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    window.location.href = `${API_URL}/oauth2/authorization/kakao`;
  };

  const handleGoogleLogin = () => {
    alert('구글 로그인 준비 중입니다.');
  };

  return (
    <Container>
      <Logo src={logo} alt="AYNO" />

      <FormContainer>
        <InputGroup>
          <InputWrapper>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              hasError={!!errorMessage}
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
              hasError={!!errorMessage}
            />
            <TogglePasswordButton onClick={() => setShowPassword(!showPassword)} type="button">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </TogglePasswordButton>
          </InputWrapper>
        </InputGroup>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <LoginButton onClick={handleLogin}>
          로그인
        </LoginButton>
      </FormContainer>

      <Divider>또는</Divider>

      <FormContainer>
        {/* Kakao Standard: #FEE500 background, #191919 text */}
        <SocialButton
          bgColor="#FEE500"
          textColor="#191919"
          onClick={handleKakaoLogin}
        >
          <RiKakaoTalkFill style={{ fontSize: '24px' }} />
          카카오 로그인
        </SocialButton>

        {/* Google Standard: White background, #DADCE0 border, #3c4043 text */}
        <SocialButton
          bgColor="#FFFFFF"
          textColor="#3c4043"
          border="1px solid #DADCE0"
          onClick={handleGoogleLogin}
        >
          <FcGoogle style={{ fontSize: '20px' }} />
          Google 계정으로 로그인
        </SocialButton>
      </FormContainer>

      <SignupLink>
        계정이 없으신가요?
        <Link to={PATH.SIGNUP}>회원가입</Link>
      </SignupLink>
    </Container>
  );
};

export default LoginPage;

