import { useCallback } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import styled from '@emotion/styled';
import { IoClose } from 'react-icons/io5';
import { 
  SiOpenai, SiFigma, SiAdobeillustrator, SiAdobephotoshop, 
  SiAdobepremierepro, SiNotion 
} from 'react-icons/si';
import { FaRobot, FaVideo, FaSearch, FaPaintBrush } from 'react-icons/fa';
import type { NodeData } from '../../types/workflow';

const getIcon = (label: string) => {
  const name = label.toLowerCase();
  if (name.includes('gpt')) return <SiOpenai />;
  if (name.includes('claude')) return <FaRobot />;
  if (name.includes('perplexity')) return <FaSearch />;
  if (name.includes('midjourney')) return <FaPaintBrush />;
  if (name.includes('figma')) return <SiFigma />;
  if (name.includes('illustrator')) return <SiAdobeillustrator />;
  if (name.includes('photoshop')) return <SiAdobephotoshop />;
  if (name.includes('premiere')) return <SiAdobepremierepro />;
  if (name.includes('capcut')) return <FaVideo />;
  return <SiNotion />;
};

const NodeWrapper = styled.div`
  position: relative;
  width: 120px;
  padding: 16px 8px;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: #888;

  /* 노드 본체 호버 시: 테두리와 아이콘 색상만 변경 (점 크기 영향 X) */
  &:hover {
    border-color: #000;
    color: #000;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  &.selected {
    border-color: #000;
    box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 6px; left: 6px;
  background: transparent; border: none;
  color: #ccc; cursor: pointer; padding: 6px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  z-index: 20;

  &:hover { color: #ff4d4f; transform: scale(1.1); }
`;

const IconWrapper = styled.div`
  font-size: 32px; margin-bottom: 4px; pointer-events: none;
`;

const Label = styled.div`
  font-weight: 700; font-size: 13px; text-align: center; color: #333;
  line-height: 1.2; pointer-events: none;
`;

const StepBadge = styled.div`
  font-size: 11px; font-weight: 600; color: #fff; background: #333;
  padding: 2px 8px; border-radius: 12px; margin-top: 4px; pointer-events: none;
`;

const SourceHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  background: #333;
  border: 2px solid #fff;
  right: -8px;
  
  top: 50%;
  transform: translate(0, -50%);
  transform-origin: center; 

  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    background: transparent;
    border-radius: 50%;
  }

  &:hover {
    transform: translate(0, -50%) scale(1.6);
    background: #000;
    border-color: #000;
  }
`;

const targetHandleStyle = {
  width: '100%', height: '100%',
  background: 'transparent', border: 'none', borderRadius: '16px',
  top: 0, left: 0, transform: 'none', opacity: 0, zIndex: 0,
};

export default function ToolNode({ id, data }: NodeProps) {
  const { setNodes } = useReactFlow();

  const onDelete = useCallback((evt: React.MouseEvent) => {
    evt.stopPropagation();
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  const nodeData = data as unknown as NodeData;

  return (
    <NodeWrapper>
      <DeleteButton onClick={onDelete}>
        <IoClose size={18} />
      </DeleteButton>

      <Handle 
        type="target" 
        position={Position.Left} 
        style={targetHandleStyle as React.CSSProperties}
        isConnectableStart={false} 
      />

      <IconWrapper>{getIcon(nodeData.label)}</IconWrapper>
      <Label>{nodeData.label}</Label>
      {nodeData.stepLabel && <StepBadge>{nodeData.stepLabel}</StepBadge>}

      <SourceHandle type="source" position={Position.Right} />
    </NodeWrapper>
  );
}