import { PageResponse } from './common/response';

export type ReportStatus = 'PENDING' | 'RESOLVED' | 'REJECTED';

export interface Report {
    reportId: number;
    reporterId: number;
    reporterName: string;
    targetId: number;
    targetName: string;
    reason: string;
    description?: string;
    status: ReportStatus;
    createdAt: string;
    updatedAt?: string;
}

export type ReportPageResponse = PageResponse<Report>;
