'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';

type EllipseData = {
  label?: string;
  onLabelChange?: (value: string) => void;
  nodeType?: 'central' | 'main' | 'regular';
  size?: 'small' | 'medium' | 'large';
  color?: string | null;
  fontFamily?: string;
  fontWeight?: string | number;
  fontStyle?: string;
};

export const EllipseNode = ({ id, data, selected }: NodeProps) => {
  const d = (data ?? {}) as EllipseData;
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
    d.onLabelChange ? d.onLabelChange(value) : updateNodeData(id, { label: value });
    setIsEditing(false);
  };
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    commit(text);
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') commit(text);
    else if (e.key === 'Escape') {
      setText(d.label ?? 'Node');
      setIsEditing(false);
    }
  };

  const base = 'rounded-full border-2 transition-all duration-200 cursor-pointer select-none flex items-center justify-center';
  const size = d.size === 'small' ? 'w-20 h-12 text-xs' : d.size === 'large' ? 'w-36 h-20 text-lg' : 'w-28 h-16 text-sm';
  const preset = d.nodeType === 'central'
    ? `${base} ${size} bg-gray-900 text-white font-bold ${selected ? 'ring-4 ring-gray-500' : ''}`
    : d.nodeType === 'main'
    ? `${base} ${size} bg-gray-800 text-white font-semibold ${selected ? 'ring-4 ring-gray-500' : ''}`
    : `${base} ${size} bg-gray-700 text-white border-gray-500 ${selected ? 'ring-4 ring-gray-400' : ''}`;

  const className = d.color ? `${base} ${size} ${selected ? 'ring-4 ring-opacity-50' : ''}` : preset;
  const style = d.color
    ? {
        backgroundColor: d.color,
        color: '#fff',
        borderColor: d.color,
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
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-gray-500 border-gray-300" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-500 border-gray-300" />
      <Handle type="target" position={Position.Right} className="w-3 h-3 bg-gray-500 border-gray-300" />
      <Handle type="target" position={Position.Bottom} className="w-3 h-3 bg-gray-500 border-gray-300" />
      {isEditing ? (
        <form onSubmit={handleSubmit} className="w-full h-full flex items-center justify-center px-2">
          <input ref={inputRef} type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} onBlur={() => commit(text)} className="bg-transparent border-none outline-none text-inherit font-inherit w-full text-center" />
        </form>
      ) : (
        <div className="text-center break-words px-3">{d.label}</div>
      )}
      <Handle type="source" position={Position.Top} className="w-3 h-3 bg-gray-500 border-gray-300" />
      <Handle type="source" position={Position.Left} className="w-3 h-3 bg-gray-500 border-gray-300" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-500 border-gray-300" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-gray-500 border-gray-300" />
    </div>
  );
};

export default EllipseNode;


