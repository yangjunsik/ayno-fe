import styled from '@emotion/styled';
import { IoExpand, IoContract } from 'react-icons/io5';

const ButtonWrapper = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f1f3f5;
  color: #495057;
  border: 1px solid #e9ecef;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 50;

  &:hover {
    background-color: #e9ecef;
    color: #000;
    transform: scale(1.05);
  }
`;

interface Props {
  isFullScreen: boolean;
  onClick: () => void;
}

export default function FullScreenButton({ isFullScreen, onClick }: Props) {
  return (
    <ButtonWrapper 
      onClick={onClick} 
      title={isFullScreen ? "화면 분할로 복귀" : "글 작성 전체화면"}
    >
      {isFullScreen ? <IoContract size={20} /> : <IoExpand size={20} />}
    </ButtonWrapper>
  );
}