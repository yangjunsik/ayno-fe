import { client } from './client';
import type { ApiResponse, PageResponse, Artifact } from '../types/artifact';

export const getArtifacts = async (page = 0, size = 12, sort = 'createdAt,desc') => {
    const response = await client.get<ApiResponse<PageResponse<Artifact>>>('/api/artifacts', {
        params: { page, size, sort }
    });
    return response.data;
};
