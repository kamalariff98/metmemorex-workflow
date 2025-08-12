'use client';

import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, getStraightPath } from '@xyflow/react';
import { useEnhancedEdge } from '../EnhancedEdgeSelector';

// Custom edge for main points (thick blue with animated effect)
export const MainPointEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: any) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 3,
          stroke: '#3b82f6',
          strokeDasharray: 'none',
          animation: 'animated 1.5s linear infinite',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            Main Point
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

// Custom edge for sub points (thin dashed gray)
export const SubPointEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: any) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 1,
          stroke: '#6b7280',
          strokeDasharray: '5,5',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium">
            Sub Point
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

// Custom edge for hierarchy (green step)
export const HierarchyEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: any) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: '#10b981',
          strokeDasharray: 'none',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
            Hierarchy
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

// Custom edge for dependencies (orange animated with breathing effect)
export const DependencyEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: any) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: '#f59e0b',
          strokeDasharray: 'none',
          animation: 'breathing 2s ease-in-out infinite',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium animate-pulse">
            Dependency
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

// Custom edge for flow (purple smooth with glowing effect)
export const FlowEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: any) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: '#8b5cf6',
          strokeDasharray: 'none',
          animation: 'glowing 3s ease-in-out infinite',
          filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
            Flow
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

// Custom edge for feedback (red dotted)
export const FeedbackEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: any) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 1.5,
          stroke: '#ef4444',
          strokeDasharray: '3,3',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
            Feedback
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

// Generic enhanced edge that applies styles based on type
export const EnhancedEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, data }: any) => {
  const { getEdgeStyle } = useEnhancedEdge();
  const edgeType = data?.edgeType || 'default';
  const edgeStyle = getEdgeStyle(edgeType);
  
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getLabel = (type: string) => {
    switch (type) {
      case 'main-point': return 'Main Point';
      case 'sub-point': return 'Sub Point';
      case 'hierarchy': return 'Hierarchy';
      case 'dependency': return 'Dependency';
      case 'flow': return 'Flow';
      case 'feedback': return 'Feedback';
      default: return 'Connection';
    }
  };

  const getLabelColor = (type: string) => {
    switch (type) {
      case 'main-point': return 'bg-blue-600';
      case 'sub-point': return 'bg-gray-600';
      case 'hierarchy': return 'bg-green-600';
      case 'dependency': return 'bg-orange-600';
      case 'flow': return 'bg-purple-600';
      case 'feedback': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          ...edgeStyle,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className={`${getLabelColor(edgeType)} text-white px-2 py-1 rounded text-xs font-medium`}>
            {getLabel(edgeType)}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
