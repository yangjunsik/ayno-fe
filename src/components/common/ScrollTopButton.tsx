import styled from '@emotion/styled';
import { IoArrowUp } from 'react-icons/io5';

const ButtonWrapper = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
  z-index: 50; 

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface Props {
  onClick: () => void;
}

export default function ScrollTopButton({ onClick }: Props) {
  return (
    <ButtonWrapper onClick={onClick} title="맨 위로 이동">
      <IoArrowUp size={24} />
    </ButtonWrapper>
  );
}