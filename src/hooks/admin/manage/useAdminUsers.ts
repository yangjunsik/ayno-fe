import { useState, useEffect, useCallback } from 'react';
import { getUsers, updateUserStatus } from '../../api/adminUser';
import type { AdminUserView, UserStatus } from '../../types/adminUser';

export const useAdminUsers = () => {
    const [users, setUsers] = useState<AdminUserView[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getUsers({
                q: searchQuery || undefined,
                size: 20
            });
            if (response.data && Array.isArray(response.data.content)) {
                setUsers(response.data.content);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchUsers]);

    const handleStatusChange = async (userId: number, newStatus: UserStatus) => {
        if (!window.confirm(`유저 상태를 ${newStatus}로 변경하시겠습니까?`)) return;
        try {
            await updateUserStatus(userId, newStatus);
            fetchUsers();
        } catch (error) {
            alert('상태 변경 실패');
        }
    };

    return {
        users,
        searchQuery,
        setSearchQuery,
        isLoading,
        handleStatusChange,
        refresh: fetchUsers
    };
};
