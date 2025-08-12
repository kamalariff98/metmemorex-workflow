import React from 'react';
import { X } from 'lucide-react';

const HelpPanel = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-4 right-4 z-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Help & Tips</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white mb-1">Node Operations:</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Double-click any node to edit text</li>
            <li>Click to select nodes</li>
            <li>Drag nodes to move them</li>
            <li>Delete selected nodes (except central node)</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white mb-1">Connecting Nodes:</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Drag from any node handle to create connections</li>
            <li>Connections are automatically styled</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white mb-1">Navigation:</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Mouse wheel to zoom in/out</li>
            <li>Drag background to pan around</li>
            <li>Use controls in bottom-left corner</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white mb-1">Customization:</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Select nodes to show color palette</li>
            <li>Toggle dark/light theme</li>
            <li>Export/import your mind maps</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white mb-1">Keyboard Shortcuts:</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Enter: Confirm text editing</li>
            <li>Escape: Cancel text editing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;