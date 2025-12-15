import { useState, useCallback, useEffect } from 'react';
import type { ApiResponse } from '../types/common/response';

export const useResource = <T, I = string>(
    getFn: () => Promise<T[]>,
    addFn: (item: I) => Promise<T | ApiResponse<T>>,
    deleteFn: (id: number) => Promise<void | ApiResponse<void>>
) => {
    const [items, setItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getFn();
            if (!Array.isArray(data)) {
                console.error('Data is not an array:', data);
                setItems([]);
                return;
            }
            setItems(data);
        } catch (err) {
            setError('Failed to fetch items');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [getFn]);

    const addItem = async (item: I) => {
        setIsLoading(true);
        setError(null);
        try {
            await addFn(item);
            await fetchItems(); // Refresh list
        } catch (err) {
            setError('Failed to add item');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteItem = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        setIsLoading(true);
        setError(null);
        try {
            await deleteFn(id);
            await fetchItems(); // Refresh list
        } catch (err) {
            setError('Failed to delete item');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return {
        items,
        isLoading,
        error,
        fetchItems,
        addItem,
        deleteItem
    };
};
