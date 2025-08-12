'use client';

import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { ChevronDown, Zap, ArrowRight, Minus, Circle, Square, RotateCcw, TrendingUp } from 'lucide-react';

export type EdgeType = 'animated' | 'crowsfoot' | 'dashed' | 'thick' | 'step' | 'default' | 'straight' | 'smoothstep';

interface EdgeTypeOption {
  type: EdgeType;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const edgeTypeOptions: EdgeTypeOption[] = [
  {
    type: 'animated',
    label: 'Animated',
    icon: <Zap size={16} />,
    description: 'Flowing animation with glow effect',
    color: 'text-green-400'
  },
  {
    type: 'default',
    label: 'Default',
    icon: <TrendingUp size={16} />,
    description: 'Standard bezier curve',
    color: 'text-blue-400'
  },
  {
    type: 'straight',
    label: 'Straight',
    icon: <ArrowRight size={16} />,
    description: 'Direct line connection',
    color: 'text-gray-400'
  },
  {
    type: 'smoothstep',
    label: 'Smooth Step',
    icon: <RotateCcw size={16} />,
    description: 'Smooth right-angle turns',
    color: 'text-purple-400'
  },
  {
    type: 'step',
    label: 'Step',
    icon: <Square size={16} />,
    description: 'Sharp right-angle connections',
    color: 'text-orange-400'
  },
  {
    type: 'dashed',
    label: 'Dashed',
    icon: <Minus size={16} />,
    description: 'Dotted line style',
    color: 'text-yellow-400'
  },
  {
    type: 'thick',
    label: 'Thick',
    icon: <Circle size={16} />,
    description: 'Bold stroke edges',
    color: 'text-red-400'
  },
  {
    type: 'crowsfoot',
    label: 'Crowsfoot',
    icon: <span className="text-xs">⟨⟩</span>,
    description: 'Database relationship style',
    color: 'text-cyan-400'
  }
];

interface EdgeTypeSelectorProps {
  selectedEdgeId?: string;
  onEdgeTypeChange?: (edgeId: string, newType: EdgeType) => void;
  className?: string;
}

export const EdgeTypeSelector: React.FC<EdgeTypeSelectorProps> = ({
  selectedEdgeId,
  onEdgeTypeChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentType, setCurrentType] = useState<EdgeType>('default');
  const { getEdges, setEdges } = useReactFlow();

  const handleTypeChange = (newType: EdgeType) => {
    if (selectedEdgeId) {
      // Update specific edge
      const edges = getEdges();
      const updatedEdges = edges.map(edge => 
        edge.id === selectedEdgeId 
          ? { ...edge, type: newType }
          : edge
      );
      setEdges(updatedEdges);
      onEdgeTypeChange?.(selectedEdgeId, newType);
    } else {
      // Set default type for new edges
      setCurrentType(newType);
    }
    setIsOpen(false);
  };

  const currentOption = edgeTypeOptions.find(option => option.type === currentType) || edgeTypeOptions[1];

  console.log('EdgeTypeSelector rendering, isOpen:', isOpen);
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => {
          console.log('EdgeTypeSelector clicked, isOpen:', isOpen);
          setIsOpen(!isOpen);
        }}
        className="glass-button flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:scale-105 transition-all duration-300 text-xs"
        title="Select edge type"
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

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown - positioned above toolbar */}
          <div className="absolute bottom-full left-0 mb-2 z-[110] min-w-[280px] glass-panel rounded-xl border border-white/20 shadow-2xl bg-gray-900/95 backdrop-blur-sm">
            <div className="p-2">
              <div className="text-white/60 text-xs font-medium px-3 py-2 border-b border-white/10 mb-2">
                Select Edge Type
              </div>
              
              {edgeTypeOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleTypeChange(option.type)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group ${
                    currentType === option.type ? 'bg-white/15 ring-1 ring-white/20' : ''
                  }`}
                >
                  <span className={`${option.color} group-hover:scale-110 transition-transform duration-200`}>
                    {option.icon}
                  </span>
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-medium">
                      {option.label}
                    </div>
                    <div className="text-white/60 text-xs">
                      {option.description}
                    </div>
                  </div>
                  {currentType === option.type && (
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EdgeTypeSelector;
