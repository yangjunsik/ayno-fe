import { client } from './common/client';
import type { ApiResponse } from '../types/common/response';
import type { ArtifactPageResponse, ArtifactStatus } from '../types/adminArtifact.ts';

interface GetArtifactsParams {
    page?: number;
    size?: number;
    status?: ArtifactStatus;
    q?: string;
    sort?: string[];
}

export const getArtifacts = async (params?: GetArtifactsParams) => {
    const response = await client.get<ApiResponse<ArtifactPageResponse>>('/api/admin/artifacts', {
        params,
    });
    return response.data;
};

export const deleteArtifact = async (artifactId: number) => {
    const response = await client.delete<ApiResponse<void>>(`/api/admin/artifacts/${artifactId}`);
    return response.data;
};
