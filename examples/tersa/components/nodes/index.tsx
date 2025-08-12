import type { NodeTypes } from '@xyflow/react';
import { AudioNode } from './audio';
import { CodeNode } from './code';
import { DropNode } from './drop';
import { FileNode } from './file';
import { ImageNode } from './image';
import { TextNode } from './text';
import { TweetNode } from './tweet';
import { VideoNode } from './video';
import { RectangleNode } from './shapes/Rectangle';
import { CircleNode } from './shapes/Circle';
import { DiamondNode } from './shapes/Diamond';
import { EllipseNode } from './shapes/Ellipse';
import { HeartNode } from './shapes/Heart';
import { HexagonNode } from './shapes/Hexagon';
import { LightningNode } from './shapes/Lightning';
import { StarNode } from './shapes/Star';
import { TriangleNode } from './shapes/Triangle';

export const nodeTypes: NodeTypes = {
  image: ImageNode,
  text: TextNode,
  drop: DropNode,
  video: VideoNode,
  audio: AudioNode,
  code: CodeNode,
  file: FileNode,
  tweet: TweetNode,
  rectangle: RectangleNode,
  circle: CircleNode,
  diamond: DiamondNode,
  ellipse: EllipseNode,
  heart: HeartNode,
  hexagon: HexagonNode,
  lightning: LightningNode,
  star: StarNode,
  triangle: TriangleNode,
};
