import styled from '@emotion/styled';
import { useState } from 'react';
import defaultThumbnail from '../../assets/default_thumbnail.png';
import { FiUser, FiThumbsUp, FiEye } from 'react-icons/fi';

interface FlowCardProps {
  image: string;
  title: string;
  author: string;
  authorImage?: string;
  likes: number;
  views: string;
  onClick?: () => void;
}

const CardContainer = styled.div`
  width: 430px; /* Fixed width as requested */
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &:hover .card-hover-target {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 20px; /* Rounded corners for image only */
  background-color: #f0f0f0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
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
  gap: 8px; /* Slightly increased gap for larger icon */
  font-size: 18px; /* Increased to 18px */
  color: #fff;
  position: absolute;
  top: 15px;
  left: 15px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  font-weight: 500;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  z-index: 10;
  
  svg, img {
    width: 30px; /* Increased to 30px */
    height: 30px; /* Increased to 30px */
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
  }
  
  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  padding: 12px 4px 0 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 20px; /* Increased to 20px */
  font-weight: 700;
  color: #000;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 14px; /* Increased to 14px */
  font-weight: 400;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  line-height: 1; /* Ensure text aligns vertically with icon */
  
  svg {
    font-size: 14px;
    display: block; /* Remove extra space below svg */
  }
`;

const FlowCard = ({ image, title, author, authorImage, likes, views, onClick }: FlowCardProps) => {
  const [imgSrc, setImgSrc] = useState(image || defaultThumbnail);

  const handleImageError = () => {
    setImgSrc(defaultThumbnail);
  };

  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <img src={imgSrc} alt={title} onError={handleImageError} />
        <GradientOverlay className="card-hover-target" />
        <Author className="card-hover-target">
          {authorImage ? <img src={authorImage} alt={author} /> : <FiUser />}
          {author}
        </Author>
      </ImageWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <Stats>
          <StatItem><FiThumbsUp /> {likes}</StatItem>
          <StatItem><FiEye /> {views}</StatItem>
        </Stats>
      </ContentWrapper>
    </CardContainer>
  );
};

export default FlowCard;
