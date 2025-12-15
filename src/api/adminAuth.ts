import { client } from './client';
import type { AdminUser } from '../types/admin';
import type { ApiResponse } from '../types/common/response';

export const adminLogin = async (username: string, password: string) => {
    const response = await client.post<ApiResponse<{ admin: AdminUser }>>('/api/admin/auth/login', {
        username,
        password,
    });
    return response.data;
};

export const getAdminProfile = async () => {
    const response = await client.get<ApiResponse<AdminUser>>('/api/admin/profile');
    return response.data;
};
