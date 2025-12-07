import styled from '@emotion/styled';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 60px;
  margin-bottom: 60px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${({ active }) => (active ? '#fff' : '#666')};
  background-color: ${({ active }) => (active ? '#ddd' : 'transparent')};
  
  &:hover {
    background-color: ${({ active }) => (active ? '#ddd' : '#f5f5f5')};
  }
`;

const Arrow = styled.button`
  color: #aaa;
  font-size: 12px;
`;

const Pagination = () => {
    return (
        <PaginationContainer>
            <Arrow>&lt;</Arrow>
            <PageButton active>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <PageButton>4</PageButton>
            <PageButton>5</PageButton>
            <Arrow>&gt;</Arrow>
        </PaginationContainer>
    );
};

export default Pagination;
