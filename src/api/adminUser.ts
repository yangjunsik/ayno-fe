import { client } from './common/client';
import type { ApiResponse } from '../types/common/response';
import type { AdminUserView, UserPageResponse, UserStatus } from '../types/adminUser';

interface GetUsersParams {
    page?: number;
    size?: number;
    status?: UserStatus;
    userId?: number;
    sort?: string[];
}

export const getUsers = async (params?: GetUsersParams) => {
    const response = await client.get<ApiResponse<UserPageResponse>>('/api/admin/users', {
        params,
    });
    return response.data;
};

export const updateUserStatus = async (userId: number, status: UserStatus) => {
    const response = await client.patch<ApiResponse<void>>(`/api/admin/users/${userId}/status`, {
        status,
    });
    return response.data;
};
