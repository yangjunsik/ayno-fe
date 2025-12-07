import styled from '@emotion/styled';
import HeroSection from '../components/main/HeroSection';
import FlowCard from '../components/main/FlowCard';
import Pagination from '../components/main/Pagination';

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 60vh; /* Ensure footer stays down */
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 40px;
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

    useEffect(() => {
        const fetchArtifacts = async () => {
            setLoading(true);
            try {
                let response;
                if (searchKeyword) {
                    response = await searchArtifacts(searchKeyword);
                } else {
                    response = await getArtifacts();
                }
                setFlows(response.data.content);
            } catch (err) {
                setError('Failed to load artifacts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtifacts();
    }, [searchKeyword]);

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
    };

    return (
        <>
            <HeroSection onSearch={handleSearch} />
            <MainContainer>
                <SectionTitle>신규 프로젝트</SectionTitle>
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
                {!loading && !error && <Pagination />}
            </MainContainer>
        </>
    );
};

export default MainPage;
