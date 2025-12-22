import React from 'react';
import { getBezierPath, type ConnectionLineComponentProps } from '@xyflow/react';

export default function CustomConnectionLine({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
  connectionLineStyle,
}: ConnectionLineComponentProps) {
  
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={2}
        d={edgePath}
        style={connectionLineStyle}
      />

      <circle
        cx={toX}
        cy={toY}
        r={6}         
        fill="#000"   
        stroke="#fff" 
        strokeWidth={2}
      />
    </g>
  );
}