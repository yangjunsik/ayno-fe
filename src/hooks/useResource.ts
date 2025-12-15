import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse } from '../types/common/response';

interface ResourceItem {
    id: number;
    name: string;
}

type GetFn<T> = () => Promise<T[] | ApiResponse<T[]>>;
type AddFn<T> = (name: string) => Promise<T | ApiResponse<T>>;
type DeleteFn = (id: number) => Promise<void | ApiResponse<void>>;

export const useResource = <T extends { [key: string]: any }>(
    getFn: GetFn<T>,
    addFn: AddFn<T>,
    deleteFn: DeleteFn,
    mapItem: (item: T) => ResourceItem
) => {
    const [items, setItems] = useState<ResourceItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getFn();
            // Handle both direct array and ApiResponse
            const data = (response as any).data || response;
            const content = Array.isArray(data) ? data : (data as any).content;

            if (Array.isArray(content)) {
                setItems(content.map(mapItem));
            } else {
                setItems([]);
            }
        } catch (err) {
            setError('데이터를 불러오는데 실패했습니다.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [getFn, mapItem]);

    const addItem = async (name: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await addFn(name);
            await fetchData();
        } catch (err) {
            setError('항목을 추가하는데 실패했습니다.');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteItem = async (id: number) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        setIsLoading(true);
        setError(null);
        try {
            await deleteFn(id);
            await fetchData();
        } catch (err) {
            setError('항목을 삭제하는데 실패했습니다.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        items,
        isLoading,
        error,
        addItem,
        deleteItem,
        refresh: fetchData
    };
};
