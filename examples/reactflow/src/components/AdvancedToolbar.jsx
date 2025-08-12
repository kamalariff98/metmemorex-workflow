import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Moon, 
  Sun, 
  RotateCcw, 
  HelpCircle, 
  Square, 
  Circle, 
  Diamond, 
  Hexagon,
  Triangle,
  Star,
  Heart,
  Zap,
  Settings,
  Palette,
  Type,
  Bold,
  Italic,
  Underline,
  Minus,
  Maximize2,
  Minimize2,
  Layers,
  Grid,
  Eye,
  EyeOff,
  Brain
} from 'lucide-react';

const AdvancedToolbar = ({ 
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
  onAddShape,
  onShowSettings,
  onToggleGrid,
  onToggleLayers,
  showGrid,
  showLayers,
  onShowO4Mini
}) => {
  const [showShapeMenu, setShowShapeMenu] = useState(false);
  const [showEdgeMenu, setShowEdgeMenu] = useState(false);

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
    { type: 'custom', icon: Square, label: 'Rectangle', color: 'bg-blue-500' },
    { type: 'circle', icon: Circle, label: 'Circle', color: 'bg-green-500' },
    { type: 'diamond', icon: Diamond, label: 'Diamond', color: 'bg-purple-500' },
    { type: 'hexagon', icon: Hexagon, label: 'Hexagon', color: 'bg-orange-500' },
    { type: 'triangle', icon: Triangle, label: 'Triangle', color: 'bg-red-500' },
    { type: 'star', icon: Star, label: 'Star', color: 'bg-yellow-500' },
    { type: 'heart', icon: Heart, label: 'Heart', color: 'bg-pink-500' },
    { type: 'lightning', icon: Zap, label: 'Lightning', color: 'bg-indigo-500' },
    { type: 'ellipse', icon: Circle, label: 'Ellipse', color: 'bg-teal-500' }
  ];

  const edgeTypes = [
    { type: 'default', label: 'Default', description: 'Standard curved connections' },
    { type: 'straight', label: 'Straight', description: 'Direct line connections' },
    { type: 'step', label: 'Step', description: 'Step-by-step connections' },
    { type: 'smoothstep', label: 'Smooth Step', description: 'Smooth curved connections' },
    { type: 'animated', label: 'Animated', description: 'Flowing animated lines' },
    { type: 'crowsfoot', label: "Crow's Foot", description: 'Database relationships' },
    { type: 'dashed', label: 'Dashed', description: 'Optional connections' },
    { type: 'thick', label: 'Thick', description: 'Strong relationships' }
  ];

      return (
      <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 flex flex-wrap gap-3">
      {/* Node Creation Tools */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Nodes
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={onAddMainBranch}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Add Main Branch"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Main Branch</span>
          </button>
          
          <button
            onClick={onAddRegularNode}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Add Regular Node"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Node</span>
          </button>
        </div>

        {/* Shape Menu */}
        <div className="relative">
          <button
            onClick={() => setShowShapeMenu(!showShapeMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Add Shape"
          >
            <Square size={16} />
            <span className="hidden sm:inline">Shapes</span>
          </button>
          
          {showShapeMenu && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 p-3 min-w-[200px]">
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((shape) => (
                  <button
                    key={shape.type}
                    onClick={() => {
                      onAddShape(shape.type);
                      setShowShapeMenu(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title={shape.label}
                  >
                    <div className={`w-4 h-4 rounded ${shape.color}`}></div>
                    <span className="text-sm">{shape.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edge Tools */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Edges
        </h3>
        
        <div className="relative">
          <button
            onClick={() => setShowEdgeMenu(!showEdgeMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Edge Types"
          >
            <Minus size={16} />
            <span className="hidden sm:inline">Edges</span>
          </button>
          
          {showEdgeMenu && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 p-3 min-w-[250px]">
              <div className="space-y-2">
                {edgeTypes.map((edge) => (
                  <button
                    key={edge.type}
                    onClick={() => {
                      // Handle edge type selection
                      setShowEdgeMenu(false);
                    }}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title={edge.description}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-sm font-medium">{edge.label}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {edge.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Tools */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Actions
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={onDeleteSelected}
            disabled={selectedNodes.length === 0}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete Selected"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          
          <button
            onClick={onResetColors}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Reset Colors"
          >
            <RotateCcw size={16} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* File Operations */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Files
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Export Mind Map"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          <button
            onClick={handleImportClick}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Import Mind Map"
          >
            <Upload size={16} />
            <span className="hidden sm:inline">Import</span>
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          View
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <button
            onClick={onToggleGrid}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              showGrid 
                ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } hover:bg-gray-200 dark:hover:bg-gray-600`}
            title="Toggle Grid"
          >
            <Grid size={16} />
          </button>
          
          <button
            onClick={onToggleLayers}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              showLayers 
                ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } hover:bg-gray-200 dark:hover:bg-gray-600`}
            title="Toggle Layers"
          >
            <Layers size={16} />
          </button>
        </div>
      </div>

      {/* Help & Settings */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Tools
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={onShowSettings}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Settings"
          >
            <Settings size={16} />
          </button>
          
          <button
            onClick={onShowHelp}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            title="Help"
          >
            <HelpCircle size={16} />
          </button>
          
          <button
            onClick={onShowO4Mini}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
            title="O4 Mini AI Assistant"
          >
            <Brain size={16} />
            <span className="hidden sm:inline">AI</span>
          </button>
        </div>
      </div>

      {/* Click outside to close menus */}
      {(showShapeMenu || showEdgeMenu) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => {
            setShowShapeMenu(false);
            setShowEdgeMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default AdvancedToolbar; 