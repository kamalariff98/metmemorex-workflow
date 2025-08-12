import type { NodeTypes, EdgeTypes } from '@xyflow/react';
import { RectangleNode } from './shapes/Rectangle';


import { DropNode } from './Drop';
import { EllipseNode } from './shapes/Ellipse';
import { HeartNode } from './shapes/Heart';
import { HexagonNode } from './shapes/Hexagon';
import { StarNode } from './shapes/Star';
import { LightningNode } from './shapes/Lightning';
import { TextAINode } from './ai/TextAI';
import { CodeAINode } from './ai/CodeAI';
import { ImageAINode } from './ai/ImageAI';

// Import enhanced edges
import { 
  EnhancedEdge, 
  MainPointEdge, 
  SubPointEdge, 
  HierarchyEdge, 
  DependencyEdge, 
  FlowEdge, 
  FeedbackEdge 
} from '../edges/EnhancedEdges';

export const nodeTypes: NodeTypes = {
  drop: DropNode,
  rectangle: RectangleNode,

  ellipse: EllipseNode,
  heart: HeartNode,
  hexagon: HexagonNode,
  star: StarNode,
  lightning: LightningNode,
  textai: TextAINode,
  codeai: CodeAINode,
  imageai: ImageAINode,
};

export const edgeTypes: EdgeTypes = {
  enhanced: EnhancedEdge,
  'main-point': MainPointEdge,
  'sub-point': SubPointEdge,
  hierarchy: HierarchyEdge,
  dependency: DependencyEdge,
  flow: FlowEdge,
  feedback: FeedbackEdge,
};


