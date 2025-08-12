'use client';

import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  getOutgoers,
  type Edge,
  type Node,
  type IsValidConnection,
  type OnConnect,
  type OnConnectStart,
  type OnConnectEnd,
  ConnectionLineType,
} from '@xyflow/react';

import { useCallback, useState, type MouseEvent, type MouseEventHandler } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDebouncedCallback } from 'use-debounce';
import { nanoid } from 'nanoid';
import { PlusIcon, BoxSelectIcon, CopyIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { nodeTypes, edgeTypes } from './nodes';
import Toolbar from './Toolbar';
import { useLocalStoragePersistence } from './persistence';
import WorkflowControls from './WorkflowControls';
import ResizeConfigPanel from './ResizeConfigPanel';
import { workflowEngine, WorkflowNode, WorkflowEdge } from '../lib/workflow-engine';
import { NodeOperationsProvider } from './providers/NodeOperationsProvider';
import { EnhancedEdgeProvider, useEnhancedEdge } from './EnhancedEdgeSelector';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from './ui/context-menu';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function CanvasContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [copiedNodes, setCopiedNodes] = useState<Node[]>([]);
  const [contextMenuNodeId, setContextMenuNodeId] = useState<string | null>(null);
  const [isWorkflowRunning, setIsWorkflowRunning] = useState(false);
  const { currentEdgeType } = useEnhancedEdge();
  
  // Debug: Check if React Flow context is available
  console.log('CanvasContent rendered, currentEdgeType:', currentEdgeType);

  const {
    getEdges,
    getNodes,
    getNode,
    updateNode,
    deleteElements,
    screenToFlowPosition,
  } = useReactFlow();
  
  useLocalStoragePersistence();

  // Save function (simplified for localStorage)
  const save = useDebouncedCallback(() => {
    // Auto-save is handled by persistence hook
  }, 1000);

  // Add node function
  const addNode = useCallback((type: string, options: Record<string, unknown> = {}) => {
    const id = nanoid();
    const newNode: Node = {
      id,
      type,
      position: options.position || { x: 100, y: 100 },
      data: options.data || {},
      ...options,
    };
    setNodes((nds) => [...nds, newNode]);
    return id;
  }, [setNodes]);

  // Duplicate node function
  const duplicateNode = useCallback((nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) return;
    
    const newNode: Node = {
      ...node,
      id: nanoid(),
      position: {
        x: node.position.x + 200,
        y: node.position.y + 200,
      },
      selected: false,
    };
    setNodes((nds) => [...nds, newNode]);
  }, [getNode, setNodes]);



  // Connection handlers
  const handleConnect = useCallback<OnConnect>((connection) => {
    console.log('Creating edge with type:', currentEdgeType);
    const newEdge = {
      ...connection,
      type: 'enhanced', // Use our custom enhanced edge type
      id: nanoid(),
      data: { edgeType: currentEdgeType } // Pass the edge type as data
    };
    setEdges((eds) => addEdge(newEdge, eds));
    save();
  }, [setEdges, save, currentEdgeType]);

  const handleConnectStart = useCallback<OnConnectStart>(() => {
    // Delete any drop nodes when starting to drag a node
    setNodes((nds) => nds.filter((n) => n.type !== 'drop'));
    setEdges((eds) => eds.filter((e) => e.type !== 'temporary'));
    save();
  }, [setNodes, setEdges, save]);

  const handleConnectEnd = useCallback<OnConnectEnd>((event, connectionState) => {
    if (!connectionState.isValid && event.target instanceof HTMLElement) {
      const { x, y } = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      addNode('drop', { position: { x, y } });
    }
  }, [addNode, screenToFlowPosition]);

  // Cycle prevention and workflow engine validation
  const isValidConnection = useCallback<IsValidConnection>((connection) => {
    const nodes = getNodes();
    const edges = getEdges();
    const target = nodes.find((node) => node.id === connection.target);
    const source = nodes.find((node) => node.id === connection.source);

    if (!source || !target || target.id === connection.source) {
      return false;
    }

    // Update workflow engine with current state
    workflowEngine.updateNodes(nodes as WorkflowNode[]);
    workflowEngine.updateEdges(edges as WorkflowEdge[]);

    // Use workflow engine validation
    const isValid = workflowEngine.validateConnection(
      connection.source!, 
      connection.target!, 
      connection.sourceHandle || undefined, 
      connection.targetHandle || undefined
    );

    return isValid;
  }, [getNodes, getEdges]);

  // Double click to add drop node
  const addDropNode = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const { x, y } = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    addNode('drop', { position: { x, y } });
  }, [addNode, screenToFlowPosition]);

  // Keyboard shortcuts
  const handleSelectAll = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) => ({ ...node, selected: true }))
    );
  }, [setNodes]);

  const setNodeOperation = useCallback((nodeId: string, operation: string) => {
    setNodes(nodes => nodes.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, operation } }
        : node
    ));
    save();
  }, [setNodes, save]);

  const handleNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setContextMenuNodeId(node.id);
  }, []);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes(nodes => nodes.filter(node => node.id !== nodeId));
    setEdges(edges => edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    save();
  }, [setNodes, setEdges, save]);

  const handleCopy = useCallback(() => {
    const selectedNodes = getNodes().filter((node) => node.selected);
    if (selectedNodes.length > 0) {
      setCopiedNodes(selectedNodes);
    }
  }, [getNodes]);

  const handlePaste = useCallback(() => {
    if (copiedNodes.length === 0) {
      return;
    }

    const newNodes = copiedNodes.map((node) => ({
      ...node,
      id: nanoid(),
      position: {
        x: node.position.x + 200,
        y: node.position.y + 200,
      },
      selected: true,
    }));

    // Unselect all existing nodes
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        selected: false,
      }))
    );

    // Add new nodes
    setNodes((nodes) => [...nodes, ...newNodes]);
  }, [copiedNodes, setNodes]);

  const handleDuplicateAll = useCallback(() => {
    const selected = getNodes().filter((node) => node.selected);
    for (const node of selected) {
      duplicateNode(node.id);
    }
  }, [getNodes, duplicateNode]);

  const handleContextMenu = useCallback((event: MouseEvent) => {
    if (
      !(event.target instanceof HTMLElement) ||
      !event.target.classList.contains('react-flow__pane')
    ) {
      event.preventDefault();
    }
  }, []);

  // Workflow execution functions
  const executeWorkflow = useCallback(async () => {
    if (isWorkflowRunning) return;
    
    setIsWorkflowRunning(true);
    
    // Update workflow engine with current state
    workflowEngine.updateNodes(getNodes() as WorkflowNode[]);
    workflowEngine.updateEdges(getEdges() as WorkflowEdge[]);

    // Execute workflow
    await workflowEngine.executeWorkflow(
      (updatedNode: WorkflowNode) => {
        // Update node in React Flow
        setNodes(nodes => 
          nodes.map(node => 
            node.id === updatedNode.id 
              ? { ...node, data: updatedNode.data }
              : node
          )
        );
      },
      () => {
        // Workflow completed
        setIsWorkflowRunning(false);
      }
    );
  }, [isWorkflowRunning, getNodes, getEdges, setNodes]);

  const stopWorkflow = useCallback(() => {
    workflowEngine.stopWorkflow();
    setIsWorkflowRunning(false);
  }, []);

  const resetWorkflow = useCallback(() => {
    if (isWorkflowRunning) return;
    
    // Reset all node states
    setNodes(nodes => 
      nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          state: 'idle',
          progress: 0,
          error: undefined,
          output: undefined,
          executionTime: undefined,
        }
      }))
    );
  }, [isWorkflowRunning, setNodes]);

  // Register hotkeys
  useHotkeys('meta+a', handleSelectAll, {
    enableOnContentEditable: false,
    preventDefault: true,
  });

  useHotkeys('meta+d', handleDuplicateAll, {
    enableOnContentEditable: false,
    preventDefault: true,
  });

  useHotkeys('meta+c', handleCopy, {
    enableOnContentEditable: false,
    preventDefault: true,
  });

  useHotkeys('meta+v', handlePaste, {
    enableOnContentEditable: false,
    preventDefault: true,
  });

  return (
    <NodeOperationsProvider addNode={addNode} duplicateNode={duplicateNode}>
      <div style={{ height: '100vh', width: '100vw' }} className="bg-gradient-to-br from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
        <ContextMenu>
          <ContextMenuTrigger onContextMenu={handleContextMenu}>
            <ReactFlow
              deleteKeyCode={['Backspace', 'Delete']}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={handleConnect}
              onNodeContextMenu={handleNodeContextMenu}
              onConnectStart={handleConnectStart}
              onConnectEnd={handleConnectEnd}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              isValidConnection={isValidConnection}
              connectionLineType={ConnectionLineType.SmoothStep}
              panOnScroll
              fitView
              zoomOnDoubleClick={false}
              panOnDrag={false}
              selectionOnDrag={true}
              onDoubleClick={addDropNode}
              onInit={(instance) => {
                (window as any).ReactFlowInstance = instance;
              }}
            >
              <Background />
              <Controls />
              <Toolbar />
              <WorkflowControls
                onExecute={executeWorkflow}
                onStop={stopWorkflow}
                onReset={resetWorkflow}
                isRunning={isWorkflowRunning}
              />
            </ReactFlow>
            


          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={addDropNode}>
              <PlusIcon size={12} />
              <span>Add a new node</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={handleSelectAll}>
              <BoxSelectIcon size={12} />
              <span>Select all</span>
            </ContextMenuItem>
            {contextMenuNodeId && (
              <>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => handleDeleteNode(contextMenuNodeId)}>
                  Delete Node
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Set Operation</ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem onClick={() => setNodeOperation(contextMenuNodeId, 'text')}>
                      Text Input
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setNodeOperation(contextMenuNodeId, 'uppercase')}>
                      Uppercase
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setNodeOperation(contextMenuNodeId, 'lowercase')}>
                      Lowercase
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setNodeOperation(contextMenuNodeId, 'reverse')}>
                      Reverse Text
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setNodeOperation(contextMenuNodeId, 'concat')}>
                      Concatenate
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setNodeOperation(contextMenuNodeId, 'add')}>
                      Add Numbers
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setNodeOperation(contextMenuNodeId, 'multiply')}>
                      Multiply Numbers
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setNodeOperation(contextMenuNodeId, 'result')}>
                      Result Display
                    </ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </>
            )}
          </ContextMenuContent>
        </ContextMenu>
        <ResizeConfigPanel />
      </div>
    </NodeOperationsProvider>
  );
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <EnhancedEdgeProvider>
        <CanvasContent />
      </EnhancedEdgeProvider>
    </ReactFlowProvider>
  );
}


