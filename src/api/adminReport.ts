import { client } from './client';
import type { ApiResponse } from '../types/common/response';
import type { Report, ReportPageResponse, ReportStatus } from '../types/adminReport';

interface GetReportsParams {
    page?: number;
    size?: number;
    status?: ReportStatus;
    sort?: string[];
}

export const getReports = async (params?: GetReportsParams) => {
    const response = await client.get<ApiResponse<ReportPageResponse>>('/api/admin/reports', {
        params,
    });
    return response.data;
};

export const updateReportStatus = async (reportId: number, status: ReportStatus) => {
    const response = await client.patch<ApiResponse<void>>(`/api/admin/reports/${reportId}`, {
        status,
    });
    return response.data;
};
