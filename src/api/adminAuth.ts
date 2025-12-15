import { client } from './client';
import type { AdminUser } from '../types/admin';

export const adminLogin = async (username: string, password: string) => {
    // Adjust the endpoint to match your backend
    return await client.post<{ data: { accessToken: string; refreshToken: string; admin: AdminUser } }>('/api/admin/auth/login', {
        username,
        password,
    });
};

export const getAdminProfile = async () => {
    return await client.get<{ data: AdminUser }>('/api/admin/auth/profile');
};
