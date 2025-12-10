import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock } from 'react-icons/fi';
import logo from '../assets/logo_hero.svg';
import { PATH } from '../constants/path';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 100vh;
  background-color: #fff;
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

const IconWrapper = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px 0 44px; /* Left padding for icon */
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #000;
  }

  &::placeholder {
    color: #9CA3AF;
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
    font-size: 24px;
    position: absolute;
    left: 16px;
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
    const handleLogin = () => {
        alert('로그인 기능 준비 중입니다.');
    };

    const handleKakaoLogin = () => {
        alert('카카오 로그인 준비 중입니다.');
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
                        <IconWrapper>
                            <FiMail />
                        </IconWrapper>
                        <Input type="email" placeholder="이메일을 입력해주세요" />
                    </InputWrapper>
                </InputGroup>

                <InputGroup>
                    <InputWrapper>
                        <IconWrapper>
                            <FiLock />
                        </IconWrapper>
                        <Input type="password" placeholder="비밀번호를 입력해주세요" />
                    </InputWrapper>
                </InputGroup>

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
