import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiChevronRight } from 'react-icons/fi';
import logo from '../assets/logo_hero.svg';
import { PATH } from '../routes/constants/path';
import { signup, checkUsername } from '../api/auth';

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
  padding: 0 16px;
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

const DuplicateCheckButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  font-size: 13px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #666;
  }
  
  &:disabled {
    cursor: not-allowed;
    color: #D1D5DB;
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

const HelperText = styled.p`
  color: #6B7280;
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.4;
`;

const ErrorMessage = styled.p`
  color: #EF4444;
  font-size: 12px;
  margin-top: 4px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
  max-width: 320px;
`;

const CheckboxItem = styled.div<{ isAll?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding-bottom: ${({ isAll }) => (isAll ? '12px' : '0')};
  border-bottom: ${({ isAll }) => (isAll ? '1px solid #E5E7EB' : 'none')};
`;

const CheckboxInput = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ checked }) => (checked ? '#000' : '#D1D5DB')};
  background-color: ${({ checked }) => (checked ? '#000' : '#fff')};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &::after {
    content: '';
    width: 10px;
    height: 6px;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: rotate(-45deg) translate(1px, -1px);
    display: ${({ checked }) => (checked ? 'block' : 'none')};
  }
`;

const CheckboxLabel = styled.span<{ isAll?: boolean }>`
  font-size: 14px;
  color: ${({ isAll }) => (isAll ? '#000' : '#6B7280')};
  font-weight: ${({ isAll }) => (isAll ? '600' : '400')};
  flex: 1;
`;

const ArrowIcon = styled(FiChevronRight)`
  color: #9CA3AF;
  font-size: 16px;
`;

const SignupButton = styled.button`
  width: 100%;
  max-width: 320px; /* Added max-width to match form */
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

  &:disabled {
    background-color: #E5E7EB;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const SignupPage = () => {
    const navigate = useNavigate();

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation State
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Agreements State
    const [agreements, setAgreements] = useState({
        over14: false,
        terms: false,
        privacy: false,
        marketing: false,
    });

    // Email Check
    const handleCheckEmail = async () => {
        if (!email) {
            setEmailError('이메일을 입력해주세요.');
            return;
        }
        // Simple regex for email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('올바른 이메일 형식이 아닙니다.');
            return;
        }

        try {
            const response = await checkUsername(email);
            if (response.data?.available) {
                setIsEmailChecked(true);
                setEmailError('');
                alert('사용 가능한 이메일입니다.');
            } else {
                setIsEmailChecked(false);
                setEmailError('이미 사용 중인 이메일입니다.');
            }
        } catch (error) {
            console.error('Email check failed:', error);
            setEmailError('이메일 중복 확인에 실패했습니다.');
        }
    };

    // Password Validation
    useEffect(() => {
        if (!password) {
            setPasswordError('');
            return;
        }
        // 8-16 chars, letters, numbers, special chars
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('영문, 숫자, 특수문자를 포함해 8~16자로 입력해주세요.');
        } else {
            setPasswordError('');
        }
    }, [password]);

    useEffect(() => {
        if (!confirmPassword) {
            setConfirmPasswordError('');
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    }, [password, confirmPassword]);

    // Checkbox Logic
    const handleAllCheck = () => {
        const allChecked = !Object.values(agreements).every(Boolean);
        setAgreements({
            over14: allChecked,
            terms: allChecked,
            privacy: allChecked,
            marketing: allChecked,
        });
    };

    const handleSingleCheck = (key: keyof typeof agreements) => {
        setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const isAllRequiredChecked = agreements.over14 && agreements.terms && agreements.privacy;
    const isFormValid = isEmailChecked && !passwordError && !confirmPasswordError && password && confirmPassword && isAllRequiredChecked;

    const handleSignup = async () => {
        if (!isFormValid) return;

        try {
            await signup({
                username: email,
                password,
                marketingAgreed: agreements.marketing,
            });
            alert('회원가입이 완료되었습니다! 로그인해주세요.');
            navigate(PATH.LOGIN);
        } catch (error: any) {
            console.error('Signup failed:', error);
            alert(error.response?.data?.errorMessage || '회원가입에 실패했습니다.');
        }
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
                                setIsEmailChecked(false); // Reset check on change
                                setEmailError('');
                            }}
                            hasError={!!emailError}
                            style={{ paddingRight: '80px' }} // Space for button
                        />
                        <DuplicateCheckButton
                            onClick={handleCheckEmail}
                            disabled={!email || isEmailChecked}
                        >
                            중복확인
                        </DuplicateCheckButton>
                    </InputWrapper>
                    {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                    <InputWrapper>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            hasError={!!passwordError}
                        />
                        <TogglePasswordButton onClick={() => setShowPassword(!showPassword)} type="button">
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </TogglePasswordButton>
                    </InputWrapper>
                </InputGroup>

                <InputGroup>
                    <InputWrapper>
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="비밀번호를 다시 한번 입력해주세요"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            hasError={!!confirmPasswordError}
                        />
                        <TogglePasswordButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </TogglePasswordButton>
                    </InputWrapper>
                    {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
                    {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}
                    {!passwordError && !confirmPasswordError && (
                        <HelperText>
                            영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.
                        </HelperText>
                    )}
                </InputGroup>
            </FormContainer>

            <CheckboxContainer>
                <CheckboxItem isAll onClick={handleAllCheck}>
                    <CheckboxInput checked={Object.values(agreements).every(Boolean)} />
                    <CheckboxLabel isAll>전체 동의</CheckboxLabel>
                </CheckboxItem>

                <CheckboxItem onClick={() => handleSingleCheck('over14')}>
                    <CheckboxInput checked={agreements.over14} />
                    <CheckboxLabel>[필수] 만 14세 이상입니다.</CheckboxLabel>
                </CheckboxItem>

                <CheckboxItem onClick={() => handleSingleCheck('terms')}>
                    <CheckboxInput checked={agreements.terms} />
                    <CheckboxLabel>[필수] AYNO 이용약관 동의</CheckboxLabel>
                    <ArrowIcon />
                </CheckboxItem>

                <CheckboxItem onClick={() => handleSingleCheck('privacy')}>
                    <CheckboxInput checked={agreements.privacy} />
                    <CheckboxLabel>[필수] AYNO 개인정보 수집 및 이용 동의</CheckboxLabel>
                    <ArrowIcon />
                </CheckboxItem>

                <CheckboxItem onClick={() => handleSingleCheck('marketing')}>
                    <CheckboxInput checked={agreements.marketing} />
                    <CheckboxLabel>[선택] 마케팅 목적의 개인정보 수집 및 이용 동의</CheckboxLabel>
                    <ArrowIcon />
                </CheckboxItem>
            </CheckboxContainer>

            <SignupButton onClick={handleSignup} disabled={!isFormValid}>
                회원가입
            </SignupButton>
        </Container>
    );
};

export default SignupPage;
