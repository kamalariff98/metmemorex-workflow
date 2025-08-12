'use client';

import React from 'react';
import { useReactFlow, type Edge } from '@xyflow/react';
import { Zap, Database, ArrowRight, Minus, Circle, Square, TrendingUp, RotateCcw } from 'lucide-react';
import { type EdgeType } from './EdgeTypeSelector';

interface EdgeStylePreset {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: EdgeType;
  style: Record<string, any>;
  description: string;
  color: string;
}

const edgeStylePresets: EdgeStylePreset[] = [
  {
    id: 'data-flow',
    name: 'Data Flow',
    icon: <TrendingUp size={16} />,
    type: 'animated',
    style: {
      stroke: '#10b981',
      strokeWidth: 3,
      opacity: 0.9
    },
    description: 'Animated flow for data processing',
    color: 'text-green-400'
  },
  {
    id: 'error-path',
    name: 'Error Path',
    icon: <Zap size={16} />,
    type: 'dashed',
    style: {
      stroke: '#ef4444',
      strokeWidth: 2,
      strokeDasharray: '8,4',
      opacity: 0.8
    },
    description: 'Dashed red line for error handling',
    color: 'text-red-400'
  },
  {
    id: 'control-flow',
    name: 'Control Flow',
    icon: <ArrowRight size={16} />,
    type: 'straight',
    style: {
      stroke: '#3b82f6',
      strokeWidth: 2,
      opacity: 1
    },
    description: 'Direct control connections',
    color: 'text-blue-400'
  },
  {
    id: 'database-relation',
    name: 'Database',
    icon: <Database size={16} />,
    type: 'crowsfoot',
    style: {
      stroke: '#8b5cf6',
      strokeWidth: 2,
      opacity: 0.9
    },
    description: 'Database relationship style',
    color: 'text-purple-400'
  },
  {
    id: 'thick-primary',
    name: 'Primary',
    icon: <Circle size={16} />,
    type: 'thick',
    style: {
      stroke: '#f59e0b',
      strokeWidth: 5,
      opacity: 1
    },
    description: 'Thick line for main connections',
    color: 'text-yellow-400'
  },
  {
    id: 'step-logic',
    name: 'Logic Step',
    icon: <Square size={16} />,
    type: 'step',
    style: {
      stroke: '#06b6d4',
      strokeWidth: 2,
      opacity: 0.9
    },
    description: 'Step-by-step logic flow',
    color: 'text-cyan-400'
  },
  {
    id: 'smooth-flow',
    name: 'Smooth Flow',
    icon: <RotateCcw size={16} />,
    type: 'smoothstep',
    style: {
      stroke: '#ec4899',
      strokeWidth: 2,
      opacity: 0.85
    },
    description: 'Smooth curved connections',
    color: 'text-pink-400'
  },
  {
    id: 'subtle-link',
    name: 'Subtle Link',
    icon: <Minus size={16} />,
    type: 'default',
    style: {
      stroke: '#6b7280',
      strokeWidth: 1,
      opacity: 0.6,
      strokeDasharray: '3,3'
    },
    description: 'Subtle dotted connections',
    color: 'text-gray-400'
  }
];

interface EdgeStylePresetsProps {
  selectedEdge?: Edge | null;
  className?: string;
}

export const EdgeStylePresets: React.FC<EdgeStylePresetsProps> = ({
  selectedEdge,
  className = ''
}) => {
  const { getEdges, setEdges } = useReactFlow();

  const applyPreset = (preset: EdgeStylePreset) => {
    if (!selectedEdge) return;

    const edges = getEdges();
    const updatedEdges = edges.map(edge =>
      edge.id === selectedEdge.id
        ? {
            ...edge,
            type: preset.type,
            style: {
              ...edge.style,
              ...preset.style
            }
          }
        : edge
    );
    setEdges(updatedEdges);
  };

  const applyPresetToAll = (preset: EdgeStylePreset) => {
    const edges = getEdges();
    const updatedEdges = edges.map(edge => ({
      ...edge,
      type: preset.type,
      style: {
        ...edge.style,
        ...preset.style
      }
    }));
    setEdges(updatedEdges);
  };

  return (
    <div className={`glass-panel rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium flex items-center gap-2">
          <Zap size={16} />
          Edge Style Presets
        </h3>
        {selectedEdge && (
          <span className="text-white/60 text-xs">
            Selected: {selectedEdge.id}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {edgeStylePresets.map((preset) => (
          <div key={preset.id} className="space-y-2">
            <button
              onClick={() => selectedEdge ? applyPreset(preset) : applyPresetToAll(preset)}
              className="w-full glass-button rounded-lg p-3 hover:scale-105 transition-all duration-300 group"
              title={`${preset.description} - ${selectedEdge ? 'Apply to selected edge' : 'Apply to all edges'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`${preset.color} group-hover:scale-110 transition-transform duration-200`}>
                  {preset.icon}
                </span>
                <span className="text-white text-sm font-medium">
                  {preset.name}
                </span>
              </div>
              
              {/* Preview Line */}
              <div className="w-full h-8 flex items-center justify-center">
                <svg width="60" height="20" className="overflow-visible">
                  <path
                    d="M 5 10 Q 30 5 55 10"
                    fill="none"
                    stroke={preset.style.stroke}
                    strokeWidth={Math.min(preset.style.strokeWidth || 2, 3)}
                    strokeDasharray={preset.style.strokeDasharray}
                    opacity={preset.style.opacity || 1}
                    className="transition-all duration-200"
                  />
                  <circle cx="5" cy="10" r="2" fill={preset.style.stroke} opacity="0.7" />
                  <circle cx="55" cy="10" r="2" fill={preset.style.stroke} opacity="0.7" />
                </svg>
              </div>
              
              <div className="text-white/60 text-xs mt-1">
                {preset.description}
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-white/60 text-xs space-y-1">
          <div>• Click preset to apply to {selectedEdge ? 'selected edge' : 'all edges'}</div>
          <div>• Select an edge first for targeted styling</div>
          <div>• Presets combine type and visual styling</div>
        </div>
      </div>
    </div>
  );
};

export default EdgeStylePresets;
