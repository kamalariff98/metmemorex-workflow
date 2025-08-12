'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useResizeConfig } from '../hooks/useResizeConfig';

interface ConfigurableResizerProps {
  children: React.ReactNode;
  onResize?: (width: number, height: number) => void;
  initialWidth?: number;
  initialHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ConfigurableResizer: React.FC<ConfigurableResizerProps> = ({
  children,
  onResize,
  initialWidth = 150,
  initialHeight = 100,
  className = '',
  style = {}
}) => {
  const { config, constrainSize, getHandleStyle, getResizeTransition } = useResizeConfig();
  const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply constrained dimensions on config change
  useEffect(() => {
    const constrained = constrainSize(dimensions.width, dimensions.height);
    setDimensions(constrained);
  }, [config.minWidth, config.maxWidth, config.minHeight, config.maxHeight]);

  const handleMouseDown = (e: React.MouseEvent, position: 'top' | 'right' | 'bottom' | 'left' | 'corner') => {
    if (!config.enabled) return;
    
    // Only prevent default for resize handles, not for the main content
    if (position !== 'content') {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Don't interfere with React Flow events
  const handleContentClick = (e: React.MouseEvent) => {
    // Allow React Flow to handle clicks on the main content
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    let newWidth = resizeStart.width;
    let newHeight = resizeStart.height;

    // Calculate new dimensions based on resize position
    if (resizeStart.width !== undefined && resizeStart.height !== undefined) {
      if (resizeStart.width === dimensions.width) {
        // Resizing from current position
        if (deltaX !== 0) newWidth = dimensions.width + deltaX;
        if (deltaY !== 0) newHeight = dimensions.height + deltaY;
      } else {
        // Resizing from start position
        newWidth = resizeStart.width + deltaX;
        newHeight = resizeStart.height + deltaY;
      }
    }

    // Apply constraints
    const constrained = constrainSize(newWidth, newHeight);
    
    setDimensions(constrained);
    
    if (onResize) {
      onResize(constrained.width, constrained.height);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  if (!config.enabled) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          ...style
        }}
      >
        {children}
      </div>
    );
  }

  const containerStyle = {
    width: dimensions.width,
    height: dimensions.height,
    position: 'relative' as const,
    transition: getResizeTransition(),
    pointerEvents: 'auto' as const,
    ...style
  };

  return (
          <div
        ref={containerRef}
        className={className}
        style={containerStyle}
        onClick={handleContentClick}
      >
        {children}
      
      {/* Resize Handles */}
      {config.showHandles && (
        <>
          {/* Top handle */}
          <div
            style={{
              position: 'absolute',
              top: -config.handleSize / 2,
              left: '50%',
              transform: 'translateX(-50%)',
              ...getHandleStyle('top'),
              pointerEvents: 'auto',
              zIndex: 1000
            }}
            onMouseDown={(e) => handleMouseDown(e, 'top')}
            className="resize-handle"
          />
          
          {/* Right handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: -config.handleSize / 2,
              transform: 'translateY(-50%)',
              ...getHandleStyle('right'),
              pointerEvents: 'auto'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'right')}
            className="resize-handle"
          />
          
          {/* Bottom handle */}
          <div
            style={{
              position: 'absolute',
              bottom: -config.handleSize / 2,
              left: '50%',
              transform: 'translateX(-50%)',
              ...getHandleStyle('bottom'),
              pointerEvents: 'auto'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'bottom')}
            className="resize-handle"
          />
          
          {/* Left handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: -config.handleSize / 2,
              transform: 'translateY(-50%)',
              ...getHandleStyle('left'),
              pointerEvents: 'auto'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'left')}
            className="resize-handle"
          />
          
          {/* Corner handles */}
          <div
            style={{
              position: 'absolute',
              top: -config.handleSize / 2,
              left: -config.handleSize / 2,
              ...getHandleStyle('corner'),
              pointerEvents: 'auto'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'corner')}
            className="resize-handle"
          />
          <div
            style={{
              position: 'absolute',
              top: -config.handleSize / 2,
              right: -config.handleSize / 2,
              ...getHandleStyle('corner'),
              pointerEvents: 'auto'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'corner')}
            className="resize-handle"
          />
          <div
            style={{
              position: 'absolute',
              bottom: -config.handleSize / 2,
              left: -config.handleSize / 2,
              ...getHandleStyle('corner'),
              pointerEvents: 'auto'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'corner')}
            className="resize-handle"
          />
          <div
            style={{
              position: 'absolute',
              bottom: -config.handleSize / 2,
              right: -config.handleSize / 2,
              ...getHandleStyle('corner'),
              pointerEvents: 'auto'
            }}
            onMouseDown={(e) => handleMouseDown(e, 'corner')}
            className="resize-handle"
          />
        </>
      )}
      
      {/* Resize indicator */}
      {isResizing && (
        <div
          style={{
            position: 'absolute',
            top: -30,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        >
          {Math.round(dimensions.width)} × {Math.round(dimensions.height)}
        </div>
      )}
    </div>
  );
};
