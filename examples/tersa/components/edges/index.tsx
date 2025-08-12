import { AnimatedEdge as AnimatedEdgeBuiltIn } from './animated';
import { TemporaryEdge } from './temporary';
import {
  AnimatedEdge as AdvancedAnimated,
  CrowsFootEdge,
  DashedEdge,
  ThickEdge,
  StepEdge,
  DefaultEdge,
  StraightEdge,
  SmoothStepEdge,
} from './advanced';

export const edgeTypes = {
  animated: AnimatedEdgeBuiltIn,
  temporary: TemporaryEdge,
  crowsfoot: CrowsFootEdge,
  dashed: DashedEdge,
  thick: ThickEdge,
  step: StepEdge,
  default: DefaultEdge,
  straight: StraightEdge,
  smoothstep: SmoothStepEdge,
};
