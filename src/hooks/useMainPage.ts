import { useState, useEffect, useCallback } from 'react';
import { getArtifacts } from '../api/artifact';
import type { Artifact } from '../types/artifact';

export const useMainPage = () => {
    const [flows, setFlows] = useState<Artifact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState('createdAt,desc');

    const fetchArtifacts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getArtifacts(searchKeyword, currentPage, 12, sort);
            setFlows(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('artifacts 불러오기 실패');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchKeyword, currentPage, sort]);

    useEffect(() => {
        fetchArtifacts();
    }, [fetchArtifacts]);

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
        setCurrentPage(0);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return {
        flows,
        loading,
        error,
        currentPage,
        totalPages,
        sort,
        setSort,
        searchKeyword,
        handleSearch,
        handlePageChange,
        refresh: fetchArtifacts
    };
};
