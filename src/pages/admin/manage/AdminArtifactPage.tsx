import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getArtifacts, deleteArtifact } from '../../../api/adminArtifact';
import type { AdminArtifactView } from '../../../types/adminArtifact';
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

const DeleteButton = styled.button`
    padding: 6px 12px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #d9363e;
    }
`;

const AdminArtifactPage = () => {
    const [artifacts, setArtifacts] = useState<AdminArtifactView[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchArtifacts = async () => {
        setIsLoading(true);
        try {
            const response = await getArtifacts({
                q: searchQuery || undefined,
                size: 20
            });
            if (response.data && Array.isArray(response.data.content)) {
                setArtifacts(response.data.content);
            }
        } catch (error) {
            console.error('Failed to fetch artifacts', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchArtifacts();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleDelete = async (artifactId: number) => {
        if (window.confirm('정말로 이 아티팩트를 삭제하시겠습니까?')) {
            try {
                await deleteArtifact(artifactId);
                fetchArtifacts();
            } catch (error) {
                alert('삭제 실패');
            }
        }
    };

    return (
        <Container>
            <Title>아티팩트 관리</Title>
            <FilterSection>
                <SearchInput
                    placeholder="제목, 작성자 또는 ID 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </FilterSection>

            <Table>
                <thead>
                    <tr>
                        <Th>ID</Th>
                        <Th>제목</Th>
                        <Th>작성자</Th>
                        <Th>작성일</Th>
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
                    ) : artifacts.length === 0 ? (
                        <tr><Td colSpan={6} style={{ textAlign: 'center' }}>데이터가 없습니다.</Td></tr>
                    ) : (
                        artifacts.map((artifact) => (
                            <tr key={artifact.artifactId}>
                                <Td>{artifact.artifactId}</Td>
                                <Td>{artifact.artifactTitle}</Td>
                                <Td>{artifact.nickname}</Td>
                                <Td>{formatDate(artifact.createdAt)}</Td>
                                <Td>{artifact.visibility}</Td>
                                <Td>
                                    <DeleteButton onClick={() => handleDelete(artifact.artifactId)}>
                                        삭제
                                    </DeleteButton>
                                </Td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminArtifactPage;
