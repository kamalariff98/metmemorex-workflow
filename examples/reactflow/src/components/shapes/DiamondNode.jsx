import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const DiamondNode = ({ data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Diamond Node');

  const onLabelChange = useCallback((evt) => {
    setLabel(evt.target.value);
    if (data.onLabelChange) {
      data.onLabelChange(evt.target.value);
    }
  }, [data]);

  const onDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onKeyDown = useCallback((evt) => {
    if (evt.key === 'Enter' || evt.key === 'Escape') {
      setIsEditing(false);
    }
  }, []);

  return (
    <div
      className={`relative ${selected ? 'ring-2 ring-blue-500' : ''}`}
      onDoubleClick={onDoubleClick}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          d="M50 10L90 50L50 90L10 50L50 10Z"
          fill={selected ? '#ec4899' : '#f9a8d4'}
          stroke={selected ? '#db2777' : '#ec4899'}
          strokeWidth="2"
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {isEditing ? (
          <input
            value={label}
            onChange={onLabelChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className="bg-transparent text-center text-white font-medium text-sm outline-none border-none"
            autoFocus
          />
        ) : (
          <span className="text-white font-medium text-sm text-center px-2">
            {label}
          </span>
        )}
      </div>
      
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};

export default DiamondNode;