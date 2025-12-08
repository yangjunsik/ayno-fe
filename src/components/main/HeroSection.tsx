import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import writeIcon from '../../assets/write.png';
import { PATH } from '../../constants/path';

const HeroContainer = styled.section`
  text-align: center;
  padding: 80px 20px;
  background-color: transparent; /* Allow global background to show? Or keep white? User said page background is 818181. If Hero is white, it will look like a box. Let's assume Hero should be transparent or match? The image shows white hero. But user said page background 818181. I will set HeroContainer background to transparent to let the body color show, OR if the user meant the HERO background is 818181... let's stick to body. But if Hero has white bg, it will block it. Let's remove background-color from HeroContainer or set to transparent. Wait, if the whole page is gray, the hero section usually blends in or stands out. The image shows a white background. I will set HeroContainer background to #818181 or transparent. Let's try transparent. */
  /* Actually, looking at the image, the background IS white. The user might be asking to CHANGE it to gray. So I should probably remove the white background here. */
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

const Subtitle = styled.h2`
  font-size: 36px;
  font-weight: normal;
  margin-bottom: 40px;
  display: flex; /* Added display: flex */
  align-items: center;
  justify-content: center;
  gap: 10px; /* Added gap */
  
  span {
    color: #a88d8d;
    font-weight: bold;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 56px; /* Updated height */
  padding: 0 20px 0 60px; /* Adjusted padding for vertical centering */
  border-radius: 30px;
  border: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  font-size: 16px;
  outline: none;
  
  &::placeholder {
    color: #aaa;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WriteButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%; /* Circle shape as seen in image */
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  svg {
    font-size: 30px; /* Icon size */
    color: #555; /* Icon color */
  }
`;

interface HeroSectionProps {
  onSearch: (keyword: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  const handleWriteClick = () => {
    // Helper to check for auth cookie
    // Note: This requires the accessToken cookie to be accessible to JS (not HttpOnly).
    // If it is HttpOnly, we should rely on an API call or global state.
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const isLoggedIn = !!getCookie('accessToken');

    if (isLoggedIn) {
      navigate(PATH.WRITE);
    } else {
      navigate(PATH.LOGIN);
    }
  };

  return (
    <HeroContainer>
      <Title>AI 어떻게 사용하세요?</Title>
      <Subtitle><img src={logo} alt="AYNO" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} /> 에서 AI 사용법을 공유해요!</Subtitle>
      <SearchWrapper>
        <SearchContainer>
          <SearchIcon onClick={() => onSearch(keyword)} style={{ cursor: 'pointer' }}>
            <FiSearch />
          </SearchIcon>
          <SearchInput
            placeholder="AYNO에서 검색..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </SearchContainer>
        <WriteButton aria-label="Write" onClick={handleWriteClick}>
          <img src={writeIcon} alt="글쓰기" style={{ width: '39px', height: '39px', objectFit: 'contain' }} />
        </WriteButton>
      </SearchWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
