import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, checkUsername } from '../api/auth';
import { useToast } from '../contexts/ToastContext';
import { PATH } from '../routes/constants/path';

export const useSignup = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();

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
            addToast('회원가입이 완료!', 'success');
            navigate(PATH.LOGIN);
        } catch (error: any) {
            console.error('Signup failed:', error);
            addToast(error.response?.data?.errorMessage || '회원가입에 실패', 'error');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setIsEmailChecked(false);
        setEmailError('');
    };

    return {
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
        setEmail,
        setPassword,
        setConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        handleEmailChange,
        handleCheckEmail,
        handleAllCheck,
        handleSingleCheck,
        handleSignup
    };
};
