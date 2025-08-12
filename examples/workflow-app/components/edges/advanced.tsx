'use client';

import React from 'react';
import {
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
  type EdgeProps,
} from '@xyflow/react';

export const AnimatedEdge = (props: EdgeProps) => {
  const { id, style = {}, markerEnd, data } = props as any;
  const [edgePath, labelX, labelY] = getBezierPath(props as any);
  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={edgePath} stroke="#10b981" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.5">
        <animate attributeName="stroke-dasharray" values="0 20;20 0" dur="2s" repeatCount="indefinite" />
      </path>
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, fontSize: 12, pointerEvents: 'all' }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded shadow text-xs border">{data.label}</div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const CrowsFootEdge = (props: EdgeProps) => {
  const { style = {}, markerEnd, data, targetX, targetY } = props as any;
  const [edgePath, labelX, labelY] = getStraightPath(props as any);
  return (
    <>
      <path style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <path d={`M ${targetX - 10} ${targetY - 5} L ${targetX} ${targetY} L ${targetX - 10} ${targetY + 5}`} stroke={style.stroke || '#000'} strokeWidth="2" fill="none" />
      <path d={`M ${targetX - 15} ${targetY - 3} L ${targetX} ${targetY} L ${targetX - 15} ${targetY + 3}`} stroke={style.stroke || '#000'} strokeWidth="2" fill="none" />
      <path d={`M ${targetX - 20} ${targetY - 1} L ${targetX} ${targetY} L ${targetX - 20} ${targetY + 1}`} stroke={style.stroke || '#000'} strokeWidth="2" fill="none" />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, fontSize: 12, pointerEvents: 'all' }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded shadow text-xs border">{data.label}</div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const DashedEdge = (props: EdgeProps) => {
  const { style = {}, markerEnd, data } = props as any;
  const [edgePath, labelX, labelY] = getSmoothStepPath(props as any);
  return (
    <>
      <path style={{ ...style, strokeDasharray: '5,5' }} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, fontSize: 12, pointerEvents: 'all' }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded shadow text-xs border">{data.label}</div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const ThickEdge = (props: EdgeProps) => {
  const { style = {}, markerEnd, data } = props as any;
  const [edgePath, labelX, labelY] = getBezierPath(props as any);
  return (
    <>
      <path style={{ ...style, strokeWidth: 4 }} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, fontSize: 12, pointerEvents: 'all' }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded shadow text-xs border">{data.label}</div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const StepEdge = (props: EdgeProps) => {
  const { style = {}, markerEnd, data } = props as any;
  const [edgePath, labelX, labelY] = getSmoothStepPath(props as any);
  return (
    <>
      <path style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, fontSize: 12, pointerEvents: 'all' }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded shadow text-xs border">{data.label}</div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const DefaultEdge = (props: EdgeProps) => {
  const { style = {}, markerEnd, data } = props as any;
  const [edgePath, labelX, labelY] = getBezierPath(props as any);
  return (
    <>
      <path style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, fontSize: 12, pointerEvents: 'all' }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded shadow text-xs border">{data.label}</div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const StraightEdge = (props: EdgeProps) => {
  const { style = {}, markerEnd, data } = props as any;
  const [edgePath, labelX, labelY] = getStraightPath(props as any);
  return (
    <>
      <path style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, fontSize: 12, pointerEvents: 'all' }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded shadow text-xs border">{data.label}</div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const SmoothStepEdge = (props: EdgeProps) => {
  const { style = {}, markerEnd, data } = props as any;
  const [edgePath, labelX, labelY] = getSmoothStepPath(props as any);
  return (
    <>
      <path style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, fontSize: 12, pointerEvents: 'all' }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded shadow text-xs border">{data.label}</div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};


