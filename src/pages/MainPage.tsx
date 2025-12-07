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
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Mock Data
const MOCK_FLOWS = [
    {
        id: 1,
        image: 'https://via.placeholder.com/400x250/e0e0e0/888888?text=HAVEN',
        title: '고화질 인트로 영상 제작',
        author: 'LEE Chan Woo',
        tags: ['ChatGPT', 'Adobe Illustrator'],
        likes: 142,
        views: '231k'
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/400x250/ff00ff/ffffff?text=verkopem',
        title: 'Figam AI로 모바일 UI 만들기',
        author: 'LEE Chan Woo',
        tags: ['ChatGPT', 'CapCut', 'Premiere Pro'],
        likes: 142,
        views: '231k'
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/400x250/000000/ffffff?text=DRZN',
        title: '미드저니 로고 디자인',
        author: 'LEE Chan Woo',
        tags: ['Figma', 'Blender', 'Adobe Illustrator'],
        likes: 142,
        views: '231k'
    },
    {
        id: 4,
        image: 'https://via.placeholder.com/400x250/000080/ffffff?text=Logo+Design',
        title: 'UI 목업 작업물 포트폴리오',
        author: 'Midjourney',
        tags: ['Midjourney', 'Adobe Illustrator'],
        likes: 142,
        views: '231k'
    },
    {
        id: 5,
        image: 'https://via.placeholder.com/400x250/333333/ffffff?text=Earpiece',
        title: 'Chat GPT로 고화질 이미지 만들기',
        author: 'Claro Earpiece',
        tags: ['ChatGPT', 'Midjourney', 'Adobe Illustrator'],
        likes: 142,
        views: '231k'
    },
    {
        id: 6,
        image: 'https://via.placeholder.com/400x250/87ceeb/ffffff?text=House',
        title: '패키지 디자인 포트폴리오',
        author: 'Chat GPT',
        tags: ['ChatGPT', 'Blender', 'Adobe Illustrator'],
        likes: 142,
        views: '231k'
    },
    {
        id: 7,
        image: 'https://via.placeholder.com/400x250/f5f5dc/000000?text=masty',
        title: 'GPT와 Midjourney로 하는 그래픽 디자인',
        author: 'masty',
        tags: ['Gemini', 'Adobe Illustrator'],
        likes: 142,
        views: '231k'
    },
    {
        id: 8,
        image: 'https://via.placeholder.com/400x250/ff7f50/ffffff?text=Arch',
        title: 'Chat GPT 프롬프트로 고화질 그래픽 제작기',
        author: 'GPT Design',
        tags: ['ChatGPT', 'Midjourney', 'Adobe Photoshop'],
        likes: 142,
        views: '231k'
    },
    {
        id: 9,
        image: 'https://via.placeholder.com/400x250/0000ff/ffffff?text=immersy',
        title: 'GPT 이미지 색보정',
        author: 'immersy',
        tags: ['ChatGPT', 'Adobe Illustrator'],
        likes: 142,
        views: '231k'
    }
];

const MainPage = () => {
    return (
        <>
            <HeroSection />
            <MainContainer>
                <SectionTitle>신규 플로우</SectionTitle>
                <Grid>
                    {MOCK_FLOWS.map(flow => (
                        <FlowCard
                            key={flow.id}
                            image={flow.image}
                            title={flow.title}
                            author={flow.author}
                            tags={flow.tags}
                            likes={flow.likes}
                            views={flow.views}
                        />
                    ))}
                </Grid>
                <Pagination />
            </MainContainer>
        </>
    );
};

export default MainPage;
