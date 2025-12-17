import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getReports, updateReportStatus } from '../../../api/adminReport';
import { updateUserStatus } from '../../../api/adminUser';
import { deleteArtifact } from '../../../api/adminArtifact';
import type { Report, ReportStatus, TargetType } from '../../../types/adminReport';
import { formatDate } from '../../../utils/date';
import Spinner from '../../../components/common/Spinner';

const Container = styled.div`
    padding: 32px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    border: 1px solid #f0f0f0;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 24px;
    color: #333;
    font-weight: 700;
`;

const FilterSection = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    align-items: center;
`;

const Select = styled.select`
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    background-color: #fff;
    cursor: pointer;
    min-width: 140px;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #333;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
`;

const Th = styled.th<{ width?: string; align?: string }>`
    text-align: ${props => props.align || 'left'};
    padding: 16px;
    border-bottom: 2px solid #f0f0f0;
    color: #666;
    font-weight: 600;
    width: ${props => props.width || 'auto'};
    vertical-align: middle;
    white-space: nowrap;
`;

const Td = styled.td<{ align?: string }>`
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
    text-align: ${props => props.align || 'left'};
    vertical-align: middle;
`;

const StatusBadge = styled.span<{ status: ReportStatus }>`
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    background-color: ${({ status }) => {
        switch (status) {
            case 'PENDING': return '#fff7e6';
            case 'RESOLVED': return '#e6f7ff';
            case 'REJECTED': return '#f5f5f5';
            default: return '#f5f5f5';
        }
    }};
    color: ${({ status }) => {
        switch (status) {
            case 'PENDING': return '#fa8c16';
            case 'RESOLVED': return '#1890ff';
            case 'REJECTED': return '#d9d9d9';
            default: return '#666';
        }
    }};
`;

const ActionButton = styled.button`
    padding: 4px 8px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s;

    &:hover {
        border-color: #40a9ff;
        color: #40a9ff;
    }
`;

const AdminReportPage = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [statusFilter, setStatusFilter] = useState<ReportStatus | ''>('');
    const [targetTypeFilter, setTargetTypeFilter] = useState<TargetType | ''>('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchReports = async () => {
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
    };

    useEffect(() => {
        fetchReports();
    }, [statusFilter, targetTypeFilter]);

    const handleStatusChange = async (id: number, newStatus: ReportStatus) => {
        const memo = window.prompt(`상태를 ${newStatus}로 변경하시겠습니까?\n관리자 메모를 입력해주세요 (선택):`);
        if (memo === null) return; // Cancelled

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
            fetchReports(); // Refresh list to reflect changes if needed
        } catch (error) {
            console.error('Failed to delete artifact', error);
            alert('아티팩트 삭제 실패');
        }
    };

    return (
        <Container>
            <Title>신고 내역 관리</Title>
            <FilterSection>
                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ReportStatus | '')}
                >
                    <option value="">전체 상태</option>
                    <option value="PENDING">대기중 (PENDING)</option>
                    <option value="RESOLVED">처리완료 (RESOLVED)</option>
                    <option value="REJECTED">반려됨 (REJECTED)</option>
                </Select>
                <Select
                    value={targetTypeFilter}
                    onChange={(e) => setTargetTypeFilter(e.target.value as TargetType | '')}
                >
                    <option value="">전체 유형</option>
                    <option value="USER">유저</option>
                    <option value="ARTIFACT">아티팩트</option>
                    <option value="COMMENT">댓글</option>
                </Select>
            </FilterSection>

            <Table>
                <thead>
                    <tr>
                        <Th width="60px" align="center">ID</Th>
                        <Th width="80px" align="center">유형</Th>
                        <Th width="150px" align="center">신고자</Th>
                        <Th width="80px" align="center">대상 ID</Th>
                        <Th align="center">사유</Th>
                        <Th width="120px" align="center">날짜</Th>
                        <Th width="100px" align="center">상태</Th>
                        <Th width="150px" align="center">메모</Th>
                        <Th width="220px" align="center">관리</Th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <Td colSpan={9} align="center">
                                <Spinner />
                            </Td>
                        </tr>
                    ) : reports.length === 0 ? (
                        <tr><Td colSpan={9} align="center">데이터가 없습니다.</Td></tr>
                    ) : (
                        reports.map((report) => (
                            <tr key={report.reportId}>
                                <Td align="center">{report.reportId}</Td>
                                <Td align="center">{report.targetType}</Td>
                                <Td align="center">
                                    {report.reporterNickname}<br />
                                    <span style={{ fontSize: '12px', color: '#888' }}>{report.reporterEmail}</span>
                                </Td>
                                <Td align="center">{report.targetId}</Td>
                                <Td align="center">{report.reason}</Td>
                                <Td align="center">{formatDate(report.createdAt)}</Td>
                                <Td align="center"><StatusBadge status={report.status}>{report.status}</StatusBadge></Td>
                                <Td align="center">{report.adminMemo || '-'}</Td>
                                <Td align="center">
                                    {report.status === 'PENDING' && (
                                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                            <ActionButton onClick={() => handleStatusChange(report.reportId, 'RESOLVED')}>승인</ActionButton>
                                            <ActionButton onClick={() => handleStatusChange(report.reportId, 'REJECTED')}>반려</ActionButton>
                                            {report.targetType === 'USER' && (
                                                <ActionButton
                                                    onClick={() => handleBlockUser(report.targetId)}
                                                    style={{ borderColor: '#ff4d4f', color: '#ff4d4f' }}
                                                >
                                                    차단
                                                </ActionButton>
                                            )}
                                            {report.targetType === 'ARTIFACT' && (
                                                <ActionButton
                                                    onClick={() => handleDeleteArtifact(report.targetId)}
                                                    style={{ borderColor: '#ff4d4f', color: '#ff4d4f' }}
                                                >
                                                    삭제
                                                </ActionButton>
                                            )}
                                        </div>
                                    )}
                                </Td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminReportPage;
