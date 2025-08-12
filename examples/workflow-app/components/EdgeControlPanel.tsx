'use client';

import React, { useState, useEffect } from 'react';
import { useReactFlow, type Edge } from '@xyflow/react';
import { Settings, Palette, Width, Eye, EyeOff, Trash2, Copy } from 'lucide-react';
import { EdgeTypeSelector, type EdgeType } from './EdgeTypeSelector';

interface EdgeControlPanelProps {
  selectedEdge?: Edge | null;
  className?: string;
}

export const EdgeControlPanel: React.FC<EdgeControlPanelProps> = ({
  selectedEdge,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [edgeColor, setEdgeColor] = useState('#6b7280');
  const [edgeWidth, setEdgeWidth] = useState(2);
  const [edgeOpacity, setEdgeOpacity] = useState(1);
  const [isDashed, setIsDashed] = useState(false);
  const [dashPattern, setDashPattern] = useState('5,5');
  
  const { getEdges, setEdges, deleteElements } = useReactFlow();

  // Update local state when selected edge changes
  useEffect(() => {
    if (selectedEdge) {
      const style = selectedEdge.style || {};
      setEdgeColor(style.stroke || '#6b7280');
      setEdgeWidth(style.strokeWidth || 2);
      setEdgeOpacity(style.opacity || 1);
      setIsDashed(!!style.strokeDasharray);
      setDashPattern(style.strokeDasharray || '5,5');
    }
  }, [selectedEdge]);

  const updateEdgeStyle = (updates: Record<string, any>) => {
    if (!selectedEdge) return;

    const edges = getEdges();
    const updatedEdges = edges.map(edge =>
      edge.id === selectedEdge.id
        ? {
            ...edge,
            style: {
              ...edge.style,
              ...updates
            }
          }
        : edge
    );
    setEdges(updatedEdges);
  };

  const handleColorChange = (color: string) => {
    setEdgeColor(color);
    updateEdgeStyle({ stroke: color });
  };

  const handleWidthChange = (width: number) => {
    setEdgeWidth(width);
    updateEdgeStyle({ strokeWidth: width });
  };

  const handleOpacityChange = (opacity: number) => {
    setEdgeOpacity(opacity);
    updateEdgeStyle({ opacity });
  };

  const handleDashToggle = () => {
    const newIsDashed = !isDashed;
    setIsDashed(newIsDashed);
    updateEdgeStyle({ 
      strokeDasharray: newIsDashed ? dashPattern : undefined 
    });
  };

  const handleDashPatternChange = (pattern: string) => {
    setDashPattern(pattern);
    if (isDashed) {
      updateEdgeStyle({ strokeDasharray: pattern });
    }
  };

  const duplicateEdge = () => {
    if (!selectedEdge) return;

    const edges = getEdges();
    const newEdge: Edge = {
      ...selectedEdge,
      id: `${selectedEdge.id}-copy-${Date.now()}`,
      source: selectedEdge.source,
      target: selectedEdge.target,
    };
    setEdges([...edges, newEdge]);
  };

  const deleteEdge = () => {
    if (!selectedEdge) return;
    deleteElements({ edges: [selectedEdge] });
  };

  const presetColors = [
    '#6b7280', '#ef4444', '#f97316', '#eab308', 
    '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', 
    '#ec4899', '#f43f5e'
  ];

  const presetWidths = [1, 2, 3, 4, 6, 8];
  const presetDashPatterns = ['5,5', '10,5', '15,10', '20,5', '3,3'];

  if (!selectedEdge) {
    return (
      <div className={`glass-panel rounded-xl p-4 ${className}`}>
        <div className="flex items-center gap-2 text-white/60">
          <Settings size={16} />
          <span className="text-sm">Select an edge to customize</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-panel rounded-xl ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings size={16} className="text-white" />
            <span className="text-white font-medium">Edge Controls</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={duplicateEdge}
              className="glass-button p-2 rounded-lg hover:scale-105 transition-all duration-200"
              title="Duplicate edge"
            >
              <Copy size={14} className="text-white" />
            </button>
            <button
              onClick={deleteEdge}
              className="glass-button p-2 rounded-lg hover:scale-105 transition-all duration-200 hover:bg-red-500/20"
              title="Delete edge"
            >
              <Trash2 size={14} className="text-red-400" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Edge Type Selector */}
          <div>
            <label className="text-white/80 text-sm font-medium mb-2 block">
              Edge Type
            </label>
            <EdgeTypeSelector
              selectedEdgeId={selectedEdge.id}
              className="w-full"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-white/80 text-sm font-medium mb-2 block flex items-center gap-2">
              <Palette size={14} />
              Color
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="color"
                value={edgeColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={edgeColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="flex-1 glass-button px-3 py-1 rounded-lg text-white text-sm"
                placeholder="#6b7280"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                    edgeColor === color ? 'border-white' : 'border-white/20'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Width Control */}
          <div>
            <label className="text-white/80 text-sm font-medium mb-2 block flex items-center gap-2">
              <Width size={14} />
              Width: {edgeWidth}px
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={edgeWidth}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              className="w-full mb-2"
            />
            <div className="flex gap-2">
              {presetWidths.map((width) => (
                <button
                  key={width}
                  onClick={() => handleWidthChange(width)}
                  className={`glass-button px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                    edgeWidth === width ? 'bg-white/20' : ''
                  }`}
                >
                  {width}px
                </button>
              ))}
            </div>
          </div>

          {/* Opacity Control */}
          <div>
            <label className="text-white/80 text-sm font-medium mb-2 block flex items-center gap-2">
              {edgeOpacity < 0.5 ? <EyeOff size={14} /> : <Eye size={14} />}
              Opacity: {Math.round(edgeOpacity * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={edgeOpacity}
              onChange={(e) => handleOpacityChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Dash Pattern */}
          <div>
            <label className="text-white/80 text-sm font-medium mb-2 block">
              Dash Pattern
            </label>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={handleDashToggle}
                className={`glass-button px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                  isDashed ? 'bg-white/20' : ''
                }`}
              >
                {isDashed ? 'Dashed' : 'Solid'}
              </button>
              {isDashed && (
                <input
                  type="text"
                  value={dashPattern}
                  onChange={(e) => handleDashPatternChange(e.target.value)}
                  className="flex-1 glass-button px-3 py-1 rounded-lg text-white text-sm"
                  placeholder="5,5"
                />
              )}
            </div>
            {isDashed && (
              <div className="flex gap-2 flex-wrap">
                {presetDashPatterns.map((pattern) => (
                  <button
                    key={pattern}
                    onClick={() => handleDashPatternChange(pattern)}
                    className={`glass-button px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                      dashPattern === pattern ? 'bg-white/20' : ''
                    }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeControlPanel;
