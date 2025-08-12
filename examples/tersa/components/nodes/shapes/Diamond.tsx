'use client';

import React, { useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

type DiamondData = { label?: string; onLabelChange?: (value: string) => void };

export const DiamondNode = ({ data, selected }: NodeProps) => {
  const d = (data ?? {}) as DiamondData;
  const [label, setLabel] = useState(d.label ?? 'Diamond');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLabel(e.target.value);
    d.onLabelChange?.(e.target.value);
  };

  return (
    <div className={`relative ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          d="M50 10L90 50L50 90L10 50L50 10Z"
          fill={selected ? '#ec4899' : '#f9a8d4'}
          stroke={selected ? '#db2777' : '#ec4899'}
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

export default DiamondNode;


