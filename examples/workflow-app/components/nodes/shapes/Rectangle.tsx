'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import { useComputingFlow, type NodeData } from '../../../hooks/useComputingFlow';


type DynamicHandle = {
  id: string;
  type: 'source' | 'target';
  side: 'top' | 'right' | 'bottom' | 'left';
  position: number; // 0-1 along the side
};

type RectangleData = NodeData & {
  onLabelChange?: (value: string) => void;
  nodeType?: 'central' | 'main' | 'regular';
  size?: 'small' | 'medium' | 'large';
  color?: string | null;
  fontFamily?: string;
  fontWeight?: string | number;
  fontStyle?: string;
  dynamicHandles?: DynamicHandle[];
};

export const RectangleNode = ({ id, data, selected }: NodeProps) => {
  const d = (data ?? {}) as RectangleData;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(d.label ?? 'Node');
  const [showHandleControls, setShowHandleControls] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const { updateNodeData } = useReactFlow();
  
  // Computing flow functionality
  const { getInputValues, computeResult, updateData, hasInputs } = useComputingFlow(id);

  // Initialize with default handles if none exist
  const [dynamicHandles, setDynamicHandles] = useState<DynamicHandle[]>(
    d.dynamicHandles || [
      { id: 'top-center', type: 'target', side: 'top', position: 0.5 },
      { id: 'right-center', type: 'source', side: 'right', position: 0.5 },
      { id: 'bottom-center', type: 'source', side: 'bottom', position: 0.5 },
      { id: 'left-center', type: 'target', side: 'left', position: 0.5 },
    ]
  );

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Compute result when inputs change
  useEffect(() => {
    if (hasInputs && d.operation) {
      const inputs = getInputValues();
      const result = computeResult(d.operation, inputs);
      updateData({ result, value: result });
    } else if (!hasInputs && text !== d.label) {
      // If no inputs, use the text as the value
      updateData({ value: text, result: text });
    }
  }, [hasInputs, getInputValues, computeResult, d.operation, text, d.label, updateData]);

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

  // Function to add a new handle at a specific position
  const addHandle = (event: React.MouseEvent, side: 'top' | 'right' | 'bottom' | 'left') => {
    if (!nodeRef.current || isEditing) return;
    
    event.stopPropagation();
    const rect = nodeRef.current.getBoundingClientRect();
    let position = 0.5; // Default to center
    
    // Calculate position based on click location
    switch (side) {
      case 'top':
      case 'bottom':
        position = Math.max(0.1, Math.min(0.9, (event.clientX - rect.left) / rect.width));
        break;
      case 'left':
      case 'right':
        position = Math.max(0.1, Math.min(0.9, (event.clientY - rect.top) / rect.height));
        break;
    }

    const newHandle: DynamicHandle = {
      id: `${side}-${Date.now()}`,
      type: event.shiftKey ? 'target' : 'source', // Shift+click for target handles
      side,
      position,
    };

    const updatedHandles = [...dynamicHandles, newHandle];
    setDynamicHandles(updatedHandles);
    updateNodeData(id, { dynamicHandles: updatedHandles });
  };

  // Function to remove a handle
  const removeHandle = (handleId: string) => {
    const updatedHandles = dynamicHandles.filter(h => h.id !== handleId);
    setDynamicHandles(updatedHandles);
    updateNodeData(id, { dynamicHandles: updatedHandles });
  };

  // Convert side and position to React Flow Position and style
  const getHandleProps = (handle: DynamicHandle) => {
    let position: Position;
    let style: React.CSSProperties = {};

    switch (handle.side) {
      case 'top':
        position = Position.Top;
        style = { left: `${handle.position * 100}%`, transform: 'translateX(-50%)' };
        break;
      case 'right':
        position = Position.Right;
        style = { top: `${handle.position * 100}%`, transform: 'translateY(-50%)' };
        break;
      case 'bottom':
        position = Position.Bottom;
        style = { left: `${handle.position * 100}%`, transform: 'translateX(-50%)' };
        break;
      case 'left':
        position = Position.Left;
        style = { top: `${handle.position * 100}%`, transform: 'translateY(-50%)' };
        break;
    }

    return { position, style };
  };

  const baseStyles = 'px-4 py-3 border-2 transition-all duration-200 cursor-pointer select-none';
  const sizeClasses =
    d.size === 'small'
      ? 'text-sm min-w-[80px] min-h-[40px]'
      : d.size === 'large'
        ? 'text-lg min-w-[140px] min-h-[60px]'
        : 'text-base min-w-[100px] min-h-[50px]';

  const getPresetStyles = () => {
    switch (d.nodeType) {
      case 'central':
        return `${baseStyles} ${sizeClasses} bg-gray-900 text-white font-bold border-gray-600 ${selected ? 'ring-4 ring-gray-500' : ''}`;
      case 'main':
        return `${baseStyles} ${sizeClasses} bg-gray-800 text-white font-semibold border-gray-600 ${selected ? 'ring-4 ring-gray-500' : ''}`;
      default:
        return `${baseStyles} ${sizeClasses} bg-gray-700 text-white border-gray-500 ${selected ? 'ring-4 ring-gray-400' : ''}`;
    }
  };

  const customColor = d.color;
  const className = customColor
    ? `px-4 py-3 border-2 transition-all duration-200 cursor-pointer select-none ${sizeClasses} ${selected ? 'ring-4 ring-opacity-50' : ''}`
    : getPresetStyles();

  const style = customColor
    ? {
        backgroundColor: customColor,
        color: '#fff',
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
    <div 
      ref={nodeRef}
      className={`${className} relative group`} 
      style={style} 
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setShowHandleControls(true)}
      onMouseLeave={() => setShowHandleControls(false)}
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

        {/* Clickable borders for adding handles */}
        {showHandleControls && !isEditing && (
          <>
            {/* Top border */}
            <div
              className="absolute -top-1 left-0 right-0 h-2 cursor-crosshair bg-transparent hover:bg-blue-200 hover:bg-opacity-20 transition-colors"
              onClick={(e) => addHandle(e, 'top')}
              title="Click to add handle (Shift+click for input)"
            />
            {/* Right border */}
            <div
              className="absolute -right-1 top-0 bottom-0 w-2 cursor-crosshair bg-transparent hover:bg-blue-200 hover:bg-opacity-20 transition-colors"
              onClick={(e) => addHandle(e, 'right')}
              title="Click to add handle (Shift+click for input)"
            />
            {/* Bottom border */}
            <div
              className="absolute -bottom-1 left-0 right-0 h-2 cursor-crosshair bg-transparent hover:bg-blue-200 hover:bg-opacity-20 transition-colors"
              onClick={(e) => addHandle(e, 'bottom')}
              title="Click to add handle (Shift+click for input)"
            />
            {/* Left border */}
            <div
              className="absolute -left-1 top-0 bottom-0 w-2 cursor-crosshair bg-transparent hover:bg-blue-200 hover:bg-opacity-20 transition-colors"
              onClick={(e) => addHandle(e, 'left')}
              title="Click to add handle (Shift+click for input)"
            />
          </>
        )}

        {/* Content area */}
        <div className="content-area flex items-center justify-center h-full relative z-10">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="w-full">
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
            <div className="text-center break-words">
              <div className="font-semibold">{d.label}</div>
              {d.result !== undefined && d.result !== d.label && (
                <div className="text-xs opacity-75 mt-1 px-1 bg-black bg-opacity-20 rounded">
                  {String(d.result)}
                </div>
              )}
              {d.operation && (
                <div className="text-xs opacity-50 mt-1">
                  {d.operation}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions overlay */}
        {showHandleControls && !isEditing && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-75 pointer-events-none whitespace-nowrap">
            Click borders to add handles • Double-click handles to remove • Shift+click for inputs
          </div>
        )}
      </div>
  );
};

export default RectangleNode;


