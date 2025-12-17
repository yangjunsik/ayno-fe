import styled from '@emotion/styled';
import { FiEye, FiEyeOff, FiChevronRight, FiCheck } from 'react-icons/fi';
import logo from '../assets/logo_hero.svg';
import { useSignup } from '../hooks/useSignup';

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

const DuplicateCheckButton = styled.button<{ isChecked?: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ isChecked }) => (isChecked ? '#10B981' : '#9CA3AF')};
  font-size: 13px;
  background: none;
  border: none;
  cursor: ${({ isChecked }) => (isChecked ? 'default' : 'pointer')};
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: ${({ isChecked }) => (isChecked ? '600' : '400')};

  &:hover {
    color: ${({ isChecked }) => (isChecked ? '#10B981' : '#666')};
  }
  
  &:disabled {
    cursor: not-allowed;
    color: ${({ isChecked }) => (isChecked ? '#10B981' : '#D1D5DB')};
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
    const {
        email,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        emailError,
        passwordError,
        confirmPasswordError,
        isEmailChecked,
        agreements,
        isFormValid,
        setPassword,
        setConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        handleEmailChange,
        handleCheckEmail,
        handleAllCheck,
        handleSingleCheck,
        handleSignup
    } = useSignup();

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
                            onChange={handleEmailChange}
                            hasError={!!emailError}
                            style={{ paddingRight: '80px' }} // Space for button
                        />
                        <DuplicateCheckButton
                            onClick={handleCheckEmail}
                            disabled={!email || isEmailChecked}
                            isChecked={isEmailChecked}
                        >
                            {isEmailChecked ? (
                                <>
                                    <FiCheck />
                                    확인완료
                                </>
                            ) : (
                                '중복확인'
                            )}
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
