'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';


type DynamicHandle = {
  id: string;
  type: 'source' | 'target';
  side: 'top' | 'right' | 'bottom' | 'left';
  position: number; // 0-1 along the side
};

type DiamondData = { 
  label?: string; 
  onLabelChange?: (value: string) => void;
  dynamicHandles?: DynamicHandle[];
};

export const DiamondNode = ({ id, data, selected }: NodeProps) => {
  const d = (data ?? {}) as DiamondData;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(d.label ?? 'Diamond');
  const [showHandleControls, setShowHandleControls] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const { updateNodeData } = useReactFlow();

  // Initialize dynamic handles with default positions
  const [dynamicHandles, setDynamicHandles] = useState<DynamicHandle[]>(
    d.dynamicHandles || [
      { id: 'top', type: 'target', side: 'top', position: 0.5 },
      { id: 'right', type: 'source', side: 'right', position: 0.5 },
      { id: 'bottom', type: 'source', side: 'bottom', position: 0.5 },
      { id: 'left', type: 'target', side: 'left', position: 0.5 },
    ]
  );

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
      setText(d.label ?? 'Diamond');
      setIsEditing(false);
    }
  };

  // Add handle at clicked position on diamond edge
  const addHandle = (e: React.MouseEvent, nodeElement: HTMLElement) => {
    e.stopPropagation();
    
    const rect = nodeElement.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    
    // Determine which side of diamond was clicked
    let side: 'top' | 'right' | 'bottom' | 'left';
    let position: number;
    
    if (relativeY < relativeX && relativeY < (1 - relativeX)) {
      side = 'top';
      position = relativeX;
    } else if (relativeY > relativeX && relativeY > (1 - relativeX)) {
      side = 'bottom';
      position = relativeX;
    } else if (relativeX < 0.5) {
      side = 'left';
      position = relativeY;
    } else {
      side = 'right';
      position = relativeY;
    }
    
    const handleType = e.shiftKey ? 'target' : 'source';
    const newHandle: DynamicHandle = {
      id: `handle-${Date.now()}`,
      type: handleType,
      side,
      position: Math.max(0.1, Math.min(0.9, position)),
    };
    
    const updatedHandles = [...dynamicHandles, newHandle];
    setDynamicHandles(updatedHandles);
    updateNodeData(id, { dynamicHandles: updatedHandles });
  };

  // Remove handle
  const removeHandle = (handleId: string) => {
    const updatedHandles = dynamicHandles.filter(h => h.id !== handleId);
    setDynamicHandles(updatedHandles);
    updateNodeData(id, { dynamicHandles: updatedHandles });
  };

  // Convert side/position to React Flow position and style
  const getHandleProps = (handle: DynamicHandle) => {
    let style: React.CSSProperties;
    let position: Position;
    
    switch (handle.side) {
      case 'top':
        position = Position.Top;
        style = { left: `${handle.position * 100}%`, top: '0%' };
        break;
      case 'right':
        position = Position.Right;
        style = { right: '0%', top: `${handle.position * 100}%` };
        break;
      case 'bottom':
        position = Position.Bottom;
        style = { left: `${handle.position * 100}%`, bottom: '0%' };
        break;
      case 'left':
        position = Position.Left;
        style = { left: '0%', top: `${handle.position * 100}%` };
        break;
    }
    
    return { position, style };
  };

  return (
    <div className="relative">
      <div
        ref={nodeRef}
        className={`relative group ${selected ? 'ring-2 ring-gray-400' : ''}`}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setShowHandleControls(true)}
        onMouseLeave={() => setShowHandleControls(false)}
        onClick={(e) => {
          if (showHandleControls && !isEditing && nodeRef.current) {
            addHandle(e, nodeRef.current);
          }
        }}
      >
        {/* Dynamic Handles */}
        {dynamicHandles.map((handle) => {
          const { position, style: handleStyle } = getHandleProps(handle);
          return (
            <Handle
              key={handle.id}
              id={handle.id}
              type={handle.type}
              position={position}
              style={handleStyle}
              className={`w-3 h-3 border-2 transition-all duration-200 ${
                handle.type === 'source'
                  ? 'bg-blue-500 border-blue-300 hover:bg-blue-400'
                  : 'bg-green-500 border-green-300 hover:bg-green-400'
              }`}
              onDoubleClick={(e) => {
                e.stopPropagation();
                removeHandle(handle.id);
              }}
            />
          );
        })}

        {/* SVG Diamond Shape */}
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path 
            d="M50 10L90 50L50 90L10 50L50 10Z" 
            fill={selected ? '#374151' : '#4b5563'} 
            stroke={selected ? '#6b7280' : '#9ca3af'} 
            strokeWidth="2" 
          />
        </svg>

        {/* Content area */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="w-full h-full flex items-center justify-center">
              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => commit(text)}
                className="bg-transparent text-center text-white font-medium text-sm outline-none border-none"
              />
            </form>
          ) : (
            <div className="text-center text-white font-medium text-sm break-words px-2">{d.label}</div>
          )}
        </div>

        {/* Instructions overlay */}
        {showHandleControls && !isEditing && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-75 pointer-events-none whitespace-nowrap">
            Click diamond edges to add handles • Double-click handles to remove • Shift+click for inputs
          </div>
        )}
      </div>
    </div>
  );
};

export default DiamondNode;


