import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AdminUser } from '../types/admin';
import { getAdminProfile, adminLogin } from '../api/adminAuth';

interface AdminAuthContextType {
    adminUser: AdminUser | null;
    isAdminLoggedIn: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    checkAdminAuth: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAdminAuth = useCallback(async () => {
        try {
            const response = await getAdminProfile();
            if (response.data) {
                setAdminUser(response.data);
            } else {
                setAdminUser(null);
            }
        } catch (error) {
            setAdminUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAdminAuth();
    }, [checkAdminAuth]);

    const login = useCallback(async (username: string, password: string) => {
        try {
            const response = await adminLogin(username, password);
            console.log('Admin login response:', response);
            // Always check auth after successful login to update state
            await checkAdminAuth();
        } catch (error) {
            console.error('Admin login failed', error);
            throw error;
        }
    }, [checkAdminAuth]);

    const logout = useCallback(() => {
        setAdminUser(null);
    }, []);

    return (
        <AdminAuthContext.Provider value={{ adminUser, isAdminLoggedIn: !!adminUser, isLoading, login, logout, checkAdminAuth }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuthContext = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuthContext must be used within an AdminAuthProvider');
    }
    return context;
};
