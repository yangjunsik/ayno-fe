import styled from '@emotion/styled';

interface FlowCardProps {
    image: string;
    title: string;
    author: string;
    tags: string[];
    likes: number;
    views: string;
}

const CardContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background-color: #fff;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
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
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  position: absolute;
  bottom: 40px;
  left: 15px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  position: absolute;
  bottom: 15px;
  left: 15px;
`;

const Tag = styled.span<{ type: string }>`
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
  background-color: ${({ type }) => {
        switch (type) {
            case 'ChatGPT': return '#10a37f';
            case 'Midjourney': return '#3b5998'; // Placeholder blue
            case 'Adobe Illustrator': return '#ff9a00';
            case 'Figma': return '#f24e1e';
            case 'Blender': return '#ea7600';
            case 'Gemini': return '#4285f4';
            default: return '#333';
        }
    }};
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

const FlowCard = ({ image, title, author, tags, likes, views }: FlowCardProps) => {
    return (
        <CardContainer>
            <ImageWrapper>
                <img src={image} alt={title} />
                <Author>👤 {author}</Author>
                <Title>{title}</Title>
                <Tags>
                    {tags.map(tag => (
                        <Tag key={tag} type={tag}>{tag}</Tag>
                    ))}
                </Tags>
                <Stats>
                    <span>👍 {likes}</span>
                    <span>👁 {views}</span>
                </Stats>
            </ImageWrapper>
        </CardContainer>
    );
};

export default FlowCard;
