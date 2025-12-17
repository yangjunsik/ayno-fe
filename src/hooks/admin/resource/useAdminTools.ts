import { useState, useEffect, useCallback } from 'react';
import { getTools, addTool, deleteTool } from '../../../api/adminResource';
import type { Tool } from '../../../types/resource';

export const useAdminTools = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const fetchTools = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getTools();
            setTools(data);
        } catch (error) {
            console.error('Failed to fetch tools', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTools();
    }, [fetchTools]);

    const handleAdd = async () => {
        if (!name.trim() || !url.trim()) return;
        setIsAdding(true);
        try {
            await addTool({
                toolName: name,
                toolSiteUrl: url,
                toolType: 'AI', // Default
                toolIconUrl: 'https://via.placeholder.com/64' // Default
            });
            setName('');
            setUrl('');
            fetchTools();
        } catch (error) {
            alert('툴 추가 실패');
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('정말로 삭제하시겠습니까?')) return;
        try {
            await deleteTool(id);
            fetchTools();
        } catch (error) {
            alert('삭제 실패');
        }
    };

    return {
        tools,
        name,
        setName,
        url,
        setUrl,
        isLoading,
        isAdding,
        handleAdd,
        handleDelete,
        refresh: fetchTools
    };
};
