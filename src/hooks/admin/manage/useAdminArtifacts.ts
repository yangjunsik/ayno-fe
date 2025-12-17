import { useState, useEffect, useCallback } from 'react';
import { getArtifacts, deleteArtifact } from '../../../api/adminArtifact';
import type { AdminArtifactView } from '../../../types/adminArtifact';

export const useAdminArtifacts = () => {
    const [artifacts, setArtifacts] = useState<AdminArtifactView[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchArtifacts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getArtifacts({
                q: searchQuery || undefined,
                size: 20
            });
            if (response.data && Array.isArray(response.data.content)) {
                setArtifacts(response.data.content);
            }
        } catch (error) {
            console.error('Failed to fetch artifacts', error);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchArtifacts();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchArtifacts]);

    const handleDelete = async (artifactId: number) => {
        if (window.confirm('정말로 이 아티팩트를 삭제하시겠습니까?')) {
            try {
                await deleteArtifact(artifactId);
                fetchArtifacts();
            } catch (error) {
                console.error('Delete failed:', error);
                alert('삭제 실패');
            }
        }
    };

    return {
        artifacts,
        searchQuery,
        setSearchQuery,
        isLoading,
        handleDelete,
        refresh: fetchArtifacts
    };
};
