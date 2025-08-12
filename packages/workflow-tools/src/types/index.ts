export type EnhancedEdgeType = 
  | 'default'
  | 'straight'
  | 'step'
  | 'smoothstep'
  | 'animated'
  | 'crowsfoot'
  | 'dashed'
  | 'thick'
  | 'main-point'
  | 'sub-point'
  | 'hierarchy'
  | 'dependency'
  | 'flow'
  | 'feedback';

export interface EdgeStyle {
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  opacity?: number;
  animation?: string;
  filter?: string;
}

export interface ToolsWidgetProps {
  onAddRectangle?: () => void;
  onEdgeTypeChange?: (type: EnhancedEdgeType) => void;
  className?: string;
}

export interface EnhancedEdgeContextType {
  currentEdgeType: EnhancedEdgeType;
  setCurrentEdgeType: (type: EnhancedEdgeType) => void;
  getEdgeStyle: (type: EnhancedEdgeType) => EdgeStyle;
}
