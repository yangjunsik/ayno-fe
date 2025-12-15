export interface AdminUser {
    adminId: number;
    adminName: string;
    role: 'SUPER_ADMIN' | 'ADMIN'; // Adjust based on actual roles
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
    updatedAt: string;
}

export interface AdminLoginResponse {
    accessToken: string;
    refreshToken: string;
    admin: AdminUser;
}
