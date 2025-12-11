import { client } from './client';
import type { ApiResponse } from '../types/common/response';
import type { LoginRequest } from '../types/auth';

export const login = async (data: LoginRequest) => {
    const response = await client.post<ApiResponse<{ message: string }>>('/api/auth/login', data);
    return response.data;
};
