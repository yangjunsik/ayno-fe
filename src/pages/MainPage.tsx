import styled from '@emotion/styled';
import HeroSection from '../components/main/HeroSection';
import FlowCard from '../components/main/FlowCard';
import Pagination from '../components/main/Pagination';

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  margin-top: 60px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TitleAccent = styled.div`
  width: 4px;
  height: 28px;
  background-color: #222;
  border-radius: 2px;
`;

const StyledSectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.5px;
`;



const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px; /* Increased gap for better spacing */
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

import { useEffect, useState } from 'react';
import { getArtifacts, searchArtifacts } from '../api/artifact';
import type { Artifact } from '../types/artifact';
import Spinner from '../components/common/Spinner';

// ... (styled components)

const MainPage = () => {
    const [flows, setFlows] = useState<Artifact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchArtifacts = async () => {
            setLoading(true);
            try {
                let response;
                if (searchKeyword) {
                    response = await searchArtifacts(searchKeyword, currentPage);
                } else {
                    response = await getArtifacts(currentPage);
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
    }, [searchKeyword, currentPage]);

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
                    <TitleRow>
                        <TitleAccent />
                        <StyledSectionTitle>신규 프로젝트</StyledSectionTitle>
                    </TitleRow>

                </SectionHeader>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <Grid>
                        {flows.map(flow => (
                            <FlowCard
                                key={flow.artifactId}
                                image=""
                                title={flow.artifactTitle}
                                author="AYNO User"
                                likes={flow.likeCount}
                                views={flow.viewCount.toLocaleString()}
                            />
                        ))}
                    </Grid>
                )}
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
