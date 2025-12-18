import { client } from './common/client';
import type { Artifact } from '../types/artifact';
import type { ApiResponse, PageResponse } from '../types/common/response';

export const getArtifacts = async (keyword?: string, page = 0, size = 12, sort = 'createdAt,desc') => {
    const response = await client.get<ApiResponse<PageResponse<Artifact>>>('/api/artifacts', {
        params: {
            q: keyword || undefined,
            page,
            size,
            sort
        }
    });
    return response.data;
};
