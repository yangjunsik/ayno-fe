import styled from '@emotion/styled';
import HeroSection from '../components/main/HeroSection';
import FlowCard from '../components/main/FlowCard';
import Pagination from '../components/main/Pagination';

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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
import { getArtifacts } from '../api/artifact';
import type { Artifact } from '../types/artifact';

// ... (styled components)

const MainPage = () => {
    const [flows, setFlows] = useState<Artifact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtifacts = async () => {
            try {
                const response = await getArtifacts();
                setFlows(response.data.content);
            } catch (err) {
                setError('Failed to load artifacts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtifacts();
    }, []);

    if (loading) return <MainContainer>Loading...</MainContainer>;
    if (error) return <MainContainer>{error}</MainContainer>;

    return (
        <>
            <HeroSection />
            <MainContainer>
                <SectionTitle>신규 프로젝트</SectionTitle>
                <Grid>
                    {flows.map(flow => (
                        <FlowCard
                            key={flow.artifactId}
                            image="" // API doesn't provide image yet, use default
                            title={flow.artifactTitle}
                            author="AYNO User" // API doesn't provide author yet
                            likes={flow.likeCount}
                            views={flow.viewCount.toLocaleString()}
                        />
                    ))}
                </Grid>
                <Pagination />
            </MainContainer>
        </>
    );
};

export default MainPage;
