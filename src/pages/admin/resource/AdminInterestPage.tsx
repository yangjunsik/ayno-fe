import styled from '@emotion/styled';
import { useAdminInterests } from '../../../hooks/admin/useAdminInterests';
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

const InputSection = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
    padding: 24px;
    background-color: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #eee;
    align-items: center;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    transition: all 0.2s;
    background-color: #fff;

    &:focus {
        outline: none;
        border-color: #333;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
    }
`;

const AddButton = styled.button`
    padding: 12px 24px;
    background-color: #1a1a1a;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #333;
        transform: translateY(-1px);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
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
`;

const Td = styled.td<{ align?: string }>`
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
    text-align: ${props => props.align || 'left'};
    vertical-align: middle;
`;

const DeleteButton = styled.button`
    padding: 6px 12px;
    background-color: #fff;
    color: #ff4d4f;
    border: 1px solid #ff4d4f;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #fff1f0;
    }
`;

const AdminInterestPage = () => {
    const {
        interests,
        newInterest,
        setNewInterest,
        isLoading,
        isAdding,
        handleAdd,
        handleDelete
    } = useAdminInterests();

    return (
        <Container>
            <Title>관심요소 관리</Title>

            <InputSection>
                <Input
                    placeholder="새 관심요소 이름 (예: AI, 디자인)"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                <AddButton onClick={handleAdd} disabled={isAdding || !newInterest.trim()}>
                    {isAdding ? '등록 중...' : '등록'}
                </AddButton>
            </InputSection>

            <Table>
                <thead>
                    <tr>
                        <Th width="80px" align="center">ID</Th>
                        <Th align="center">관심요소명</Th>
                        <Th width="100px" align="center">관리</Th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <Td colSpan={3} align="center"><Spinner /></Td>
                        </tr>
                    ) : interests.length === 0 ? (
                        <tr><Td colSpan={3} align="center">데이터가 없습니다.</Td></tr>
                    ) : (
                        interests.map((interest) => (
                            <tr key={interest.interestId}>
                                <Td align="center">{interest.interestId}</Td>
                                <Td align="center">{interest.interestLabel}</Td>
                                <Td align="center">
                                    <DeleteButton onClick={() => handleDelete(interest.interestId)}>
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

export default AdminInterestPage;
