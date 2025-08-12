import { Canvas } from '@/components/canvas';
import { Toolbar } from '@/components/toolbar';
import { Controls } from '@/components/controls';
import { ReactFlowProvider } from '@xyflow/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workflow Canvas',
  description: 'Mock workflow management canvas combining Tersa nodes with ReactFlow shapes',
};

export default function WorkflowPage() {
  return (
    <div className="h-[80vh] w-full">
      <ReactFlowProvider>
        <Canvas>
          <Controls />
          <Toolbar />
        </Canvas>
      </ReactFlowProvider>
    </div>
  );
}


