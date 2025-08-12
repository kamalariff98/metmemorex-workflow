'use client';

import React from 'react';
import { useReactFlow } from '@xyflow/react';
import { Palette, Zap, ArrowRight, Minus, Circle, Square, RotateCcw, TrendingUp, Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import { type EdgeType } from './EdgeTypeSelector';

interface EdgeQuickActionsProps {
  className?: string;
}

export const EdgeQuickActions: React.FC<EdgeQuickActionsProps> = ({
  className = ''
}) => {
  const { getEdges, setEdges, deleteElements } = useReactFlow();

  const applyToAllEdges = (updates: { type?: EdgeType; style?: Record<string, any> }) => {
    const edges = getEdges();
    const updatedEdges = edges.map(edge => ({
      ...edge,
      ...(updates.type && { type: updates.type }),
      ...(updates.style && { 
        style: {
          ...edge.style,
          ...updates.style
        }
      })
    }));
    setEdges(updatedEdges);
  };

  const quickActions = [
    {
      id: 'animated-green',
      label: 'Data Flow',
      icon: <Zap size={14} />,
      color: 'text-green-400',
      action: () => applyToAllEdges({
        type: 'animated',
        style: { stroke: '#10b981', strokeWidth: 2, opacity: 0.9 }
      })
    },
    {
      id: 'straight-blue',
      label: 'Control',
      icon: <ArrowRight size={14} />,
      color: 'text-blue-400',
      action: () => applyToAllEdges({
        type: 'straight',
        style: { stroke: '#3b82f6', strokeWidth: 2, opacity: 1 }
      })
    },
    {
      id: 'dashed-red',
      label: 'Error',
      icon: <Minus size={14} />,
      color: 'text-red-400',
      action: () => applyToAllEdges({
        type: 'dashed',
        style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '8,4', opacity: 0.8 }
      })
    },
    {
      id: 'thick-yellow',
      label: 'Primary',
      icon: <Circle size={14} />,
      color: 'text-yellow-400',
      action: () => applyToAllEdges({
        type: 'thick',
        style: { stroke: '#f59e0b', strokeWidth: 4, opacity: 1 }
      })
    },
    {
      id: 'step-cyan',
      label: 'Logic',
      icon: <Square size={14} />,
      color: 'text-cyan-400',
      action: () => applyToAllEdges({
        type: 'step',
        style: { stroke: '#06b6d4', strokeWidth: 2, opacity: 0.9 }
      })
    },
    {
      id: 'smooth-pink',
      label: 'Smooth',
      icon: <RotateCcw size={14} />,
      color: 'text-pink-400',
      action: () => applyToAllEdges({
        type: 'smoothstep',
        style: { stroke: '#ec4899', strokeWidth: 2, opacity: 0.85 }
      })
    }
  ];

  const utilityActions = [
    {
      id: 'hide-all',
      label: 'Hide All',
      icon: <EyeOff size={14} />,
      color: 'text-gray-400',
      action: () => applyToAllEdges({
        style: { opacity: 0.1 }
      })
    },
    {
      id: 'show-all',
      label: 'Show All',
      icon: <Eye size={14} />,
      color: 'text-white',
      action: () => applyToAllEdges({
        style: { opacity: 1 }
      })
    },
    {
      id: 'delete-all',
      label: 'Delete All',
      icon: <Trash2 size={14} />,
      color: 'text-red-500',
      action: () => {
        const edges = getEdges();
        deleteElements({ edges });
      }
    }
  ];

  return (
    <div className={`glass-panel rounded-xl p-3 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Palette size={16} className="text-white" />
        <span className="text-white font-medium text-sm">Quick Edge Actions</span>
      </div>

      {/* Style Quick Actions */}
      <div className="space-y-2 mb-4">
        <div className="text-white/60 text-xs font-medium mb-2">Apply to All Edges</div>
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="glass-button rounded-lg p-2 hover:scale-105 transition-all duration-300 group flex flex-col items-center gap-1"
              title={`Apply ${action.label} style to all edges`}
            >
              <span className={`${action.color} group-hover:scale-110 transition-transform duration-200`}>
                {action.icon}
              </span>
              <span className="text-white text-xs font-medium">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Utility Actions */}
      <div className="border-t border-white/10 pt-3">
        <div className="text-white/60 text-xs font-medium mb-2">Utilities</div>
        <div className="flex gap-2">
          {utilityActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="glass-button rounded-lg px-3 py-2 hover:scale-105 transition-all duration-300 group flex items-center gap-2 flex-1"
              title={action.label}
            >
              <span className={`${action.color} group-hover:scale-110 transition-transform duration-200`}>
                {action.icon}
              </span>
              <span className="text-white text-xs font-medium">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EdgeQuickActions;
