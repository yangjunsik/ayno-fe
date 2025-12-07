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

interface PaginationProps {
  currentPage: number; // 0-indexed
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Generate page numbers to display
  // For simplicity, we'll show a sliding window or just all pages if few
  // Let's implement a simple version first: max 5 pages centered around current

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // if (totalPages <= 1) return null; // Removed to always show pagination

  return (
    <PaginationContainer>
      <Arrow
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        style={{ cursor: currentPage === 0 ? 'default' : 'pointer', opacity: currentPage === 0 ? 0.3 : 1 }}
      >
        &lt;
      </Arrow>

      {getPageNumbers().map(page => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </PageButton>
      ))}

      <Arrow
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        style={{ cursor: currentPage === totalPages - 1 ? 'default' : 'pointer', opacity: currentPage === totalPages - 1 ? 0.3 : 1 }}
      >
        &gt;
      </Arrow>
    </PaginationContainer>
  );
};

export default Pagination;
