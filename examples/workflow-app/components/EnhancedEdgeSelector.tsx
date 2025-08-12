'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type EnhancedEdgeType = 
  | 'main-point'      // Thick, solid line for main points
  | 'sub-point'       // Thin, dashed line for sub points
  | 'hierarchy'       // Step line showing hierarchy
  | 'dependency'      // Animated line for dependencies
  | 'flow'            // Smooth curved line for general flow
  | 'feedback'        // Dotted line for feedback loops
  | 'default'         // Standard connection
  | 'straight';       // Direct straight line

const EnhancedEdgeContext = createContext<{
  currentEdgeType: EnhancedEdgeType;
  setEdgeType: (type: EnhancedEdgeType) => void;
  getEdgeStyle: (type: EnhancedEdgeType) => any;
} | undefined>(undefined);

export const EnhancedEdgeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentEdgeType, setCurrentEdgeType] = useState<EnhancedEdgeType>('default');

  const getEdgeStyle = (type: EnhancedEdgeType) => {
    switch (type) {
      case 'main-point':
        return {
          strokeWidth: 3,
          stroke: '#3b82f6', // Blue
          strokeDasharray: 'none',
          markerEnd: { type: 'arrowclosed', color: '#3b82f6' },
          animation: 'animated 1.5s linear infinite'
        };
      case 'sub-point':
        return {
          strokeWidth: 1,
          stroke: '#6b7280', // Gray
          strokeDasharray: '5,5',
          markerEnd: { type: 'arrow', color: '#6b7280' }
        };
      case 'hierarchy':
        return {
          strokeWidth: 2,
          stroke: '#10b981', // Green
          strokeDasharray: 'none',
          markerEnd: { type: 'arrowclosed', color: '#10b981' }
        };
      case 'dependency':
        return {
          strokeWidth: 2,
          stroke: '#f59e0b', // Orange
          strokeDasharray: 'none',
          markerEnd: { type: 'arrowclosed', color: '#f59e0b' },
          animation: 'breathing 2s ease-in-out infinite'
        };
      case 'flow':
        return {
          strokeWidth: 2,
          stroke: '#8b5cf6', // Purple
          strokeDasharray: 'none',
          markerEnd: { type: 'arrowclosed', color: '#8b5cf6' },
          animation: 'glowing 3s ease-in-out infinite',
          filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
        };
      case 'feedback':
        return {
          strokeWidth: 1.5,
          stroke: '#ef4444', // Red
          strokeDasharray: '3,3',
          markerEnd: { type: 'arrow', color: '#ef4444' }
        };
      default:
        return {
          strokeWidth: 2,
          stroke: '#ffffff', // White
          strokeDasharray: 'none',
          markerEnd: { type: 'arrowclosed', color: '#ffffff' }
        };
    }
  };

  const setEdgeType = (type: EnhancedEdgeType) => {
    setCurrentEdgeType(type);
  };

  return (
    <EnhancedEdgeContext.Provider value={{ currentEdgeType, setEdgeType, getEdgeStyle }}>
      {children}
    </EnhancedEdgeContext.Provider>
  );
};

export const useEnhancedEdge = () => {
  const context = useContext(EnhancedEdgeContext);
  if (context === undefined) {
    throw new Error('useEnhancedEdge must be used within an EnhancedEdgeProvider');
  }
  return context;
};

const edgeTypeOptions: { type: EnhancedEdgeType; label: string; description: string }[] = [
  { type: 'main-point', label: 'Main Point', description: 'Primary connection (thick blue)' },
  { type: 'sub-point', label: 'Sub Point', description: 'Secondary connection (thin dashed)' },
  { type: 'hierarchy', label: 'Hierarchy', description: 'Organizational structure (green)' },
  { type: 'dependency', label: 'Dependency', description: 'Required relationship (orange)' },
  { type: 'flow', label: 'Flow', description: 'General process flow (purple)' },
  { type: 'feedback', label: 'Feedback', description: 'Feedback loop (red dotted)' },
  { type: 'default', label: 'Default', description: 'Standard connection (white)' },
  { type: 'straight', label: 'Straight', description: 'Direct connection (white)' },
];

export const EnhancedEdgeSelector: React.FC = () => {
  const { setEdgeType } = useEnhancedEdge();

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as EnhancedEdgeType;
    setEdgeType(newType);
    console.log('Selected enhanced edge type:', newType);
  };

  return (
    <div className="flex items-center gap-2 text-white text-xs">
      <label htmlFor="enhanced-edge-select" className="font-medium">Edge Type:</label>
      <select
        id="enhanced-edge-select"
        onChange={handleTypeChange}
        defaultValue="default"
        className="bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-white focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer min-w-[120px]"
      >
        {edgeTypeOptions.map((option) => (
          <option key={option.type} value={option.type} title={option.description}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
