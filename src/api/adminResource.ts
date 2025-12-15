import { client } from './client';
import type { ApiResponse } from '../types/common/response';
import type { Interest, JobRole, Tool } from '../types/resource';

// Interests
export const getInterests = async () => {
    const response = await client.get<ApiResponse<Interest[]>>('/api/interests');
    return response.data;
};

export const addInterest = async (label: string) => {
    const response = await client.post<ApiResponse<Interest>>('/api/admin/interests', { label });
    return response.data;
};

export const deleteInterest = async (interestId: number) => {
    const response = await client.delete<ApiResponse<void>>(`/api/admin/interests/${interestId}`);
    return response.data;
};

// Job Roles
export const getJobRoles = async () => {
    const response = await client.get<ApiResponse<JobRole[]>>('/api/jobs');
    return response.data;
};

export const addJobRole = async (jobRoleLabel: string) => {
    const response = await client.post<ApiResponse<JobRole>>('/api/admin/jobs', { jobRoleLabel });
    return response.data;
};

export const deleteJobRole = async (jobRoleId: number) => {
    const response = await client.delete<ApiResponse<void>>(`/api/admin/jobs/${jobRoleId}`);
    return response.data;
};

// Tools
export const getTools = async () => {
    const response = await client.get<ApiResponse<Tool[]>>('/api/admin/tools');
    return response.data;
};

export const addTool = async (toolName: string) => {
    const response = await client.post<ApiResponse<Tool>>('/api/admin/tools', { toolName });
    return response.data;
};

export const deleteTool = async (toolId: number) => {
    const response = await client.delete<ApiResponse<void>>(`/api/admin/tools/${toolId}`);
    return response.data;
};
