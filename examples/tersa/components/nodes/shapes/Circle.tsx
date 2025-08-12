'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';

type CircleData = {
  label: string;
  onLabelChange?: (value: string) => void;
  nodeType?: 'central' | 'main' | 'regular';
  size?: 'small' | 'medium' | 'large';
  color?: string | null;
  fontFamily?: string;
  fontWeight?: string | number;
  fontStyle?: string;
};

export const CircleNode = ({ id, data, selected }: NodeProps) => {
  const d = (data ?? {}) as CircleData;
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
    } else {
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

  const baseStyles = 'rounded-full border-2 transition-all duration-200 cursor-pointer select-none flex items-center justify-center';
  const sizeClasses =
    d.size === 'small'
      ? 'w-16 h-16 text-xs'
      : d.size === 'large'
        ? 'w-28 h-28 text-lg'
        : 'w-20 h-20 text-sm';

  const getPresetStyles = () => {
    switch (d.nodeType) {
      case 'central':
        return `${baseStyles} ${sizeClasses} bg-blue-500 text-white font-bold ${selected ? 'ring-4 ring-blue-300' : ''}`;
      case 'main':
        return `${baseStyles} ${sizeClasses} bg-green-500 text-white font-semibold ${selected ? 'ring-4 ring-green-300' : ''}`;
      default:
        return `${baseStyles} ${sizeClasses} bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 ${selected ? 'ring-4 ring-gray-300 dark:ring-gray-500' : ''}`;
    }
  };

  const customColor = d.color;
  const className = customColor
    ? `rounded-full border-2 transition-all duration-200 cursor-pointer select-none flex items-center justify-center ${sizeClasses} ${selected ? 'ring-4 ring-opacity-50' : ''}`
    : getPresetStyles();

  const style = customColor
    ? {
        backgroundColor: customColor,
        color: ['#fbbf24', '#facc15', '#eab308'].includes(customColor) ? '#000' : '#fff',
        borderColor: customColor,
        fontFamily: d.fontFamily ?? 'inherit',
        fontWeight: d.fontWeight ?? 'inherit',
        fontStyle: d.fontStyle ?? 'inherit',
      }
    : {
        fontFamily: d.fontFamily ?? 'inherit',
        fontWeight: d.fontWeight ?? 'inherit',
        fontStyle: d.fontStyle ?? 'inherit',
      };

  return (
    <div className={className} style={style} onDoubleClick={handleDoubleClick}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-gray-400" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-400" />
      <Handle type="target" position={Position.Right} className="w-3 h-3 bg-gray-400" />
      <Handle type="target" position={Position.Bottom} className="w-3 h-3 bg-gray-400" />

      {isEditing ? (
        <form onSubmit={handleSubmit} className="w-full h-full flex items-center justify-center">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => commit(text)}
            className="bg-transparent border-none outline-none text-inherit font-inherit w-full text-center"
            style={{ fontSize: 'inherit', fontWeight: 'inherit' as any }}
          />
        </form>
      ) : (
        <div className="text-center break-words px-2">{d.label}</div>
      )}

      <Handle type="source" position={Position.Top} className="w-3 h-3 bg-gray-400" />
      <Handle type="source" position={Position.Left} className="w-3 h-3 bg-gray-400" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-400" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-gray-400" />
    </div>
  );
};

export default CircleNode;


