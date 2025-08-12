'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Move, Square, Lock, Unlock } from 'lucide-react';

export interface ResizeConfig {
  enabled: boolean;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  aspectRatio: boolean;
  lockWidth: boolean;
  lockHeight: boolean;
  snapToGrid: boolean;
  gridSize: number;
  smoothResize: boolean;
  showHandles: boolean;
  handleSize: number;
  handleColor: string;
  handleStyle: 'dots' | 'lines' | 'circles';
}

const defaultConfig: ResizeConfig = {
  enabled: false, // Disabled by default
  minWidth: 50,
  maxWidth: 500,
  minHeight: 50,
  maxHeight: 500,
  aspectRatio: false,
  lockWidth: false,
  lockHeight: false,
  snapToGrid: true,
  gridSize: 10,
  smoothResize: true,
  showHandles: false, // Hidden by default
  handleSize: 8,
  handleColor: '#3b82f6',
  handleStyle: 'dots'
};

const ResizeConfigPanel: React.FC = () => {
  const [config, setConfig] = useState<ResizeConfig>(defaultConfig);
  const [isOpen, setIsOpen] = useState(false);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('resizeConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsed });
      } catch (error) {
        console.warn('Failed to parse saved resize config, using defaults');
      }
    }
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resizeConfig', JSON.stringify(config));
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('resizeConfigChanged', { detail: config }));
  }, [config]);

  const updateConfig = (updates: Partial<ResizeConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setConfig(defaultConfig);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Hide the resize configuration panel since resize is not used
  return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 max-h-[90vh] overflow-y-auto">
      <div className="glass-panel rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Square size={20} />
            Resize Configuration
          </h3>
          <button
            onClick={togglePanel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Enable/Disable */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-white mb-2">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => updateConfig({ enabled: e.target.checked, showHandles: e.target.checked })}
              className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
            />
            Enable Shape Resizing
          </label>
          <div className="text-xs text-gray-400 bg-gray-800 p-2 rounded ml-6">
            💡 <strong>Note:</strong> Resizing is disabled by default to allow normal node interactions. Enable when you need resize functionality.
          </div>
        </div>

        {config.enabled && (
          <>
            {/* Size Constraints */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Move size={16} />
                Size Constraints
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Min Width</label>
                  <input
                    type="number"
                    value={config.minWidth}
                    onChange={(e) => updateConfig({ minWidth: parseInt(e.target.value) || 50 })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                    min="10"
                    max="1000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Max Width</label>
                  <input
                    type="number"
                    value={config.maxWidth}
                    onChange={(e) => updateConfig({ maxWidth: parseInt(e.target.value) || 500 })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                    min="100"
                    max="2000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Min Height</label>
                  <input
                    type="number"
                    value={config.minHeight}
                    onChange={(e) => updateConfig({ minHeight: parseInt(e.target.value) || 50 })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                    min="10"
                    max="1000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Max Height</label>
                  <input
                    type="number"
                    value={config.maxHeight}
                    onChange={(e) => updateConfig({ maxHeight: parseInt(e.target.value) || 500 })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                    min="100"
                    max="2000"
                  />
                </div>
              </div>
            </div>

            {/* Resize Behavior */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Resize Behavior</h4>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white text-sm">
                  <input
                    type="checkbox"
                    checked={config.aspectRatio}
                    onChange={(e) => updateConfig({ aspectRatio: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  Maintain Aspect Ratio
                </label>
                
                <label className="flex items-center gap-2 text-white text-sm">
                  <input
                    type="checkbox"
                    checked={config.lockWidth}
                    onChange={(e) => updateConfig({ lockWidth: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  Lock Width
                </label>
                
                <label className="flex items-center gap-2 text-white text-sm">
                  <input
                    type="checkbox"
                    checked={config.lockHeight}
                    onChange={(e) => updateConfig({ lockHeight: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  Lock Height
                </label>
                
                <label className="flex items-center gap-2 text-white text-sm">
                  <input
                    type="checkbox"
                    checked={config.smoothResize}
                    onChange={(e) => updateConfig({ smoothResize: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  Smooth Resize Animation
                </label>
              </div>
            </div>

            {/* Grid & Snapping */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Grid & Snapping</h4>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white text-sm">
                  <input
                    type="checkbox"
                    checked={config.snapToGrid}
                    onChange={(e) => updateConfig({ snapToGrid: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  Snap to Grid
                </label>
                
                {config.snapToGrid && (
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Grid Size (px)</label>
                    <input
                      type="number"
                      value={config.gridSize}
                      onChange={(e) => updateConfig({ gridSize: parseInt(e.target.value) || 10 })}
                      className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                      min="5"
                      max="50"
                    />
                  </div>
                )}
              </div>
            </div>

                    {/* Handle Appearance */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Resize Handles</h4>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-white text-sm">
              <input
                type="checkbox"
                checked={config.showHandles}
                onChange={(e) => updateConfig({ showHandles: e.target.checked })}
                className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
              />
              Show Resize Handles
            </label>
            
            <div className="text-xs text-gray-400 bg-gray-800 p-2 rounded">
              💡 <strong>Tip:</strong> Temporarily hide resize handles when adding dynamic connection handles to nodes
            </div>
                
                {config.showHandles && (
                  <>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Handle Size (px)</label>
                      <input
                        type="number"
                        value={config.handleSize}
                        onChange={(e) => updateConfig({ handleSize: parseInt(e.target.value) || 8 })}
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        min="4"
                        max="20"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Handle Color</label>
                      <input
                        type="color"
                        value={config.handleColor}
                        onChange={(e) => updateConfig({ handleColor: e.target.value })}
                        className="w-full h-8 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Handle Style</label>
                      <select
                        value={config.handleStyle}
                        onChange={(e) => updateConfig({ handleStyle: e.target.value as any })}
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                      >
                        <option value="dots">Dots</option>
                        <option value="lines">Lines</option>
                        <option value="circles">Circles</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-700">
          <button
            onClick={resetToDefaults}
            className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={togglePanel}
            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResizeConfigPanel;
