import { useState, useEffect, useCallback } from 'react';
import { getJobRoles, addJobRole, deleteJobRole } from '../../api/adminResource';
import type { JobRole } from '../../types/resource';

export const useAdminJobRoles = () => {
    const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
    const [newJobRole, setNewJobRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const fetchJobRoles = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getJobRoles();
            setJobRoles(data);
        } catch (error) {
            console.error('Failed to fetch job roles', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobRoles();
    }, [fetchJobRoles]);

    const handleAdd = async () => {
        if (!newJobRole.trim()) return;
        setIsAdding(true);
        try {
            await addJobRole(newJobRole);
            setNewJobRole('');
            fetchJobRoles();
        } catch (error) {
            alert('직무 추가 실패');
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('정말로 삭제하시겠습니까?')) return;
        try {
            await deleteJobRole(id);
            fetchJobRoles();
        } catch (error) {
            alert('삭제 실패');
        }
    };

    return {
        jobRoles,
        newJobRole,
        setNewJobRole,
        isLoading,
        isAdding,
        handleAdd,
        handleDelete,
        refresh: fetchJobRoles
    };
};
