export type AdminRole = 'ADMIN' | 'OPERATOR';

export type AdminStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';

export interface AdminUser {
    adminId: number;
    adminName: string;
    role: AdminRole;
    status: AdminStatus;
}

export interface AdminLoginResponse {
    accessToken: string;
    refreshToken: string;
    admin: AdminUser;
}