import styled from '@emotion/styled';
import { useAdminUsers } from '../../../hooks/admin/manage/useAdminUsers';
import type { UserStatus } from '../../../types/adminUser';
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

const SearchInput = styled.input`
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    width: 320px;
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
`;

const Td = styled.td<{ align?: string }>`
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
    text-align: ${props => props.align || 'left'};
`;

const StatusBadge = styled.span<{ status: string }>`
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    background-color: ${props => {
        switch (props.status) {
            case 'ACTIVE': return '#e6f7ff';
            case 'BLOCKED': return '#fff1f0';
            case 'WITHDRAWN': return '#f5f5f5';
            default: return '#f5f5f5';
        }
    }};
    color: ${props => {
        switch (props.status) {
            case 'ACTIVE': return '#1890ff';
            case 'BLOCKED': return '#f5222d';
            case 'WITHDRAWN': return '#d9d9d9';
            default: return '#d9d9d9';
        }
    }};
`;

const StatusSelect = styled.select`
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    font-size: 13px;
    cursor: pointer;
    background-color: #fff;
    color: #333;
    outline: none;

    &:hover {
        border-color: #40a9ff;
    }
    
    &:focus {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
`;

const AdminUserPage = () => {
    const { users, searchQuery, setSearchQuery, isLoading, handleStatusChange } = useAdminUsers();

    return (
        <Container>
            <Title>유저 관리</Title>
            <FilterSection>
                <SearchInput
                    placeholder="유저 ID(숫자) 또는 닉네임 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </FilterSection>

            <Table>
                <thead>
                    <tr>
                        <Th width="80px" align="center">ID</Th>
                        <Th width="180px" align="center">닉네임</Th>
                        <Th align="center">이메일</Th>
                        <Th width="120px" align="center">가입일</Th>
                        <Th width="100px" align="center">상태</Th>
                        <Th width="120px" align="center">관리</Th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <Td colSpan={6} align="center">
                                <Spinner />
                            </Td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr><Td colSpan={6} align="center">데이터가 없습니다.</Td></tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.userId}>
                                <Td align="center">{user.userId}</Td>
                                <Td align="center">{user.nickname}</Td>
                                <Td align="center">{user.email}</Td>
                                <Td align="center">{formatDate(user.createdAt)}</Td>
                                <Td align="center">
                                    <StatusBadge status={user.status}>{user.status}</StatusBadge>
                                </Td>
                                <Td align="center">
                                    <StatusSelect
                                        value={user.status}
                                        onChange={(e) => handleStatusChange(user.userId, e.target.value as UserStatus)}
                                    >
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="BLOCKED">BLOCKED</option>
                                        <option value="WITHDRAWN">WITHDRAWN</option>
                                    </StatusSelect>
                                </Td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container >
    );
};

export default AdminUserPage;
