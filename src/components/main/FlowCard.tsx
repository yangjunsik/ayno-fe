import styled from '@emotion/styled';
import { useState } from 'react';
import defaultThumbnail from '../../assets/default_thumbnail.png';
import { FiUser, FiThumbsUp, FiEye } from 'react-icons/fi';

interface FlowCardProps {
  image: string;
  title: string;
  author: string;
  likes: number;
  views: string;
  onClick?: () => void;
}

const CardContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04); /* Lighter shadow */
  background-color: #fff;
  transition: transform 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-3px);
  }

  &:hover .card-hover-target {
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  height: 240px; /* Increased height for better proportions */
  background-color: #f0f0f0;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #4a4a4a; /* Match Stats color */
  position: absolute;
  top: 15px;
  left: 15px;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 2px rgba(255, 255, 255, 1);
  font-weight: 500; /* Match Stats weight */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
  
  svg {
    width: 14px;
    height: 14px;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1));
  }
`;

const BottomInfo = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px; /* Increased gap for better separation */
  z-index: 1;
  width: calc(100% - 30px);
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700; /* Extra bold for emphasis */
  margin: 0;
  color: #1a1a1a; /* Slightly darker */
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 2px rgba(255, 255, 255, 1);
  line-height: 1.3;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Stats = styled.div`
  color: #4a4a4a; /* Lighter color to push it back in hierarchy */
  font-size: 12px; /* Restored to standard minimum */
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 2px rgba(255, 255, 255, 1);
  font-weight: 500;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  
  svg {
    width: 14px; /* Proportional icon size */
    height: 14px;
    margin-bottom: 1px;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1));
    opacity: 0.8;
  }
`;

const FlowCard = ({ image, title, author, likes, views, onClick }: FlowCardProps) => {
  const [imgSrc, setImgSrc] = useState(image || defaultThumbnail);

  const handleImageError = () => {
    setImgSrc(defaultThumbnail);
  };

  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <img src={imgSrc} alt={title} onError={handleImageError} />
        <GradientOverlay className="card-hover-target" />
        <Author className="card-hover-target"><FiUser /> {author}</Author>
        <BottomInfo>
          <Title>{title}</Title>
          <Stats>
            <StatItem><FiThumbsUp /> {likes}</StatItem>
            <StatItem><FiEye /> {views}</StatItem>
          </Stats>
        </BottomInfo>
      </ImageWrapper>
    </CardContainer>
  );
};

export default FlowCard;
