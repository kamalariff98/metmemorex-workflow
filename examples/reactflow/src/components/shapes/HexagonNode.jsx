import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const HexagonNode = ({ data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.label);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    data.onLabelChange(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setText(data.label);
      setIsEditing(false);
    }
  };

  const getNodeStyles = () => {
    const baseStyles = 'px-4 py-2 transition-all duration-200 cursor-pointer select-none';
    
    switch (data.nodeType) {
      case 'central':
        return `${baseStyles} bg-blue-500 text-white font-bold text-lg min-w-[120px] ${
          selected ? 'ring-4 ring-blue-300' : ''
        }`;
      case 'main':
        return `${baseStyles} bg-green-500 text-white font-semibold ${
          selected ? 'ring-4 ring-green-300' : ''
        }`;
      default:
        return `${baseStyles} bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 ${
          selected ? 'ring-4 ring-gray-300 dark:ring-gray-500' : ''
        }`;
    }
  };

  const customColor = data.color;
  const nodeStyles = customColor 
    ? `px-4 py-2 transition-all duration-200 cursor-pointer select-none ${
        selected ? 'ring-4 ring-opacity-50' : ''
      }`
    : getNodeStyles();

  const style = customColor ? { 
    backgroundColor: customColor, 
    color: ['#fbbf24', '#facc15', '#eab308'].includes(customColor) ? '#000' : '#fff',
    borderColor: customColor
  } : {};

  // Hexagon path
  const hexagonPath = "M 25 0 L 75 0 L 100 50 L 75 100 L 25 100 L 0 50 Z";

  return (
    <div 
      className={nodeStyles}
      style={style}
      onDoubleClick={handleDoubleClick}
    >
      <svg width="100" height="100" viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id={`hex-gradient-${data.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={customColor || '#3b82f6'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={customColor || '#1d4ed8'} stopOpacity="1" />
          </linearGradient>
        </defs>
        
        <path
          d={hexagonPath}
          fill={customColor || `url(#hex-gradient-${data.id})`}
          stroke={selected ? '#3b82f6' : '#1e40af'}
          strokeWidth={selected ? 3 : 2}
          className="transition-all duration-200"
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
                  onBlur={handleSubmit}
                  className="w-full bg-transparent border-none outline-none text-center text-inherit font-inherit text-sm"
                  style={{ color: 'inherit', fontWeight: 'inherit' }}
                />
              </form>
            ) : (
              <div className="text-center text-sm font-medium text-white truncate">
                {data.label}
              </div>
            )}
          </div>
        </foreignObject>
      </svg>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400"
      />
      
      <Handle
        type="source"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400"
      />
    </div>
  );
};

export default HexagonNode; 