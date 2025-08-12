'use client';

import React, { useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

type LightningData = { label?: string; onLabelChange?: (value: string) => void };

export const LightningNode = ({ data, selected }: NodeProps) => {
  const d = (data ?? {}) as LightningData;
  const [label, setLabel] = useState(d.label ?? 'Lightning');
  return (
    <div className={`relative ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path d="M30 10L45 40H25L35 60L70 30H50L60 10H30Z" fill={selected ? '#f59e0b' : '#fbbf24'} stroke={selected ? '#d97706' : '#f59e0b'} strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <input value={label} onChange={(e) => setLabel(e.target.value)} className="bg-transparent text-center text-white font-medium text-sm outline-none border-none" />
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};

export default LightningNode;


