'use client';

import React from 'react';
import { EnhancedEdgeType } from '../types';
import { useEnhancedEdge } from './EnhancedEdgeProvider';

const edgeTypeOptions: { type: EnhancedEdgeType; label: string; description: string }[] = [
  { type: 'default', label: 'Default', description: 'Standard connection' },
  { type: 'straight', label: 'Straight', description: 'Direct straight line' },
  { type: 'step', label: 'Step', description: 'Step connection' },
  { type: 'smoothstep', label: 'Smooth Step', description: 'Smooth step connection' },
  { type: 'animated', label: 'Animated', description: 'Animated dashed line' },
  { type: 'crowsfoot', label: 'Crowsfoot', description: 'Database-style connection' },
  { type: 'dashed', label: 'Dashed', description: 'Dashed line' },
  { type: 'thick', label: 'Thick', description: 'Thick solid line' },
  { type: 'main-point', label: 'Main Point', description: 'Primary connection (animated)' },
  { type: 'sub-point', label: 'Sub Point', description: 'Secondary connection (dashed)' },
  { type: 'hierarchy', label: 'Hierarchy', description: 'Organizational structure' },
  { type: 'dependency', label: 'Dependency', description: 'Required relationship (breathing)' },
  { type: 'flow', label: 'Flow', description: 'General process flow (glowing)' },
  { type: 'feedback', label: 'Feedback', description: 'Feedback loop (dotted)' },
];

export interface EnhancedEdgeSelectorProps {
  className?: string;
  label?: string;
  showLabel?: boolean;
}

export const EnhancedEdgeSelector: React.FC<EnhancedEdgeSelectorProps> = ({
  className = '',
  label = 'Edge Type:',
  showLabel = true,
}) => {
  const { currentEdgeType, setCurrentEdgeType } = useEnhancedEdge();

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as EnhancedEdgeType;
    setCurrentEdgeType(newType);
  };

  return (
    <div className={`flex items-center gap-2 text-white text-xs ${className}`}>
      {showLabel && (
        <label htmlFor="enhanced-edge-select" className="font-medium">
          {label}
        </label>
      )}
      <select
        id="enhanced-edge-select"
        value={currentEdgeType}
        onChange={handleTypeChange}
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
