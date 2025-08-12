import React from 'react';
import { 
  Square, 
  Circle, 
  Diamond, 
  Minus, 
  Type, 
  Palette,
  Maximize2,
  Bold,
  Italic,
  Underline
} from 'lucide-react';

const CustomizationPanel = ({ 
  selectedNodes, 
  onShapeChange, 
  onColorChange, 
  onSizeChange, 
  onFontChange,
  onEdgeStyleChange,
  selectedEdges 
}) => {
  if (selectedNodes.length === 0 && selectedEdges.length === 0) return null;

  const shapes = [
    { type: 'rectangle', icon: Square, label: 'Rectangle' },
    { type: 'circle', icon: Circle, label: 'Circle' },
    { type: 'diamond', icon: Diamond, label: 'Diamond' },
    { type: 'ellipse', icon: Minus, label: 'Ellipse' },
  ];

  const colors = [
    '#ef4444', // red
    '#f97316', // orange  
    '#fbbf24', // yellow
    '#22c55e', // green
    '#3b82f6', // blue
    '#8b5cf6', // purple
  ];

  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const fontFamilies = [
    { value: 'inherit', label: 'Default' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Courier New, monospace', label: 'Courier' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  ];

  const fontWeights = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '300', label: 'Light' },
    { value: '600', label: 'Semi Bold' },
  ];

  const edgeStyles = [
    { value: 'default', label: 'Smooth' },
    { value: 'straight', label: 'Straight' },
    { value: 'step', label: 'Step' },
    { value: 'smoothstep', label: 'Smooth Step' },
    { value: 'simplebezier', label: 'Bezier' },
  ];

  return (
    <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Customize
      </h3>
      
      {selectedNodes.length > 0 && (
        <>
          {/* Shape Selection */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Shape ({selectedNodes.length} selected)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((shape) => (
                <button
                  key={shape.type}
                  onClick={() => onShapeChange(shape.type)}
                  className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  title={shape.label}
                >
                  <shape.icon size={16} />
                  <span className="text-sm">{shape.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </h4>
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

          {/* Size Selection */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Size
            </h4>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => onSizeChange(size.value)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Customization */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font
            </h4>
            <div className="space-y-2">
              <select
                onChange={(e) => onFontChange('fontFamily', e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {fontFamilies.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
              
              <div className="flex gap-2">
                {fontWeights.map((weight) => (
                  <button
                    key={weight.value}
                    onClick={() => onFontChange('fontWeight', weight.value)}
                    className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {weight.label}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onFontChange('fontStyle', 'normal')}
                  className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Type size={12} /> Normal
                </button>
                <button
                  onClick={() => onFontChange('fontStyle', 'italic')}
                  className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Italic size={12} /> Italic
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edge Customization */}
      {selectedEdges.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Line Style ({selectedEdges.length} selected)
          </h4>
          <div className="space-y-2">
            {edgeStyles.map((style) => (
              <button
                key={style.value}
                onClick={() => onEdgeStyleChange(style.value)}
                className="w-full p-2 text-left text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {style.label}
              </button>
            ))}
          </div>
          
          <div className="mt-3">
            <h5 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Line Color</h5>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onEdgeStyleChange('color', color)}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;