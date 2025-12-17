import type { PageResponse } from './common/response';

export interface AdminArtifactView {
    artifactId: number;
    artifactTitle: string;
    workflowId: number;
    userId: number;
    nickname: string;
    username: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    viewCount: number;
    createdAt: string;
}

export type ArtifactPageResponse = PageResponse<AdminArtifactView>;

export type ArtifactStatus = 'PUBLIC' | 'PRIVATE';
