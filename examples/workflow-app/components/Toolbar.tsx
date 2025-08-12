'use client';

import { Plus, Square, Play, MessageSquare, Code, Sparkles } from 'lucide-react';
import { computingFlow, strelkaUI, aiWorkflow } from './showcases';
import { Panel, useReactFlow } from '@xyflow/react';
import { exportFlow } from './persistence';
import { EnhancedEdgeSelector } from './EnhancedEdgeSelector';

export default function Toolbar() {
  const { addNodes, getViewport } = useReactFlow();

  const center = () => {
    const vp = getViewport();
    return {
      x: -vp.x / vp.zoom + window.innerWidth / 2 / vp.zoom,
      y: -vp.y / vp.zoom + window.innerHeight / 2 / vp.zoom,
    };
  };

  const handleAddRectangle = () => {
    addNodes({
      id: `${Date.now()}`,
      type: 'rectangle',
      position: center(),
      data: { label: 'Rectangle' },
    });
  };




  const handleAddTextAI = () => {
    addNodes({
      id: `${Date.now()}-textai`,
      type: 'textai',
      position: center(),
      data: { instructions: '' },
    });
  };

  const handleAddCodeAI = () => {
    addNodes({
      id: `${Date.now()}-codeai`,
      type: 'codeai',
      position: center(),
      data: { instructions: '', language: 'javascript' },
    });
  };

  const handleAddImageAI = () => {
    addNodes({
      id: `${Date.now()}-imageai`,
      type: 'imageai',
      position: center(),
      data: { prompt: '' },
    });
  };

  const load = (flow: { nodes: any[]; edges: any[] }) => {
    // Replace current graph with showcase
    (window as any).ReactFlowInstance?.setNodes?.(flow.nodes);
    (window as any).ReactFlowInstance?.setEdges?.(flow.edges);
  };

  return (
    <Panel position="bottom-center" className="m-4">
      <div className="glass-panel rounded-2xl p-3 flex items-center gap-2 text-white shadow-2xl max-w-[95vw] overflow-x-auto">
        {/* Shape Tools */}
        <div className="flex items-center gap-1 flex-shrink-0">
                      <button
            onClick={handleAddRectangle}
            className="glass-button rounded-lg p-2 hover:scale-105 transition-all duration-300 group"
            title="Add Rectangle"
          >
            <Square size={16} className="group-hover:text-blue-300" />
          </button>
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0" />

        {/* AI Tools */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={handleAddTextAI}
            className="glass-button rounded-lg p-2 hover:scale-105 transition-all duration-300 group text-blue-400"
            title="Add Text AI"
          >
            <MessageSquare size={16} className="group-hover:text-blue-200" />
          </button>
          <button
            onClick={handleAddCodeAI}
            className="glass-button rounded-lg p-2 hover:scale-105 transition-all duration-300 group text-green-400"
            title="Add Code AI"
          >
            <Code size={16} className="group-hover:text-green-200" />
          </button>
          <button
            onClick={handleAddImageAI}
            className="glass-button rounded-lg p-2 hover:scale-105 transition-all duration-300 group text-purple-400"
            title="Add Image AI"
          >
            <Sparkles size={16} className="group-hover:text-purple-200" />
          </button>
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0" />

        {/* Workflow Showcases - Responsive */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button 
            onClick={() => load(computingFlow)} 
            className="glass-button rounded-lg px-2 py-1.5 text-xs hover:scale-105 transition-all duration-300 group" 
            title="Computing flow data processing demonstration"
          >
            <Play size={12} className="mr-1 inline group-hover:text-green-300" /> 
            Computing
          </button>
          <button 
            onClick={() => load(strelkaUI)} 
            className="glass-button rounded-lg px-2 py-1.5 text-xs hover:scale-105 transition-all duration-300 group" 
            title="Strelka UI workflow demonstration"
          >
            <Play size={12} className="mr-1 inline group-hover:text-cyan-300" /> 
            Strelka
          </button>
          <button 
            onClick={() => load(aiWorkflow)} 
            className="glass-button rounded-lg px-2 py-1.5 text-xs hover:scale-105 transition-all duration-300 group" 
            title="AI workflow demonstrating Text, Code, and Image AI nodes"
          >
            <Play size={12} className="mr-1 inline group-hover:text-blue-300" /> 
            AI Demo
          </button>
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0" />

        {/* Enhanced Edge Type Selector */}
        <div className="flex-shrink-0">
          <EnhancedEdgeSelector />
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0" />

        {/* Export */}
        <button
          onClick={() => exportFlow(() => ({ nodes: [], edges: [] }))}
          className="glass-button rounded-lg px-3 py-1.5 text-xs hover:scale-105 transition-all duration-300 group flex-shrink-0"
          title="Export JSON"
        >
          <span className="group-hover:text-amber-300">Export</span>
        </button>
      </div>
    </Panel>
  );
}


