import React, { useState } from 'react';
import { 
  Square, 
  Circle, 
  Diamond, 
  Hexagon, 
  Triangle, 
  Star, 
  Heart, 
  Zap,
  X,
  Check
} from 'lucide-react';

const ShapeSelectionModal = ({ isVisible, onClose, onShapeSelect }) => {
  const [selectedShape, setSelectedShape] = useState('custom');

  const shapes = [
    { id: 'custom', icon: Square, label: 'Rectangle', description: 'Classic rectangular nodes' },
    { id: 'circle', icon: Circle, label: 'Circle', description: 'Smooth circular nodes' },
    { id: 'diamond', icon: Diamond, label: 'Diamond', description: 'Elegant diamond shapes' },
    { id: 'hexagon', icon: Hexagon, label: 'Hexagon', description: 'Modern hexagonal nodes' },
    { id: 'triangle', icon: Triangle, label: 'Triangle', description: 'Dynamic triangular nodes' },
    { id: 'star', icon: Star, label: 'Star', description: 'Eye-catching star shapes' },
    { id: 'heart', icon: Heart, label: 'Heart', description: 'Creative heart shapes' },
    { id: 'zap', icon: Zap, label: 'Lightning', description: 'Energetic lightning bolts' }
  ];

  const handleShapeSelect = (shapeId) => {
    setSelectedShape(shapeId);
  };

  const handleConfirm = () => {
    onShapeSelect(selectedShape);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Choose Your Mind Map Style
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Select your preferred node shape to get started with your mind map. You can always change this later.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => handleShapeSelect(shape.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                selectedShape === shape.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-3 rounded-lg ${
                  selectedShape === shape.id 
                    ? 'bg-blue-100 dark:bg-blue-800' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <shape.icon 
                    size={32} 
                    className={`${
                      selectedShape === shape.id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} 
                  />
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-800 dark:text-white">
                    {shape.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {shape.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Check size={16} />
            Start Mind Mapping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShapeSelectionModal; 