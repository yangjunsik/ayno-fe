import { client } from './client';
import type { User } from '../types/user';
import type { ApiResponse } from '../types/common/response';

export const getMyProfile = async (config?: { suppressErrorToast?: boolean }): Promise<ApiResponse<User>> => {
    // @ts-ignore - Custom config property
    const response = await client.get<ApiResponse<User>>('/api/users/me/profile', config);
    return response.data as ApiResponse<User>;
};
