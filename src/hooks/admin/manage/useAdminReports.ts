import { useState, useEffect, useCallback } from 'react';
import { getReports, updateReportStatus } from '../../api/adminReport';
import { updateUserStatus } from '../../api/adminUser';
import { deleteArtifact } from '../../api/adminArtifact';
import type { Report, ReportStatus, TargetType } from '../../types/adminReport';

export const useAdminReports = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [statusFilter, setStatusFilter] = useState<ReportStatus | ''>('');
    const [targetTypeFilter, setTargetTypeFilter] = useState<TargetType | ''>('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchReports = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getReports({
                status: statusFilter || undefined,
                targetType: targetTypeFilter || undefined,
                size: 20
            });
            if (response.data && Array.isArray(response.data.content)) {
                setReports(response.data.content);
            }
        } catch (error) {
            console.error('Failed to fetch reports', error);
        } finally {
            setIsLoading(false);
        }
    }, [statusFilter, targetTypeFilter]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const handleStatusChange = async (id: number, newStatus: ReportStatus) => {
        const memo = window.prompt(`상태를 ${newStatus}로 변경하시겠습니까?\n관리자 메모를 입력해주세요 (선택):`);
        if (memo === null) return;

        try {
            await updateReportStatus(id, newStatus, memo);
            fetchReports();
        } catch (error) {
            alert('상태 변경 실패');
        }
    };

    const handleBlockUser = async (userId: number) => {
        if (!window.confirm('해당 유저를 차단하시겠습니까?')) return;
        try {
            await updateUserStatus(userId, 'BLOCKED');
            alert('유저가 차단되었습니다.');
        } catch (error) {
            alert('유저 차단 실패');
        }
    };

    const handleDeleteArtifact = async (artifactId: number) => {
        if (!window.confirm('해당 아티팩트를 삭제하시겠습니까?')) return;
        try {
            await deleteArtifact(artifactId);
            alert('아티팩트가 삭제되었습니다.');
            fetchReports();
        } catch (error) {
            console.error('Failed to delete artifact', error);
            alert('아티팩트 삭제 실패');
        }
    };

    return {
        reports,
        statusFilter,
        setStatusFilter,
        targetTypeFilter,
        setTargetTypeFilter,
        isLoading,
        handleStatusChange,
        handleBlockUser,
        handleDeleteArtifact,
        refresh: fetchReports
    };
};
