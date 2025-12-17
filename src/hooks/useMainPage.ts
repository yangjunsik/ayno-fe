import { useState, useEffect, useCallback } from 'react';
import { getArtifacts, searchArtifacts } from '../api/artifact';
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
            let response;
            if (searchKeyword) {
                response = await searchArtifacts(searchKeyword, currentPage, 12, sort);
            } else {
                response = await getArtifacts(currentPage, 12, sort);
            }
            setFlows(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('Failed to load artifacts');
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
        setCurrentPage(0); // Reset to first page on new search
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top on page change
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
