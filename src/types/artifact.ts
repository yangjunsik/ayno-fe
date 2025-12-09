export interface Artifact {
    artifactId: number;
    artifactTitle: string;
    userId: number;
    nickname: string;
    profileImageUrl: string;
    aiUsagePercent: number;
    viewCount: number;
    likeCount: number;
    visibility: string;
    slug: string;
    workflowId: number;
}

export interface PageResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
}

export interface ApiResponse<T> {
    data: T;
    status: string;
    serverDateTime: string;
    errorCode: string;
    errorMessage: string;
}
