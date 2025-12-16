import { PageResponse } from './common/response';

export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'WITHDRAWN';

export interface AdminUserView {
    userId: number;
    nickname: string;
    email: string;
    status: UserStatus;
    role: string;
    createdAt: string;
    reportCount?: number; // Optional: number of times reported
}

export type UserPageResponse = PageResponse<AdminUserView>;
