'use client';

import React, { useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

type HeartData = { label?: string; onLabelChange?: (value: string) => void };

export const HeartNode = ({ data, selected }: NodeProps) => {
  const d = (data ?? {}) as HeartData;
  const [label, setLabel] = useState(d.label ?? 'Heart');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLabel(e.target.value);
    d.onLabelChange?.(e.target.value);
  };

  return (
    <div className={`relative ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          d="M50 85C50 85 20 65 20 45C20 30 30 20 45 20C55 20 62 25 65 35C68 25 75 20 85 20C100 20 110 30 110 45C110 65 80 85 80 85L50 85Z"
          fill={selected ? '#ef4444' : '#f87171'}
          stroke={selected ? '#dc2626' : '#ef4444'}
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

export default HeartNode;


