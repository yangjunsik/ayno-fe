import { useState, useEffect, useCallback } from 'react';
import { getInterests, addInterest, deleteInterest } from '../../../api/adminResource';
import type { Interest } from '../../../types/resource';

export const useAdminInterests = () => {
    const [interests, setInterests] = useState<Interest[]>([]);
    const [newInterest, setNewInterest] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const fetchInterests = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getInterests();
            setInterests(data);
        } catch (error) {
            console.error('Failed to fetch interests', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInterests();
    }, [fetchInterests]);

    const handleAdd = async () => {
        if (!newInterest.trim()) return;
        setIsAdding(true);
        try {
            await addInterest(newInterest);
            setNewInterest('');
            fetchInterests();
        } catch (error) {
            alert('관심요소 추가 실패');
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('정말로 삭제하시겠습니까?')) return;
        try {
            await deleteInterest(id);
            fetchInterests();
        } catch (error) {
            alert('삭제 실패');
        }
    };

    return {
        interests,
        newInterest,
        setNewInterest,
        isLoading,
        isAdding,
        handleAdd,
        handleDelete,
        refresh: fetchInterests
    };
};
