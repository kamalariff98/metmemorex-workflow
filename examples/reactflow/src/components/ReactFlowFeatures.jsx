import React from 'react';
import {
  MiniMap,
  Controls,
  Background,
  ConnectionLine,
  Panel,
  useReactFlow,
  useNodes,
  useEdges,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  ConnectionMode,
  MarkerType,
  Position,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  ReactFlow,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Background Pattern
const CustomBackground = ({ variant = 'dots', gap = 20, size = 1, color = '#888' }) => {
  return (
    <Background
      variant={variant}
      gap={gap}
      size={size}
      color={color}
      className="bg-gray-50 dark:bg-gray-900"
    />
  );
};

// Custom MiniMap
const CustomMiniMap = ({ nodes, edges, isDarkMode }) => {
  return (
    <MiniMap
      nodes={nodes}
      edges={edges}
      nodeColor={(node) => {
        switch (node.data?.nodeType) {
          case 'central':
            return '#3b82f6';
          case 'main':
            return '#10b981';
          default:
            return '#6b7280';
        }
      }}
      nodeStrokeColor={(node) => {
        return node.selected ? '#1d4ed8' : '#374151';
      }}
      nodeStrokeWidth={3}
      maskColor={isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}
      className="border border-gray-200 dark:border-gray-700 rounded-lg"
    />
  );
};

// Custom Controls
const CustomControls = ({ onFitView, onZoomIn, onZoomOut, onReset }) => {
  return (
    <Controls
      showInteractive={false}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
    >
      <button
        onClick={onFitView}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Fit View"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2h4v4H2V2zm8 0h4v4h-4V2zM2 10h4v4H2v-4zm8 0h4v4h-4v-4z"/>
        </svg>
      </button>
      <button
        onClick={onZoomIn}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Zoom In"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 2v12M2 8h12"/>
        </svg>
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Zoom Out"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 8h12"/>
        </svg>
      </button>
      <button
        onClick={onReset}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Reset"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 3a5 5 0 0 0-5 5H1l3.5 3.5L8 8H6a2 2 0 1 1 2 2v2a4 4 0 1 0-4-4H2a6 6 0 1 1 6 6v-2a4 4 0 0 0 0-8z"/>
        </svg>
      </button>
    </Controls>
  );
};

// Connection Line Component
const CustomConnectionLine = ({ isDarkMode }) => {
  return (
    <ConnectionLine
      style={{
        stroke: isDarkMode ? '#60a5fa' : '#3b82f6',
        strokeWidth: 2,
        strokeDasharray: '5,5',
      }}
    />
  );
};

// Node Selection Panel
const NodeSelectionPanel = ({ selectedNodes, onDeleteNodes, onDuplicateNodes }) => {
  if (selectedNodes.length === 0) return null;

  return (
    <Panel position="top-left" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Selected Nodes: {selectedNodes.length}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onDeleteNodes}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
        <button
          onClick={onDuplicateNodes}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Duplicate
        </button>
      </div>
    </Panel>
  );
};

// Edge Selection Panel
const EdgeSelectionPanel = ({ selectedEdges, onDeleteEdges, onChangeEdgeType }) => {
  if (selectedEdges.length === 0) return null;

  return (
    <Panel position="top-left" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Selected Edges: {selectedEdges.length}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onDeleteEdges}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
        <select
          onChange={(e) => onChangeEdgeType(e.target.value)}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm border border-gray-300 dark:border-gray-600"
        >
          <option value="default">Default</option>
          <option value="straight">Straight</option>
          <option value="step">Step</option>
          <option value="smoothstep">Smooth Step</option>
          <option value="animated">Animated</option>
          <option value="crowsfoot">Crow's Foot</option>
          <option value="dashed">Dashed</option>
          <option value="thick">Thick</option>
        </select>
      </div>
    </Panel>
  );
};

// Flow Statistics Panel
const FlowStatisticsPanel = ({ nodes, edges }) => {
  const nodeTypes = nodes.reduce((acc, node) => {
    const type = node.data?.nodeType || 'regular';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const edgeTypes = edges.reduce((acc, edge) => {
    const type = edge.type || 'default';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <Panel position="bottom-right" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        <div className="font-medium mb-2">Flow Statistics</div>
        <div className="space-y-1">
          <div>Total Nodes: {nodes.length}</div>
          <div>Total Edges: {edges.length}</div>
          <div className="mt-2">
            <div className="font-medium">Node Types:</div>
            {Object.entries(nodeTypes).map(([type, count]) => (
              <div key={type} className="text-xs ml-2">
                {type}: {count}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <div className="font-medium">Edge Types:</div>
            {Object.entries(edgeTypes).map(([type, count]) => (
              <div key={type} className="text-xs ml-2">
                {type}: {count}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
};

// Keyboard Shortcuts Handler
const useKeyboardShortcuts = (reactFlowInstance, nodes, edges, setNodes, setEdges) => {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.tagName === 'INPUT') return;

      switch (event.key) {
        case 'Delete':
        case 'Backspace':
          // Delete selected nodes and edges
          const selectedNodes = nodes.filter(node => node.selected);
          const selectedEdges = edges.filter(edge => edge.selected);
          
          if (selectedNodes.length > 0 || selectedEdges.length > 0) {
            setNodes(nodes.filter(node => !node.selected));
            setEdges(edges.filter(edge => !edge.selected));
          }
          break;
        
        case 'Escape':
          // Deselect all
          setNodes(nodes.map(node => ({ ...node, selected: false })));
          setEdges(edges.map(edge => ({ ...edge, selected: false })));
          break;
        
        case 'a':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Select all
            setNodes(nodes.map(node => ({ ...node, selected: true })));
            setEdges(edges.map(edge => ({ ...edge, selected: true })));
          }
          break;
        
        case 'c':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Copy selected nodes
            const selectedNodes = nodes.filter(node => node.selected);
            if (selectedNodes.length > 0) {
              localStorage.setItem('copiedNodes', JSON.stringify(selectedNodes));
            }
          }
          break;
        
        case 'v':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Paste copied nodes
            const copiedNodes = localStorage.getItem('copiedNodes');
            if (copiedNodes) {
              const nodesToPaste = JSON.parse(copiedNodes).map(node => ({
                ...node,
                id: `${node.id}-${Date.now()}`,
                position: {
                  x: node.position.x + 50,
                  y: node.position.y + 50,
                },
                selected: false,
              }));
              setNodes([...nodes, ...nodesToPaste]);
            }
          }
          break;
        
        case 'z':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Undo functionality (simplified)
            console.log('Undo not implemented yet');
          }
          break;
        
        case 'y':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Redo functionality (simplified)
            console.log('Redo not implemented yet');
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, setNodes, setEdges, reactFlowInstance]);
};

// Main React Flow Features Component
const ReactFlowFeatures = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  nodeTypes,
  edgeTypes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  isDarkMode,
  selectedNodes,
  selectedEdges,
  onDeleteSelected,
  onDuplicateSelected,
  onChangeEdgeType,
}) => {
  const reactFlowInstance = useReactFlow();

  useKeyboardShortcuts(reactFlowInstance, nodes, edges, setNodes, setEdges);

  const handleFitView = () => {
    reactFlowInstance.fitView({ padding: 0.1 });
  };

  const handleZoomIn = () => {
    reactFlowInstance.zoomIn();
  };

  const handleZoomOut = () => {
    reactFlowInstance.zoomOut();
  };

  const handleReset = () => {
    reactFlowInstance.setViewport({ x: 0, y: 0, zoom: 1 });
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default',
          style: { strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        fitView
        attributionPosition="bottom-left"
        className="bg-gray-50 dark:bg-gray-900"
      >
        <CustomBackground />
        <CustomMiniMap nodes={nodes} edges={edges} isDarkMode={isDarkMode} />
        <CustomControls
          onFitView={handleFitView}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />
        <CustomConnectionLine isDarkMode={isDarkMode} />
        
        <NodeSelectionPanel
          selectedNodes={selectedNodes}
          onDeleteNodes={onDeleteSelected}
          onDuplicateNodes={onDuplicateSelected}
        />
        
        <EdgeSelectionPanel
          selectedEdges={selectedEdges}
          onDeleteEdges={onDeleteSelected}
          onChangeEdgeType={onChangeEdgeType}
        />
        
        <FlowStatisticsPanel nodes={nodes} edges={edges} />
      </ReactFlow>
    </>
  );
};

export default ReactFlowFeatures; 