'use client';

import React from 'react';
import { Square } from 'lucide-react';
import { ToolsWidgetProps } from '../types';
import { EnhancedEdgeSelector } from './EnhancedEdgeSelector';

export const ToolsWidget: React.FC<ToolsWidgetProps> = ({
  onAddRectangle,
  onEdgeTypeChange,
  className = '',
}) => {
  return (
    <div className={`glass-panel rounded-2xl p-3 flex items-center gap-2 text-white shadow-2xl max-w-[95vw] overflow-x-auto ${className}`}>
      {/* Shape Tools */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onAddRectangle}
          className="glass-button rounded-lg p-2 hover:scale-105 transition-all duration-300 group"
          title="Add Rectangle"
        >
          <Square size={16} className="group-hover:text-blue-300" />
        </button>
      </div>

      <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0" />

      {/* Edge Type Selector */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <EnhancedEdgeSelector />
      </div>
    </div>
  );
};

// Default styles for the glass effect - users can override or provide their own CSS
export const defaultStyles = `
  .glass-panel {
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .glass-button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .glass-button:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;
