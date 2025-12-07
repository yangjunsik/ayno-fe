import styled from '@emotion/styled';
import { useState } from 'react';
import defaultThumbnail from '../../assets/default_thumbnail.png';

interface FlowCardProps {
  image: string;
  title: string;
  author: string;
  likes: number;
  views: string;
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
  height: 200px;
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
  height: 70px; /* Increased height for smoother fade, but visually subtle */
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%); /* Lighter start opacity */
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #fff;
  position: absolute;
  top: 15px;
  left: 15px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0;
  color: #fff;
  position: absolute;
  bottom: 15px; /* Moved to bottom */
  left: 15px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
`;

const Stats = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: #fff;
  font-size: 10px;
  display: flex;
  gap: 8px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
`;

const FlowCard = ({ image, title, author, likes, views }: FlowCardProps) => {
  const [imgSrc, setImgSrc] = useState(image || defaultThumbnail);

  const handleImageError = () => {
    setImgSrc(defaultThumbnail);
  };

  return (
    <CardContainer>
      <ImageWrapper>
        <img src={imgSrc} alt={title} onError={handleImageError} />
        <GradientOverlay className="card-hover-target" />
        <Author className="card-hover-target">👤 {author}</Author>
        <Title>{title}</Title>
        <Stats>
          <span>👍 {likes}</span>
          <span>👁 {views}</span>
        </Stats>
      </ImageWrapper>
    </CardContainer>
  );
};

export default FlowCard;
