import { client } from './client';
import type { ApiResponse } from '../types/common/response';
import type { LoginRequest, SignupRequest } from '../types/auth';

export const login = async (data: LoginRequest) => {
    const response = await client.post<ApiResponse<{ message: string }>>('/api/auth/login', data);
    return response.data;
};

export const signup = async (data: SignupRequest) => {
    const response = await client.post<ApiResponse<{ message: string }>>('/api/auth/signup', data);
    return response.data;
};

export const checkUsername = async (username: string) => {
    const response = await client.post<ApiResponse<{ available: boolean }>>(`/api/auth/check/username?username=${username}`);
    return response.data;
};
