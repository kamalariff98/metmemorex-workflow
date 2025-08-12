import React from 'react';

const ColorPalette = ({ selectedNodes, onColorChange, onShow }) => {
  const colors = [
    '#ef4444', // red
    '#f97316', // orange  
    '#fbbf24', // yellow
    '#22c55e', // green
    '#3b82f6', // blue
    '#8b5cf6', // purple
  ];

  if (selectedNodes.length === 0) return null;

  return (
    <div className="absolute top-20 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Change Color ({selectedNodes.length} selected)
      </h3>
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
            style={{ backgroundColor: color }}
            title={`Change to ${color}`}
          />
        ))}
        <button
          onClick={() => onColorChange(null)}
          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors bg-white dark:bg-gray-700 flex items-center justify-center"
          title="Reset to default color"
        >
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">×</span>
        </button>
      </div>
    </div>
  );
};

export default ColorPalette;