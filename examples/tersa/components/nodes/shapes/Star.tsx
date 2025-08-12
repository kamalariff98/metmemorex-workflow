'use client';

import React, { useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

type StarData = { label?: string; onLabelChange?: (value: string) => void };

const getStarPath = (centerX: number, centerY: number, outerRadius: number, innerRadius: number, points: number) => {
  const angleStep = (Math.PI * 2) / points;
  let path = '';
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * angleStep) / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  path += ' Z';
  return path;
};

export const StarNode = ({ data, selected }: NodeProps) => {
  const d = (data ?? {}) as StarData;
  const [label, setLabel] = useState(d.label ?? 'Star');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLabel(e.target.value);
    d.onLabelChange?.(e.target.value);
  };

  return (
    <div className={`relative ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          d={getStarPath(50, 50, 40, 20, 5)}
          fill={selected ? '#3b82f6' : '#fbbf24'}
          stroke={selected ? '#1d4ed8' : '#d97706'}
          strokeWidth="2"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <input
          value={label}
          onChange={onChange}
          className="bg-transparent text-center text-white font-medium text-sm outline-none border-none"
        />
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};

export default StarNode;


