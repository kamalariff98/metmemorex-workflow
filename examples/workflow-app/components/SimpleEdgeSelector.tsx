'use client';

import React, { useState } from 'react';
import { ChevronDown, Zap, ArrowRight, Minus, Circle, Square, RotateCcw, TrendingUp } from 'lucide-react';

const edgeOptions = [
  { type: 'default', label: 'Default', icon: <TrendingUp size={16} />, color: 'text-blue-400' },
  { type: 'animated', label: 'Animated', icon: <Zap size={16} />, color: 'text-green-400' },
  { type: 'straight', label: 'Straight', icon: <ArrowRight size={16} />, color: 'text-gray-400' },
  { type: 'dashed', label: 'Dashed', icon: <Minus size={16} />, color: 'text-yellow-400' },
  { type: 'thick', label: 'Thick', icon: <Circle size={16} />, color: 'text-red-400' },
  { type: 'step', label: 'Step', icon: <Square size={16} />, color: 'text-orange-400' },
];

export const SimpleEdgeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  console.log('SimpleEdgeSelector render - isOpen:', isOpen);

  return (
    <div className="relative">
      <button
        onClick={() => {
          console.log('Button clicked! Current isOpen:', isOpen);
          setIsOpen(!isOpen);
        }}
        className="glass-button flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white border border-white/20"
      >
        <span className={edgeOptions[selected].color}>
          {edgeOptions[selected].icon}
        </span>
        <span>{edgeOptions[selected].label}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full left-0 mb-2 w-60 bg-gray-800 border border-white/20 rounded-lg shadow-xl z-[200]"
          style={{ zIndex: 200 }}
        >
          <div className="p-2">
            <div className="text-white/60 text-xs mb-2 px-2">Select Edge Type</div>
            {edgeOptions.map((option, index) => (
              <button
                key={option.type}
                onClick={() => {
                  console.log('Option clicked:', option.label);
                  setSelected(index);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 text-left ${
                  selected === index ? 'bg-white/20' : ''
                }`}
              >
                <span className={option.color}>{option.icon}</span>
                <span className="text-white">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Debug info */}
      <div className="absolute top-full left-0 mt-1 text-xs text-white/50">
        Debug: isOpen={isOpen.toString()}
      </div>
    </div>
  );
};

export default SimpleEdgeSelector;
