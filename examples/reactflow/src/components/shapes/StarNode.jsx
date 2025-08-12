import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const StarNode = ({ data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Star Node');

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

  // Star points calculation
  const starPoints = (centerX, centerY, outerRadius, innerRadius, points) => {
    const angleStep = (Math.PI * 2) / points;
    let path = '';
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * angleStep / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    path += ' Z';
    return path;
  };

  const centerX = 50;
  const centerY = 50;
  const outerRadius = 40;
  const innerRadius = 20;
  const points = 5;

  return (
    <div
      className={`relative ${selected ? 'ring-2 ring-blue-500' : ''}`}
      onDoubleClick={onDoubleClick}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          d={starPoints(centerX, centerY, outerRadius, innerRadius, points)}
          fill={selected ? '#3b82f6' : '#fbbf24'}
          stroke={selected ? '#1d4ed8' : '#d97706'}
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

export default StarNode; 