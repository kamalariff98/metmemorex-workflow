'use client';

import { Handle, Position, type NodeProps } from '@xyflow/react';
import { NodeLayout } from '../NodeLayout';

export const DropNode = ({ id, selected }: NodeProps) => {
  return (
    <NodeLayout id={id} title="Drop" type="drop">
      <div className={`glass-panel rounded-2xl px-6 py-4 text-sm transition-all duration-300 hover:scale-105 ${selected ? 'ring-2 ring-blue-400/50 shadow-lg shadow-blue-400/20' : ''}`}>
        <div className="text-white font-medium text-center">✨ Drop Zone</div>
      </div>
    </NodeLayout>
  );
};

export default DropNode;


