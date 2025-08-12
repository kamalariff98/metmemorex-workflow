'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';

type HexagonData = {
  id?: string;
  label?: string;
  onLabelChange?: (value: string) => void;
  nodeType?: 'central' | 'main' | 'regular';
  color?: string | null;
};

export const HexagonNode = ({ id, data, selected }: NodeProps) => {
  const d = (data ?? {}) as HexagonData;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(d.label ?? 'Node');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => setIsEditing(true);

  const commit = (value: string) => {
    if (d.onLabelChange) {
      d.onLabelChange(value);
    } else if (id) {
      updateNodeData(id, { label: value });
    }
    setIsEditing(false);
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    commit(text);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      commit(text);
    } else if (e.key === 'Escape') {
      setText(d.label ?? 'Node');
      setIsEditing(false);
    }
  };

  const customColor = d.color;
  const hexagonPath = 'M 25 0 L 75 0 L 100 50 L 75 100 L 25 100 L 0 50 Z';

  return (
    <div className={`px-2 ${selected ? 'ring-4 ring-blue-300 rounded' : ''}`} onDoubleClick={handleDoubleClick}>
      <svg width="100" height="100" viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id={`hex-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={customColor || '#3b82f6'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={customColor || '#1d4ed8'} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={hexagonPath}
          fill={customColor || `url(#hex-gradient-${id})`}
          stroke={selected ? '#3b82f6' : '#1e40af'}
          strokeWidth={selected ? 3 : 2}
        />
        <foreignObject x="10" y="35" width="80" height="30">
          <div className="flex items-center justify-center h-full">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  ref={inputRef}
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => commit(text)}
                  className="w-full bg-transparent border-none outline-none text-center text-inherit font-inherit text-sm"
                  style={{ color: 'inherit', fontWeight: 'inherit' as any }}
                />
              </form>
            ) : (
              <div className="text-center text-sm font-medium text-white truncate">{d.label}</div>
            )}
          </div>
        </foreignObject>
      </svg>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-gray-400" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-400" />
      <Handle type="target" position={Position.Right} className="w-3 h-3 bg-gray-400" />
      <Handle type="target" position={Position.Bottom} className="w-3 h-3 bg-gray-400" />
      <Handle type="source" position={Position.Top} className="w-3 h-3 bg-gray-400" />
      <Handle type="source" position={Position.Left} className="w-3 h-3 bg-gray-400" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-400" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-gray-400" />
    </div>
  );
};

export default HexagonNode;


