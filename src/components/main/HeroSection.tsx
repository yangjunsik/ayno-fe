import styled from '@emotion/styled';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const HeroContainer = styled.section`
  text-align: center;
  padding: 80px 20px;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

const Subtitle = styled.h2`
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 40px;
  
  span {
    color: #a88d8d; /* Muted rose color from image */
    font-weight: bold;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px 15px 50px;
  border-radius: 30px;
  border: 1px solid #eee;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  font-size: 14px;
  outline: none;
  
  &::placeholder {
    color: #aaa;
  }
`;



const SearchIcon = styled.span`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 20px; /* Increased size for icon */
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface HeroSectionProps {
  onSearch: (keyword: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [keyword, setKeyword] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  return (
    <HeroContainer>
      <Title>AI 어떻게 사용하세요?</Title>
      <Subtitle><span>AYNO</span> 에서 AI 사용법을 공유해요!</Subtitle>
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
    </HeroContainer>
  );
};

export default HeroSection;
