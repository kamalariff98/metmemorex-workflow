import React from 'react';
import { Plus, Trash2, Download, Upload, Moon, Sun, RotateCcw, HelpCircle, Square, Circle, Diamond } from 'lucide-react';

const Toolbar = ({ 
  onAddMainBranch, 
  onAddRegularNode, 
  onDeleteSelected, 
  onExport, 
  onImport, 
  isDarkMode, 
  onToggleDarkMode,
  onResetColors,
  onShowHelp,
  selectedNodes,
  onAddShape
}) => {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onImport(file);
      }
    };
    input.click();
  };

  const shapes = [
    { type: 'rectangle', icon: Square, label: 'Rectangle' },
    { type: 'circle', icon: Circle, label: 'Circle' },
    { type: 'diamond', icon: Diamond, label: 'Diamond' },
    { type: 'ellipse', icon: Square, label: 'Ellipse' }
  ];

  return (
    <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-wrap gap-2">
      <button
        onClick={onAddMainBranch}
        className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        title="Add Main Branch"
      >
        <Plus size={16} />
        <span className="hidden sm:inline">Main Branch</span>
      </button>
      
      <button
        onClick={onAddRegularNode}
        className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        title="Add Regular Node"
      >
        <Plus size={16} />
        <span className="hidden sm:inline">Node</span>
      </button>
      
      {/* Shape Buttons */}
      <div className="flex gap-1">
        {shapes.map((shape) => (
          <button
            key={shape.type}
            onClick={() => onAddShape(shape.type)}
            className="flex items-center gap-1 px-2 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            title={`Add ${shape.label}`}
          >
            <shape.icon size={14} />
          </button>
        ))}
      </div>
      
      <button
        onClick={onDeleteSelected}
        disabled={selectedNodes.length === 0}
        className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete Selected"
      >
        <Trash2 size={16} />
        <span className="hidden sm:inline">Delete</span>
      </button>
      
      <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        title="Export Mind Map"
      >
        <Download size={16} />
        <span className="hidden sm:inline">Export</span>
      </button>
      
      <button
        onClick={handleImportClick}
        className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        title="Import Mind Map"
      >
        <Upload size={16} />
        <span className="hidden sm:inline">Import</span>
      </button>
      
      <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      
      <button
        onClick={onResetColors}
        className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        title="Reset Colors"
      >
        <RotateCcw size={16} />
        <span className="hidden sm:inline">Reset</span>
      </button>
      
      <button
        onClick={onToggleDarkMode}
        className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        title="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      
      <button
        onClick={onShowHelp}
        className="flex items-center gap-2 px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        title="Help"
      >
        <HelpCircle size={16} />
      </button>
    </div>
  );
};

export default Toolbar;