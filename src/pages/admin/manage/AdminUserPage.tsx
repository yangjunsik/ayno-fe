import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getUsers, updateUserStatus } from '../../../api/adminUser';
import type { AdminUserView, UserStatus } from '../../../types/adminUser';
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
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    width: 240px;

    &:focus {
        outline: none;
        border-color: #000;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
`;

const Th = styled.th`
    text-align: left;
    padding: 16px;
    border-bottom: 2px solid #f0f0f0;
    color: #666;
    font-weight: 600;
`;

const Td = styled.td`
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
`;

const StatusSelect = styled.select`
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    font-size: 12px;
    cursor: pointer;
`;

const AdminUserPage = () => {
    const [users, setUsers] = useState<AdminUserView[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await getUsers({
                q: searchQuery || undefined,
                size: 20
            });
            if (response.data && Array.isArray(response.data.content)) {
                setUsers(response.data.content);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300); // Debounce search
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleStatusChange = async (userId: number, newStatus: UserStatus) => {
        if (!window.confirm(`유저 상태를 ${newStatus}로 변경하시겠습니까?`)) return;
        try {
            await updateUserStatus(userId, newStatus);
            fetchUsers();
        } catch (error) {
            alert('상태 변경 실패');
        }
    };

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
                        <Th>ID</Th>
                        <Th>닉네임</Th>
                        <Th>이메일</Th>
                        <Th>가입일</Th>
                        <Th>상태</Th>
                        <Th>관리</Th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <Td colSpan={6}>
                                <Spinner />
                            </Td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr><Td colSpan={6} style={{ textAlign: 'center' }}>데이터가 없습니다.</Td></tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.userId}>
                                <Td>{user.userId}</Td>
                                <Td>{user.nickname}</Td>
                                <Td>{user.email}</Td>
                                <Td>{formatDate(user.createdAt)}</Td>
                                <Td>{user.status}</Td>
                                <Td>
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
        </Container>
    );
};

export default AdminUserPage;
