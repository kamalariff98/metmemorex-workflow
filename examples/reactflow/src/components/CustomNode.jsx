import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, selected }) => {
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
    const baseStyles = 'px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer select-none';
    
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
    ? `px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer select-none ${
        selected ? 'ring-4 ring-opacity-50' : ''
      }`
    : getNodeStyles();

  const style = customColor ? { 
    backgroundColor: customColor, 
    color: ['#fbbf24', '#facc15', '#eab308'].includes(customColor) ? '#000' : '#fff',
    borderColor: customColor
  } : {};

  return (
    <div 
      className={nodeStyles}
      style={style}
      onDoubleClick={handleDoubleClick}
    >
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
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="inline">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            className="bg-transparent border-none outline-none text-inherit font-inherit w-full min-w-[80px]"
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
          />
        </form>
      ) : (
        <div className="whitespace-nowrap">{data.label}</div>
      )}
      
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

export default CustomNode;