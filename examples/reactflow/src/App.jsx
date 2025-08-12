import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';


import CustomNode from './components/CustomNode';
import RectangleNode from './components/shapes/RectangleNode';
import CircleNode from './components/shapes/CircleNode';
import DiamondNode from './components/shapes/DiamondNode';
import EllipseNode from './components/shapes/EllipseNode';
import HexagonNode from './components/shapes/HexagonNode';
import StarNode from './components/shapes/StarNode';
import HeartNode from './components/shapes/HeartNode';
import LightningNode from './components/shapes/LightningNode';
import TriangleNode from './components/shapes/TriangleNode';
import AdvancedToolbar from './components/AdvancedToolbar';
import CustomizationPanel from './components/CustomizationPanel';
import ColorPalette from './components/ColorPalette';
import HelpPanel from './components/HelpPanel';
import ShapeSelectionModal from './components/ShapeSelectionModal';
import O4MiniAI from './components/O4MiniAI';
import SettingsPanel from './components/SettingsPanel';
import { 
  AnimatedEdge, 
  CrowsFootEdge, 
  DashedEdge, 
  ThickEdge,
  StepEdge,
  DefaultEdge,
  StraightEdge,
  SmoothStepEdge
} from './components/AdvancedEdges';

const nodeTypes = {
  custom: CustomNode,
  rectangle: RectangleNode,
  circle: CircleNode,
  diamond: DiamondNode,
  ellipse: EllipseNode,
  hexagon: HexagonNode,
  star: StarNode,
  heart: HeartNode,
  lightning: LightningNode,
  triangle: TriangleNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
  crowsfoot: CrowsFootEdge,
  dashed: DashedEdge,
  thick: ThickEdge,
  step: StepEdge,
  default: DefaultEdge,
  straight: StraightEdge,
  smoothstep: SmoothStepEdge,
};

const initialNodes = [];

const initialEdges = [];

const connectionLineStyle = {
  strokeWidth: 2,
  stroke: '#94a3b8',
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: '#94a3b8' },
  type: 'smoothstep',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#94a3b8',
  },
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [selectedShape, setSelectedShape] = useState('custom');
  const [showGrid, setShowGrid] = useState(true);
  const [showLayers, setShowLayers] = useState(true);
  const [showO4Mini, setShowO4Mini] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    connectionMode: 'loose',
    defaultEdgeType: 'default',
    snapToGrid: false,
    gridSize: 20,
    backgroundColor: '#f8fafc',
    nodeBorderWidth: 2,
    edgeStrokeWidth: 2,
    showNodeLabels: true,
    showEdgeLabels: false,
    panOnDrag: true,
    zoomOnScroll: true,
    zoomOnPinch: true,
    multiSelectionKey: 'ctrl',
    selectionMode: 'partial',
    enableSmoothAnimations: true,
    enableEdgeAnimations: false,
    nodeRenderThreshold: 200,
    enableVirtualScrolling: false,
    exportFormat: 'json',
    includeBackground: false,
    exportQuality: 'high'
  });
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSelectionChange = useCallback((elements) => {
    const selectedNodeIds = elements.nodes.map(node => node.id);
    const selectedEdgeIds = elements.edges.map(edge => edge.id);
    setSelectedNodes(selectedNodeIds);
    setSelectedEdges(selectedEdgeIds);
  }, []);

  const onNodeLabelChange = useCallback((nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onLabelChange: (newLabel) => onNodeLabelChange(node.id, newLabel),
        },
      }))
    );
  }, [onNodeLabelChange, setNodes]);

  const addMainBranch = useCallback(() => {
    let centralNode = nodes.find(node => node.data.nodeType === 'central');
    
    // Create central node if it doesn't exist
    if (!centralNode) {
      centralNode = {
        id: 'central',
        type: selectedShape,
        position: { x: 400, y: 300 },
        data: { 
          label: 'Central Idea', 
          nodeType: 'central',
          size: 'large',
          onLabelChange: () => {}
        },
      };
      setNodes((nds) => [...nds, centralNode]);
    }

    const existingMainBranches = nodes.filter(node => node.data.nodeType === 'main');
    const angle = (existingMainBranches.length * 60) * Math.PI / 180;
    const radius = 200;
    
    const newNode = {
      id: `main-${Date.now()}`,
      position: {
        x: centralNode.position.x + Math.cos(angle) * radius,
        y: centralNode.position.y + Math.sin(angle) * radius,
      },
      data: { 
        label: 'Main Topic', 
        nodeType: 'main',
        size: 'medium',
        onLabelChange: () => {}
      },
      type: selectedShape,
    };

    const newEdge = {
      id: `edge-${centralNode.id}-${newNode.id}`,
      source: centralNode.id,
      target: newNode.id,
      type: 'smoothstep',
      style: { strokeWidth: 3, stroke: '#10b981' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#10b981',
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  }, [nodes, setNodes, setEdges, selectedShape]);

  const addRegularNode = useCallback(() => {
    if (selectedNodes.length === 0) {
      alert('Please select a node first to add a regular node connected to it.');
      return;
    }

    const sourceNodeId = selectedNodes[0];
    const sourceNode = nodes.find(node => node.id === sourceNodeId);
    if (!sourceNode) return;

    const newNode = {
      id: `node-${Date.now()}`,
      position: {
        x: sourceNode.position.x + Math.random() * 200 - 100,
        y: sourceNode.position.y + Math.random() * 200 - 100,
      },
      data: { 
        label: 'New Node', 
        nodeType: 'regular',
        size: 'medium',
        onLabelChange: () => {}
      },
      type: 'custom',
    };

    const newEdge = {
      id: `edge-${sourceNodeId}-${newNode.id}`,
      source: sourceNodeId,
      target: newNode.id,
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  }, [selectedNodes, nodes, setNodes, setEdges]);

  const addShapeNode = useCallback((shapeType) => {
    const position = {
      x: Math.random() * 400 + 200,
      y: Math.random() * 400 + 200,
    };

    const newNode = {
      id: `${shapeType}-${Date.now()}`,
      position,
      data: { 
        label: `${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} Node`, 
        nodeType: 'regular',
        size: 'medium',
        onLabelChange: () => {}
      },
      type: shapeType,
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const deleteSelected = useCallback(() => {
    const centralNode = nodes.find(node => node.data.nodeType === 'central');
    const nodesToDelete = selectedNodes.filter(nodeId => nodeId !== centralNode?.id);
    
    if (nodesToDelete.length === 0 && selectedEdges.length === 0) {
      if (selectedNodes.includes(centralNode?.id)) {
        alert('Cannot delete the central node!');
      }
      return;
    }

    setNodes((nds) => nds.filter((node) => !nodesToDelete.includes(node.id)));
    setEdges((eds) => eds.filter((edge) => 
      !nodesToDelete.includes(edge.source) && 
      !nodesToDelete.includes(edge.target) &&
      !selectedEdges.includes(edge.id)
    ));
    setSelectedNodes([]);
    setSelectedEdges([]);
  }, [selectedNodes, selectedEdges, nodes, setNodes, setEdges]);

  const changeNodeColor = useCallback((color) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (selectedNodes.includes(node.id)) {
          return {
            ...node,
            data: {
              ...node.data,
              color: color,
            },
          };
        }
        return node;
      })
    );
  }, [selectedNodes, setNodes]);

  const changeNodeShape = useCallback((shape) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (selectedNodes.includes(node.id)) {
          return {
            ...node,
            type: shape,
          };
        }
        return node;
      })
    );
  }, [selectedNodes, setNodes]);

  const changeNodeSize = useCallback((size) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (selectedNodes.includes(node.id)) {
          return {
            ...node,
            data: {
              ...node.data,
              size: size,
            },
          };
        }
        return node;
      })
    );
  }, [selectedNodes, setNodes]);

  const changeNodeFont = useCallback((property, value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (selectedNodes.includes(node.id)) {
          return {
            ...node,
            data: {
              ...node.data,
              [property]: value,
            },
          };
        }
        return node;
      })
    );
  }, [selectedNodes, setNodes]);

  const changeEdgeStyle = useCallback((style, value) => {
    if (style === 'color') {
      setEdges((eds) =>
        eds.map((edge) => {
          if (selectedEdges.includes(edge.id)) {
            return {
              ...edge,
              style: {
                ...edge.style,
                stroke: value,
              },
              markerEnd: {
                ...edge.markerEnd,
                color: value,
              },
            };
          }
          return edge;
        })
      );
    } else {
      const edgeType = style === 'default' ? 'smoothstep' : style;
      setEdges((eds) =>
        eds.map((edge) => {
          if (selectedEdges.includes(edge.id)) {
            return {
              ...edge,
              type: edgeType,
            };
          }
          return edge;
        })
      );
    }
  }, [selectedEdges, setEdges]);

  const resetColors = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          color: null,
        },
      }))
    );
  }, [setNodes]);

  const exportMindMap = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const dataStr = JSON.stringify(flow, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'mindmap.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  }, [reactFlowInstance]);

  const importMindMap = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const flow = JSON.parse(e.target.result);
        if (flow.nodes && flow.edges) {
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setSelectedNodes([]);
          setSelectedEdges([]);
        } else {
          alert('Invalid mind map file format!');
        }
      } catch (error) {
        alert('Error reading mind map file!');
      }
    };
    reader.readAsText(file);
  }, [setNodes, setEdges]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <div className={`w-full h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div 
        className="w-full h-full bg-gray-50 dark:bg-gray-900"
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={connectionLineStyle}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
        >
          <Controls 
            className="bg-white dark:bg-gray-800" 
            position="bottom-right"
          />
          <MiniMap 
            position="top-right"
            className="bg-white dark:bg-gray-800"
            nodeStrokeColor={(n) => {
              if (n.data.nodeType === 'central') return '#3b82f6';
              if (n.data.nodeType === 'main') return '#10b981';
              return '#6b7280';
            }}
            nodeColor={(n) => {
              if (n.data.color) return n.data.color;
              if (n.data.nodeType === 'central') return '#3b82f6';
              if (n.data.nodeType === 'main') return '#10b981';
              return '#f3f4f6';
            }}
            nodeBorderRadius={8}
          />
          <Background 
            variant="dots" 
            gap={20} 
            size={1}
            className="bg-gray-50 dark:bg-gray-900"
          />
        </ReactFlow>

        <AdvancedToolbar
          onAddMainBranch={addMainBranch}
          onAddRegularNode={addRegularNode}
          onAddShape={addShapeNode}
          onDeleteSelected={deleteSelected}
          onExport={exportMindMap}
          onImport={importMindMap}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onResetColors={resetColors}
          onShowHelp={() => setShowHelp(true)}
          onShowSettings={() => setShowSettings(true)}
          onToggleGrid={() => setShowGrid(!showGrid)}
          onToggleLayers={() => setShowLayers(!showLayers)}
          onShowO4Mini={() => setShowO4Mini(true)}
          showGrid={showGrid}
          showLayers={showLayers}
          selectedNodes={selectedNodes}
        />

        <ShapeSelectionModal
          isVisible={showShapeModal}
          onClose={() => setShowShapeModal(false)}
          onShapeSelect={(shape) => {
            setSelectedShape(shape);
            setShowShapeModal(false);
            // Update central node type
            setNodes((nds) =>
              nds.map((node) => {
                if (node.data.nodeType === 'central') {
                  return {
                    ...node,
                    type: shape,
                  };
                }
                return node;
              })
            );
          }}
        />

        <CustomizationPanel
          selectedNodes={selectedNodes}
          selectedEdges={selectedEdges}
          onShapeChange={changeNodeShape}
          onColorChange={changeNodeColor}
          onSizeChange={changeNodeSize}
          onFontChange={changeNodeFont}
          onEdgeStyleChange={changeEdgeStyle}
        />

        <ColorPalette
          selectedNodes={selectedNodes}
          onColorChange={changeNodeColor}
        />

        <HelpPanel
          isVisible={showHelp}
          onClose={() => setShowHelp(false)}
        />

        <O4MiniAI
          isVisible={showO4Mini}
          onClose={() => setShowO4Mini(false)}
          onGenerateMindMap={(suggestions) => {
            // Generate mind map from AI suggestions
            const centralNode = nodes.find(node => node.data.nodeType === 'central');
            if (!centralNode) return;

            const newNodes = [];
            const newEdges = [];
            let nodeIndex = 0;

            suggestions.forEach((suggestion, index) => {
              if (suggestion.type === 'node' && suggestion.content) {
                const angle = (nodeIndex * 60) * Math.PI / 180;
                const radius = 200;
                
                const newNode = {
                  id: `ai-node-${Date.now()}-${index}`,
                  position: {
                    x: centralNode.position.x + Math.cos(angle) * radius,
                    y: centralNode.position.y + Math.sin(angle) * radius,
                  },
                  data: { 
                    label: suggestion.content, 
                    nodeType: 'main',
                    size: 'medium',
                    onLabelChange: () => {}
                  },
                  type: selectedShape,
                };

                const newEdge = {
                  id: `ai-edge-${centralNode.id}-${newNode.id}`,
                  source: centralNode.id,
                  target: newNode.id,
                  type: 'animated',
                  style: { strokeWidth: 3, stroke: '#10b981' },
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#10b981',
                  },
                  data: { label: suggestion.description },
                };

                newNodes.push(newNode);
                newEdges.push(newEdge);
                nodeIndex++;
              }
            });

            setNodes((nds) => [...nds, ...newNodes]);
            setEdges((eds) => [...eds, ...newEdges]);
            setShowO4Mini(false);
          }}
        />

        <SettingsPanel
          isVisible={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onSettingsChange={setSettings}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

export default App;