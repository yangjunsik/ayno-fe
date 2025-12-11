import { client } from './client';
import type { User } from '../types/user';
import type { ApiResponse } from '../types/common/response';

export const getMyProfile = async () => {
    const response = await client.get<ApiResponse<User>>('/api/users/me/profile');
    return response.data;
};
