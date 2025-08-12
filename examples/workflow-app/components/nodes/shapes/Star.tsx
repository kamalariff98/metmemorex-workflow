'use client';

import React, { useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

type StarData = { label?: string; onLabelChange?: (value: string) => void };

const starPath = (cx: number, cy: number, R: number, r: number, n: number) => {
  const step = (Math.PI * 2) / n;
  let path = '';
  for (let i = 0; i < n * 2; i++) {
    const radius = i % 2 === 0 ? R : r;
    const angle = (i * step) / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return path + ' Z';
};

export const StarNode = ({ data, selected }: NodeProps) => {
  const d = (data ?? {}) as StarData;
  const [label, setLabel] = useState(d.label ?? 'Star');
  return (
    <div className={`relative ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path d={starPath(50, 50, 40, 20, 5)} fill={selected ? '#3b82f6' : '#fbbf24'} stroke={selected ? '#1d4ed8' : '#d97706'} strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <input value={label} onChange={(e) => setLabel(e.target.value)} className="bg-transparent text-center text-white font-medium text-sm outline-none border-none" />
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};

export default StarNode;


