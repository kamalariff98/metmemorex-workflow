import { useState, useEffect } from 'react';
import type { ResizeConfig } from '../components/ResizeConfigPanel';

export const useResizeConfig = () => {
  const [config, setConfig] = useState<ResizeConfig>({
    enabled: true,
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
    showHandles: true,
    handleSize: 8,
    handleColor: '#3b82f6',
    handleStyle: 'dots'
  });

  useEffect(() => {
    // Load initial config from localStorage
    const savedConfig = localStorage.getItem('resizeConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
      } catch (error) {
        console.warn('Failed to parse saved resize config, using defaults');
      }
    }

    // Listen for config changes from the panel
    const handleConfigChange = (event: CustomEvent<ResizeConfig>) => {
      setConfig(event.detail);
    };

    window.addEventListener('resizeConfigChanged', handleConfigChange as EventListener);

    return () => {
      window.removeEventListener('resizeConfigChanged', handleConfigChange as EventListener);
    };
  }, []);

  // Helper functions for resize logic
  const constrainSize = (width: number, height: number) => {
    let newWidth = Math.max(config.minWidth, Math.min(config.maxWidth, width));
    let newHeight = Math.max(config.minHeight, Math.min(config.maxHeight, height));

    if (config.lockWidth) {
      newWidth = width;
    }
    if (config.lockHeight) {
      newHeight = height;
    }

    if (config.aspectRatio && !config.lockWidth && !config.lockHeight) {
      const aspect = width / height;
      if (newWidth / newHeight > aspect) {
        newWidth = newHeight * aspect;
      } else {
        newHeight = newWidth / aspect;
      }
    }

    if (config.snapToGrid) {
      newWidth = Math.round(newWidth / config.gridSize) * config.gridSize;
      newHeight = Math.round(newHeight / config.gridSize) * config.gridSize;
    }

    return { width: newWidth, height: newHeight };
  };

  const getHandleStyle = (position: 'top' | 'right' | 'bottom' | 'left' | 'corner') => {
    if (!config.showHandles) return { display: 'none' };

    const baseStyle = {
      width: config.handleSize,
      height: config.handleSize,
      backgroundColor: config.handleColor,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: config.handleStyle === 'circles' ? '50%' : '2px',
      cursor: `${position}-resize`,
      zIndex: 10,
    };

    switch (config.handleStyle) {
      case 'dots':
        return {
          ...baseStyle,
          borderRadius: '50%',
        };
      case 'lines':
        return {
          ...baseStyle,
          borderRadius: '1px',
          ...(position === 'top' || position === 'bottom' ? { width: config.handleSize * 2 } : { height: config.handleSize * 2 }),
        };
      case 'circles':
        return {
          ...baseStyle,
          borderRadius: '50%',
          border: `2px solid ${config.handleColor}`,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getResizeTransition = () => {
    return config.smoothResize ? 'all 0.2s ease-in-out' : 'none';
  };

  return {
    config,
    constrainSize,
    getHandleStyle,
    getResizeTransition,
  };
};
