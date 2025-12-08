import styled from '@emotion/styled';
import HeroSection from '../components/main/HeroSection';
import FlowCard from '../components/main/FlowCard';
import Pagination from '../components/main/Pagination';

const MainContainer = styled.div`
  max-width: 1410px; /* Fits 3 cards (430*3 + 40*2 + 40 padding) */
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1410px) {
    max-width: 940px; /* Fits 2 cards (430*2 + 40 + 40 padding) */
  }

  @media (max-width: 940px) {
    max-width: 470px; /* Fits 1 card (430 + 40 padding) */
  }
`;

const SectionHeader = styled.div`
  margin-top: 60px;
  margin-bottom: 40px; /* Increased spacing */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #888;
`;

const SortButton = styled.button<{ active: boolean }>`
  font-size: 16px;
  color: ${({ active }) => (active ? '#000' : '#888')};
  font-weight: ${({ active }) => (active ? '700' : '400')};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #000;
  }
`;

const Separator = styled.span`
  color: #ddd;
  font-size: 16px;
  transform: translateY(-1px); /* Visual correction for vertical alignment */
`;

import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 430px);
  justify-content: start; /* Align grid with title */
  gap: 40px;
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const ContentWrapper = styled.div`
  min-height: 600px; /* Ensure content area doesn't collapse during loading */
  display: flex;
  flex-direction: column;
`;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/path';
import { getArtifacts, searchArtifacts } from '../api/artifact';
import type { Artifact } from '../types/artifact';
import Spinner from '../components/common/Spinner';

// ... (styled components)

const MainPage = () => {
    const navigate = useNavigate();
    const [flows, setFlows] = useState<Artifact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState('createdAt,desc');

    useEffect(() => {
        const fetchArtifacts = async () => {
            setLoading(true);
            try {
                let response;
                if (searchKeyword) {
                    response = await searchArtifacts(searchKeyword, currentPage, 12, sort);
                } else {
                    response = await getArtifacts(currentPage, 12, sort);
                }
                setFlows(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError('Failed to load artifacts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtifacts();
    }, [searchKeyword, currentPage, sort]);

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
        setCurrentPage(0); // Reset to first page on new search
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    return (
        <>
            <HeroSection onSearch={handleSearch} />
            <MainContainer>
                <SectionHeader>
                    <StyledSectionTitle>신규 플로우</StyledSectionTitle>
                    <SortContainer>
                        <SortButton
                            active={sort === 'likeCount,desc'}
                            onClick={() => setSort('likeCount,desc')}
                        >
                            인기순
                        </SortButton>
                        <Separator>|</Separator>
                        <SortButton
                            active={sort === 'createdAt,desc'}
                            onClick={() => setSort('createdAt,desc')}
                        >
                            최신순
                        </SortButton>
                    </SortContainer>
                </SectionHeader>
                <ContentWrapper>
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        <Grid key={`${sort}-${currentPage}-${searchKeyword}`}>
                            {flows.map(flow => (
                                <FlowCard
                                    key={flow.artifactId}
                                    image=""
                                    title={flow.artifactTitle}
                                    author="AYNO User"
                                    likes={flow.likeCount}
                                    views={flow.viewCount.toLocaleString()}
                                    onClick={() => navigate(PATH.ARTIFACT_DETAIL.replace(':id', flow.artifactId.toString()))}
                                />
                            ))}
                        </Grid>
                    )}
                </ContentWrapper>
                {!loading && !error && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </MainContainer>
        </>
    );
};

export default MainPage;
