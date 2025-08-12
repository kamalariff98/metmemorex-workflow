import { SiX } from '@icons-pack/react-simple-icons';
import { AudioWaveformIcon, FileIcon, VideoIcon } from 'lucide-react';
import { Circle, Diamond, Heart, Hexagon, Zap, Square, Star, Triangle } from 'lucide-react';

import { CodeIcon, ImageIcon, TextIcon } from 'lucide-react';

export const nodeButtons = [
  {
    id: 'text',
    label: 'Text',
    icon: TextIcon,
  },
  {
    id: 'image',
    label: 'Image',
    icon: ImageIcon,
  },
  {
    id: 'audio',
    label: 'Audio',
    icon: AudioWaveformIcon,
  },
  {
    id: 'video',
    label: 'Video',
    icon: VideoIcon,
  },
  {
    id: 'code',
    label: 'Code',
    icon: CodeIcon,
    data: {
      content: { language: 'javascript' },
    },
  },
  {
    id: 'file',
    label: 'File',
    icon: FileIcon,
  },
  {
    id: 'tweet',
    label: 'Tweet',
    icon: SiX,
  },
  // Shapes (ReactFlow-inspired)
  { id: 'rectangle', label: 'Rectangle', icon: Square },
  { id: 'circle', label: 'Circle', icon: Circle },
  { id: 'diamond', label: 'Diamond', icon: Diamond },
  { id: 'ellipse', label: 'Ellipse', icon: Square },
  { id: 'heart', label: 'Heart', icon: Heart },
  { id: 'hexagon', label: 'Hexagon', icon: Hexagon },
  { id: 'lightning', label: 'Lightning', icon: Zap },
  { id: 'star', label: 'Star', icon: Star },
  { id: 'triangle', label: 'Triangle', icon: Triangle },
];
