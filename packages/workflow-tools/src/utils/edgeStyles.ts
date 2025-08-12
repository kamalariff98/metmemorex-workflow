import { EnhancedEdgeType, EdgeStyle } from '../types';

export const getEdgeStyle = (type: EnhancedEdgeType): EdgeStyle => {
  const baseStyle: EdgeStyle = {
    stroke: '#94a3b8',
    strokeWidth: 2,
    opacity: 0.8,
  };

  switch (type) {
    case 'animated':
      return {
        ...baseStyle,
        stroke: '#3b82f6',
        strokeWidth: 3,
        strokeDasharray: '10,5',
        animation: 'dash 2s linear infinite',
      };
    case 'crowsfoot':
      return {
        ...baseStyle,
        stroke: '#10b981',
        strokeWidth: 2,
        strokeDasharray: '5,3,1,3',
      };
    case 'dashed':
      return {
        ...baseStyle,
        stroke: '#f59e0b',
        strokeDasharray: '8,4',
      };
    case 'thick':
      return {
        ...baseStyle,
        stroke: '#ef4444',
        strokeWidth: 4,
      };
    case 'main-point':
      return {
        ...baseStyle,
        stroke: '#8b5cf6',
        strokeWidth: 3,
        animation: 'dash 1.5s linear infinite',
      };
    case 'sub-point':
      return {
        ...baseStyle,
        stroke: '#06b6d4',
        strokeWidth: 2,
        strokeDasharray: '6,3',
        opacity: 0.7,
      };
    case 'hierarchy':
      return {
        ...baseStyle,
        stroke: '#84cc16',
        strokeWidth: 2,
        strokeDasharray: '12,4,2,4',
      };
    case 'dependency':
      return {
        ...baseStyle,
        stroke: '#f97316',
        strokeWidth: 2,
        animation: 'breathing 2s ease-in-out infinite',
      };
    case 'flow':
      return {
        ...baseStyle,
        stroke: '#ec4899',
        strokeWidth: 3,
        filter: 'drop-shadow(0 0 6px #ec4899)',
        animation: 'glowing 2s ease-in-out infinite alternate',
      };
    case 'feedback':
      return {
        ...baseStyle,
        stroke: '#64748b',
        strokeWidth: 2,
        strokeDasharray: '4,8,4,2',
        opacity: 0.6,
      };
    case 'straight':
    case 'step':
    case 'smoothstep':
    case 'default':
    default:
      return baseStyle;
  }
};
