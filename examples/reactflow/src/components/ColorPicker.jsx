import React, { useState, useRef, useEffect } from 'react';

// Dynamic import for react-color components
const ColorPickerComponents = {
  ChromePicker: null,
  SketchPicker: null,
  CirclePicker: null,
  SwatchesPicker: null,
  loaded: false
};

// Load react-color components dynamically
const loadReactColor = async () => {
  if (ColorPickerComponents.loaded) return;
  
  try {
    const reactColor = await import('react-color');
    ColorPickerComponents.ChromePicker = reactColor.ChromePicker;
    ColorPickerComponents.SketchPicker = reactColor.SketchPicker;
    ColorPickerComponents.CirclePicker = reactColor.CirclePicker;
    ColorPickerComponents.SwatchesPicker = reactColor.SwatchesPicker;
    ColorPickerComponents.loaded = true;
  } catch (error) {
    console.warn('react-color not available, using basic color picker');
  }
};

const ColorPicker = ({ 
  selectedColor, 
  onColorChange, 
  isVisible, 
  onClose,
  position = 'bottom',
  showCustomPicker = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePicker, setActivePicker] = useState('swatches');
  const pickerRef = useRef(null);

  const predefinedColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#F9E79F', '#A9DFBF', '#FAD7A0', '#D5A6BD', '#A3E4D7',
    '#F8C9D9', '#D4EFDF', '#FDEBD0', '#D6EAF8', '#E8DAEF',
    '#FCF3CF', '#D1F2EB', '#FADBD8', '#D6EAF8', '#E8DAEF'
  ];

  const handleColorChange = (color) => {
    onColorChange(color.hex);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setIsOpen(false);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isVisible) {
      loadReactColor();
    }
  }, [isVisible]);

  const renderPicker = () => {
    if (!ColorPickerComponents.loaded) {
      // Fallback to basic color picker
      return (
        <div className="p-4">
          <div className="grid grid-cols-8 gap-2 mb-4">
            {predefinedColors.slice(0, 24).map((color, index) => (
              <button
                key={index}
                onClick={() => onColorChange(color)}
                className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Custom:</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={selectedColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-600 w-24"
              placeholder="#000000"
            />
          </div>
        </div>
      );
    }

    switch (activePicker) {
      case 'chrome':
        return ColorPickerComponents.ChromePicker ? (
          <ColorPickerComponents.ChromePicker
            color={selectedColor}
            onChange={handleColorChange}
            disableAlpha={false}
          />
        ) : null;
      case 'sketch':
        return ColorPickerComponents.SketchPicker ? (
          <ColorPickerComponents.SketchPicker
            color={selectedColor}
            onChange={handleColorChange}
            presetColors={predefinedColors}
          />
        ) : null;
      case 'circle':
        return ColorPickerComponents.CirclePicker ? (
          <ColorPickerComponents.CirclePicker
            color={selectedColor}
            colors={predefinedColors}
            onChange={handleColorChange}
            width="200px"
          />
        ) : null;
      case 'swatches':
      default:
        return ColorPickerComponents.SwatchesPicker ? (
          <ColorPickerComponents.SwatchesPicker
            color={selectedColor}
            colors={[
              predefinedColors.slice(0, 5),
              predefinedColors.slice(5, 10),
              predefinedColors.slice(10, 15),
              predefinedColors.slice(15, 20),
              predefinedColors.slice(20, 25),
              predefinedColors.slice(25, 30)
            ]}
            onChange={handleColorChange}
          />
        ) : null;
    }
  };

  const pickerButtons = [
    { id: 'swatches', label: 'Swatches', icon: '🎨' },
    { id: 'circle', label: 'Circle', icon: '⭕' },
    { id: 'chrome', label: 'Chrome', icon: '🔧' },
    { id: 'sketch', label: 'Sketch', icon: '✏️' }
  ];

  if (!isVisible) return null;

  return (
    <div className="relative" ref={pickerRef}>
      <div className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 p-4`}>
        {/* Picker Type Selector */}
        <div className="flex gap-1 mb-3">
          {pickerButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActivePicker(button.id)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                activePicker === button.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={button.label}
            >
              {button.icon}
            </button>
          ))}
        </div>

        {/* Color Picker */}
        <div className="mb-3">
          {renderPicker()}
        </div>

        {/* Custom Color Input */}
        {showCustomPicker && (
          <div className="flex items-center gap-2 mb-3">
            <label className="text-xs text-gray-600 dark:text-gray-400">Custom:</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={selectedColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-600 w-20"
              placeholder="#000000"
            />
          </div>
        )}

        {/* Quick Color Presets */}
        <div className="grid grid-cols-10 gap-1">
          {predefinedColors.slice(0, 20).map((color, index) => (
            <button
              key={index}
              onClick={() => onColorChange(color)}
              className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsOpen(false);
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ColorPicker; 