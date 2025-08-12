'use client';

import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { Palette, Droplets, Brush, Sparkles } from 'lucide-react';

interface ColorPalette {
  name: string;
  colors: string[];
  icon: React.ReactNode;
}

const colorPalettes: ColorPalette[] = [
  {
    name: 'Default',
    icon: <Palette size={14} />,
    colors: ['#6b7280', '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6']
  },
  {
    name: 'Ocean',
    icon: <Droplets size={14} />,
    colors: ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#164e63', '#155e75', '#0f766e']
  },
  {
    name: 'Sunset',
    icon: <Brush size={14} />,
    colors: ['#f97316', '#ea580c', '#dc2626', '#b91c1c', '#991b1b', '#7c2d12', '#92400e', '#a16207']
  },
  {
    name: 'Neon',
    icon: <Sparkles size={14} />,
    colors: ['#10b981', '#06d6a0', '#00f5ff', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444', '#22c55e']
  }
];

const edgeWidths = [1, 2, 3, 4, 6, 8];
const opacityLevels = [0.3, 0.5, 0.7, 0.9, 1.0];

interface EdgeColorPaletteProps {
  className?: string;
}

export const EdgeColorPalette: React.FC<EdgeColorPaletteProps> = ({
  className = ''
}) => {
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedWidth, setSelectedWidth] = useState(2);
  const [selectedOpacity, setSelectedOpacity] = useState(1.0);
  const { getEdges, setEdges } = useReactFlow();

  const applyColorToAllEdges = (color: string) => {
    const edges = getEdges();
    const updatedEdges = edges.map(edge => ({
      ...edge,
      style: {
        ...edge.style,
        stroke: color,
        strokeWidth: selectedWidth,
        opacity: selectedOpacity
      }
    }));
    setEdges(updatedEdges);
  };

  const applyRandomColors = () => {
    const edges = getEdges();
    const palette = colorPalettes[selectedPalette];
    const updatedEdges = edges.map(edge => ({
      ...edge,
      style: {
        ...edge.style,
        stroke: palette.colors[Math.floor(Math.random() * palette.colors.length)],
        strokeWidth: selectedWidth,
        opacity: selectedOpacity
      }
    }));
    setEdges(updatedEdges);
  };

  const applyGradientColors = () => {
    const edges = getEdges();
    const palette = colorPalettes[selectedPalette];
    const updatedEdges = edges.map((edge, index) => ({
      ...edge,
      style: {
        ...edge.style,
        stroke: palette.colors[index % palette.colors.length],
        strokeWidth: selectedWidth,
        opacity: selectedOpacity
      }
    }));
    setEdges(updatedEdges);
  };

  return (
    <div className={`glass-panel rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Palette size={16} className="text-white" />
        <span className="text-white font-medium">Edge Color Palette</span>
      </div>

      {/* Palette Selection */}
      <div className="mb-4">
        <div className="text-white/60 text-xs font-medium mb-2">Color Theme</div>
        <div className="grid grid-cols-2 gap-2">
          {colorPalettes.map((palette, index) => (
            <button
              key={palette.name}
              onClick={() => setSelectedPalette(index)}
              className={`glass-button rounded-lg p-2 hover:scale-105 transition-all duration-300 group ${
                selectedPalette === index ? 'ring-2 ring-white/30' : ''
              }`}
              title={palette.name}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white group-hover:scale-110 transition-transform duration-200">
                  {palette.icon}
                </span>
                <span className="text-white text-xs font-medium">
                  {palette.name}
                </span>
              </div>
              <div className="flex gap-1">
                {palette.colors.slice(0, 4).map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Grid */}
      <div className="mb-4">
        <div className="text-white/60 text-xs font-medium mb-2">Colors</div>
        <div className="grid grid-cols-4 gap-2">
          {colorPalettes[selectedPalette].colors.map((color, index) => (
            <button
              key={index}
              onClick={() => applyColorToAllEdges(color)}
              className="w-10 h-10 rounded-lg border-2 border-white/20 hover:border-white/60 hover:scale-110 transition-all duration-300"
              style={{ backgroundColor: color }}
              title={`Apply ${color} to all edges`}
            />
          ))}
        </div>
      </div>

      {/* Width Control */}
      <div className="mb-4">
        <div className="text-white/60 text-xs font-medium mb-2">
          Width: {selectedWidth}px
        </div>
        <div className="flex gap-2">
          {edgeWidths.map((width) => (
            <button
              key={width}
              onClick={() => setSelectedWidth(width)}
              className={`glass-button px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:scale-105 ${
                selectedWidth === width ? 'bg-white/20 ring-1 ring-white/30' : ''
              }`}
            >
              {width}px
            </button>
          ))}
        </div>
      </div>

      {/* Opacity Control */}
      <div className="mb-4">
        <div className="text-white/60 text-xs font-medium mb-2">
          Opacity: {Math.round(selectedOpacity * 100)}%
        </div>
        <div className="flex gap-2">
          {opacityLevels.map((opacity) => (
            <button
              key={opacity}
              onClick={() => setSelectedOpacity(opacity)}
              className={`glass-button px-2 py-1.5 rounded-lg text-xs transition-all duration-200 hover:scale-105 ${
                selectedOpacity === opacity ? 'bg-white/20 ring-1 ring-white/30' : ''
              }`}
            >
              {Math.round(opacity * 100)}%
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-white/10 pt-4">
        <div className="text-white/60 text-xs font-medium mb-2">Actions</div>
        <div className="flex gap-2">
          <button
            onClick={applyRandomColors}
            className="glass-button rounded-lg px-3 py-2 text-xs hover:scale-105 transition-all duration-300 group flex-1"
            title="Apply random colors from selected palette"
          >
            <Sparkles size={12} className="mr-1 inline group-hover:scale-110 transition-transform duration-200" />
            Random
          </button>
          <button
            onClick={applyGradientColors}
            className="glass-button rounded-lg px-3 py-2 text-xs hover:scale-105 transition-all duration-300 group flex-1"
            title="Apply gradient colors from selected palette"
          >
            <Brush size={12} className="mr-1 inline group-hover:scale-110 transition-transform duration-200" />
            Gradient
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdgeColorPalette;
