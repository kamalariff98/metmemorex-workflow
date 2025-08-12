'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const edgeTypes = [
  'default',
  'animated', 
  'straight',
  'dashed',
  'thick',
  'step',
  'smoothstep',
  'crowsfoot'
];

export const BasicEdgeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('default');

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle clicked, current isOpen:', isOpen);
    setIsOpen(!isOpen);
  };

  const selectOption = (type: string) => {
    console.log('Selected:', type);
    setSelected(type);
    setIsOpen(false);
  };

  console.log('BasicEdgeSelector render - isOpen:', isOpen, 'selected:', selected);

  return (
    <div className="relative" style={{ zIndex: 10000 }}>
      <button
        onClick={toggleDropdown}
        className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 flex items-center gap-2 hover:bg-gray-700"
        style={{ minWidth: '120px' }}
      >
        <span>{selected}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full left-0 mb-1 bg-gray-800 border border-gray-600 rounded shadow-lg"
          style={{ 
            zIndex: 10001,
            minWidth: '120px',
            maxHeight: '200px',
            overflow: 'auto'
          }}
        >
          {edgeTypes.map((type) => (
            <button
              key={type}
              onClick={() => selectOption(type)}
              className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-700 ${
                selected === type ? 'bg-gray-700' : ''
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Debug info */}
      <div className="absolute top-full left-0 text-xs text-gray-400 mt-1">
        Debug: {isOpen ? 'OPEN' : 'CLOSED'} | Selected: {selected}
      </div>
    </div>
  );
};

export default BasicEdgeSelector;
