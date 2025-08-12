'use client';

import React, { useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

type TriangleData = { label?: string; onLabelChange?: (value: string) => void };

export const TriangleNode = ({ data, selected }: NodeProps) => {
  const d = (data ?? {}) as TriangleData;
  const [label, setLabel] = useState(d.label ?? 'Triangle');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLabel(e.target.value);
    d.onLabelChange?.(e.target.value);
  };

  return (
    <div className={`relative ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          d="M50 10L90 90H10L50 10Z"
          fill={selected ? '#8b5cf6' : '#a78bfa'}
          stroke={selected ? '#7c3aed' : '#8b5cf6'}
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

export default TriangleNode;


