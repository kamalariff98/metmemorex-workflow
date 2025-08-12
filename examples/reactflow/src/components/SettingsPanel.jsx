import React, { useState } from 'react';
import { Panel } from 'reactflow';
import ColorPicker from './ColorPicker';

const SettingsPanel = ({ 
  isVisible, 
  onClose, 
  settings, 
  onSettingsChange,
  isDarkMode 
}) => {
  const [activeTab, setActiveTab] = useState('general');

  if (!isVisible) return null;

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'interaction', label: 'Interaction', icon: '🖱️' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'export', label: 'Export', icon: '📤' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Connection Mode
                </label>
                <select
                  value={settings.connectionMode || 'loose'}
                  onChange={(e) => handleSettingChange('connectionMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="loose">Loose</option>
                  <option value="strict">Strict</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Default Edge Type
                </label>
                <select
                  value={settings.defaultEdgeType || 'default'}
                  onChange={(e) => handleSettingChange('defaultEdgeType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="default">Default</option>
                  <option value="straight">Straight</option>
                  <option value="step">Step</option>
                  <option value="smoothstep">Smooth Step</option>
                  <option value="animated">Animated</option>
                  <option value="crowsfoot">Crow's Foot</option>
                  <option value="dashed">Dashed</option>
                  <option value="thick">Thick</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Snap to Grid
                </label>
                <input
                  type="checkbox"
                  checked={settings.snapToGrid || false}
                  onChange={(e) => handleSettingChange('snapToGrid', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grid Size
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={settings.gridSize || 20}
                  onChange={(e) => handleSettingChange('gridSize', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">{settings.gridSize || 20}px</span>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Color
                </label>
                <ColorPicker
                  selectedColor={settings.backgroundColor || '#f8fafc'}
                  onColorChange={(color) => handleSettingChange('backgroundColor', color)}
                  isVisible={true}
                  onClose={() => {}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Node Border Width
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={settings.nodeBorderWidth || 2}
                  onChange={(e) => handleSettingChange('nodeBorderWidth', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">{settings.nodeBorderWidth || 2}px</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Edge Stroke Width
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={settings.edgeStrokeWidth || 2}
                  onChange={(e) => handleSettingChange('edgeStrokeWidth', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">{settings.edgeStrokeWidth || 2}px</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Show Node Labels
                </label>
                <input
                  type="checkbox"
                  checked={settings.showNodeLabels !== false}
                  onChange={(e) => handleSettingChange('showNodeLabels', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Show Edge Labels
                </label>
                <input
                  type="checkbox"
                  checked={settings.showEdgeLabels || false}
                  onChange={(e) => handleSettingChange('showEdgeLabels', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'interaction' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pan on Drag
                </label>
                <input
                  type="checkbox"
                  checked={settings.panOnDrag !== false}
                  onChange={(e) => handleSettingChange('panOnDrag', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zoom on Scroll
                </label>
                <input
                  type="checkbox"
                  checked={settings.zoomOnScroll !== false}
                  onChange={(e) => handleSettingChange('zoomOnScroll', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zoom on Pinch
                </label>
                <input
                  type="checkbox"
                  checked={settings.zoomOnPinch !== false}
                  onChange={(e) => handleSettingChange('zoomOnPinch', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Multi Selection Key
                </label>
                <select
                  value={settings.multiSelectionKey || 'ctrl'}
                  onChange={(e) => handleSettingChange('multiSelectionKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="ctrl">Ctrl</option>
                  <option value="meta">Cmd (Mac)</option>
                  <option value="shift">Shift</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selection Mode
                </label>
                <select
                  value={settings.selectionMode || 'partial'}
                  onChange={(e) => handleSettingChange('selectionMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="partial">Partial</option>
                  <option value="full">Full</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enable Smooth Animations
                </label>
                <input
                  type="checkbox"
                  checked={settings.enableSmoothAnimations !== false}
                  onChange={(e) => handleSettingChange('enableSmoothAnimations', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enable Edge Animations
                </label>
                <input
                  type="checkbox"
                  checked={settings.enableEdgeAnimations || false}
                  onChange={(e) => handleSettingChange('enableEdgeAnimations', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Node Render Threshold
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={settings.nodeRenderThreshold || 200}
                  onChange={(e) => handleSettingChange('nodeRenderThreshold', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">{settings.nodeRenderThreshold || 200} nodes</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enable Virtual Scrolling
                </label>
                <input
                  type="checkbox"
                  checked={settings.enableVirtualScrolling || false}
                  onChange={(e) => handleSettingChange('enableVirtualScrolling', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Export Format
                </label>
                <select
                  value={settings.exportFormat || 'json'}
                  onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="json">JSON</option>
                  <option value="svg">SVG</option>
                  <option value="png">PNG</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Include Background
                </label>
                <input
                  type="checkbox"
                  checked={settings.includeBackground || false}
                  onChange={(e) => handleSettingChange('includeBackground', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Export Quality
                </label>
                <select
                  value={settings.exportQuality || 'high'}
                  onChange={(e) => handleSettingChange('exportQuality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              // Reset to defaults
              onSettingsChange({
                connectionMode: 'loose',
                defaultEdgeType: 'default',
                snapToGrid: false,
                gridSize: 20,
                backgroundColor: '#f8fafc',
                nodeBorderWidth: 2,
                edgeStrokeWidth: 2,
                showNodeLabels: true,
                showEdgeLabels: false,
                panOnDrag: true,
                zoomOnScroll: true,
                zoomOnPinch: true,
                multiSelectionKey: 'ctrl',
                selectionMode: 'partial',
                enableSmoothAnimations: true,
                enableEdgeAnimations: false,
                nodeRenderThreshold: 200,
                enableVirtualScrolling: false,
                exportFormat: 'json',
                includeBackground: false,
                exportQuality: 'high'
              });
            }}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Reset to Defaults
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 