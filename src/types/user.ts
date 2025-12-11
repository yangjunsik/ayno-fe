export interface User {
    userId: number;
    username: string;
    nickname: string;
    profileImageUrl: string;
    jobRoleName?: string;
    interests?: string[];
    gender?: string;
    ageBand?: string;
    aiUsageDepth?: string;
}