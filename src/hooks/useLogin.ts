import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { login as apiLogin } from '../api/auth';
import { getMyProfile } from '../api/user';
import { PATH } from '../routes/constants/path';
import type { LoginRequest } from '../types/auth';

export const useAuth = () => {
    const { login: contextLogin, logout: contextLogout, user, isLoggedIn, isAdmin, isLoading: isInitializing } = useAuthContext();
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async ({ username, password }: LoginRequest) => {
        setIsLoggingIn(true);
        setError(null);
        try {
            await apiLogin({ username, password });
            const response = await getMyProfile();
            if (response.data) {
                contextLogin(response.data);
                navigate(PATH.HOME);
            } else {
                navigate(PATH.HOME);
            }
        } catch (err: any) {
            console.error('Login failed:', err);
            const message = err.response?.data?.errorMessage || '아이디 또는 비밀번호가 일치하지 않습니다.';
            setError(message);
            throw err; // Re-throw if component needs to know
        } finally {
            setIsLoggingIn(false);
        }
    };

    const kakaoLogin = () => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        window.location.href = `${API_URL}/oauth2/authorization/kakao`;
    };

    const googleLogin = () => {
        alert('구글 로그인 준비 중입니다.');
    };

    const logout = () => {
        contextLogout();
        navigate(PATH.HOME);
    };

    return {
        user,
        isLoggedIn,
        isAdmin,
        login,
        logout,
        kakaoLogin,
        googleLogin,
        isLoggingIn,
        isInitializing,
        error
    };
};

