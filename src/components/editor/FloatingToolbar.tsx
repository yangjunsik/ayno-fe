import styled from '@emotion/styled';
import { 
  IoImageOutline, 
  IoListOutline, 
  IoTerminalOutline, 
  IoText 
} from 'react-icons/io5';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';

const ToolbarContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(30, 30, 30, 0.9);
  backdrop-filter: blur(8px);
  padding: 8px 16px;
  border-radius: 50px;
  display: flex;
  gap: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 4px;
  align-self: center;
`;

const ToolButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${({ active }) => (active ? '#FFD700' : '#fff')};
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  svg {
    font-size: 20px;
  }
`;

interface Props {
  onAction: (action: string) => void;
}

export default function FloatingToolbar({ onAction }: Props) {
  return (
    <ToolbarContainer>
      <ToolButton onClick={() => onAction('image')} title="이미지 추가">
        <IoImageOutline />
      </ToolButton>
      <ToolButton onClick={() => onAction('bullet')} title="글머리 기호">
        <IoListOutline />
      </ToolButton>
      <ToolButton onClick={() => onAction('prompt')} title="프롬프트 블록">
        <IoTerminalOutline />
      </ToolButton>

      <Divider />

      <ToolButton onClick={() => onAction('h1')} title="대제목">
        <LuHeading1 />
      </ToolButton>
      <ToolButton onClick={() => onAction('h2')} title="부제목">
        <LuHeading2 />
      </ToolButton>
      <ToolButton onClick={() => onAction('body')} title="본문">
        <IoText />
      </ToolButton>
    </ToolbarContainer>
  );
}