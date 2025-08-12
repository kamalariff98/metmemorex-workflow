'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useReactFlow } from '@xyflow/react';
import { ChevronDown, Zap, ArrowRight, Minus, Circle, Square, RotateCcw, TrendingUp, Database } from 'lucide-react';

export type EdgeType = 'animated' | 'crowsfoot' | 'dashed' | 'thick' | 'step' | 'default' | 'straight' | 'smoothstep';

interface EdgeOption {
  type: EdgeType;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const edgeOptions: EdgeOption[] = [
  {
    type: 'default',
    label: 'Default',
    icon: <TrendingUp size={14} />,
    description: 'Standard bezier curve',
    color: 'text-blue-400'
  },
  {
    type: 'animated',
    label: 'Animated',
    icon: <Zap size={14} />,
    description: 'Flowing animation with glow',
    color: 'text-green-400'
  },
  {
    type: 'straight',
    label: 'Straight',
    icon: <ArrowRight size={14} />,
    description: 'Direct line connection',
    color: 'text-gray-400'
  },
  {
    type: 'dashed',
    label: 'Dashed',
    icon: <Minus size={14} />,
    description: 'Dotted line style',
    color: 'text-yellow-400'
  },
  {
    type: 'thick',
    label: 'Thick',
    icon: <Circle size={14} />,
    description: 'Bold stroke edges',
    color: 'text-red-400'
  },
  {
    type: 'step',
    label: 'Step',
    icon: <Square size={14} />,
    description: 'Right-angle connections',
    color: 'text-orange-400'
  },
  {
    type: 'smoothstep',
    label: 'Smooth Step',
    icon: <RotateCcw size={14} />,
    description: 'Smooth right angles',
    color: 'text-purple-400'
  },
  {
    type: 'crowsfoot',
    label: 'Crowsfoot',
    icon: <Database size={14} />,
    description: 'Database relationship',
    color: 'text-cyan-400'
  }
];

interface EdgeDropdownProps {
  className?: string;
}

export const EdgeDropdown: React.FC<EdgeDropdownProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getEdges, setEdges } = useReactFlow();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const currentOption = edgeOptions[selectedIndex];

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
    
    // Apply to new edges by setting a global default
    const newType = edgeOptions[index].type;
    console.log('Selected edge type:', newType);
    
    // You could also apply to existing edges if desired
    // const edges = getEdges();
    // const updatedEdges = edges.map(edge => ({ ...edge, type: newType }));
    // setEdges(updatedEdges);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('EdgeDropdown button clicked');
          setIsOpen(!isOpen);
        }}
        className="glass-button flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:scale-105 transition-all duration-200 border border-white/20 bg-white/5 backdrop-blur-sm"
        type="button"
      >
        <span className={currentOption.color}>
          {currentOption.icon}
        </span>
        <span className="text-white font-medium">
          {currentOption.label}
        </span>
        <ChevronDown 
          size={12} 
          className={`text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-72 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl overflow-hidden z-[9999]">
          <div className="p-2">
            <div className="text-white/60 text-xs font-medium px-3 py-2 border-b border-white/10 mb-2">
              Select Edge Type
            </div>
            
            {edgeOptions.map((option, index) => (
              <button
                key={option.type}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Selected option:', option.label);
                  handleSelect(index);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-left ${
                  selectedIndex === index ? 'bg-white/15 ring-1 ring-white/20' : ''
                }`}
                type="button"
              >
                <span className={`${option.color} flex-shrink-0`}>
                  {option.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">
                    {option.label}
                  </div>
                  <div className="text-white/60 text-xs truncate">
                    {option.description}
                  </div>
                </div>
                {selectedIndex === index && (
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Debug indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute -bottom-6 left-0 text-xs text-white/50">
          {isOpen ? 'OPEN' : 'CLOSED'}
        </div>
      )}
    </div>
  );
};

export default EdgeDropdown;
