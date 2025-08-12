'use client';

import { Node, Edge } from '@xyflow/react';

export type NodeState = 'idle' | 'running' | 'completed' | 'error' | 'waiting';

export interface WorkflowNode extends Node {
  data: {
    state?: NodeState;
    progress?: number;
    error?: string;
    output?: any;
    lastExecuted?: Date;
    executionTime?: number;
    [key: string]: any;
  };
}

export interface WorkflowEdge extends Edge {
  data?: {
    dataType?: 'text' | 'code' | 'image' | 'json' | 'any';
    validated?: boolean;
    lastDataFlow?: Date;
    [key: string]: any;
  };
}

export class WorkflowEngine {
  private nodes: Map<string, WorkflowNode> = new Map();
  private edges: Map<string, WorkflowEdge> = new Map();
  private isRunning = false;
  private executionQueue: string[] = [];
  
  constructor() {}

  updateNodes(nodes: WorkflowNode[]) {
    this.nodes.clear();
    nodes.forEach(node => this.nodes.set(node.id, node));
  }

  updateEdges(edges: WorkflowEdge[]) {
    this.edges.clear();
    edges.forEach(edge => this.edges.set(edge.id, edge));
  }

  // Get all nodes that have no incoming edges (start nodes)
  getStartNodes(): WorkflowNode[] {
    const nodeIds = Array.from(this.nodes.keys());
    const nodesWithIncoming = new Set(
      Array.from(this.edges.values()).map(edge => edge.target)
    );
    
    return nodeIds
      .filter(id => !nodesWithIncoming.has(id))
      .map(id => this.nodes.get(id)!)
      .filter(Boolean);
  }

  // Get nodes that can be executed (all dependencies completed)
  getExecutableNodes(): WorkflowNode[] {
    const executable: WorkflowNode[] = [];
    
    for (const node of this.nodes.values()) {
      if (node.data.state === 'completed' || node.data.state === 'running') {
        continue;
      }

      const incomingEdges = Array.from(this.edges.values())
        .filter(edge => edge.target === node.id);
      
      if (incomingEdges.length === 0) {
        // Start node
        executable.push(node);
      } else {
        // Check if all dependencies are completed
        const allDependenciesComplete = incomingEdges.every(edge => {
          const sourceNode = this.nodes.get(edge.source);
          return sourceNode?.data.state === 'completed';
        });

        if (allDependenciesComplete) {
          executable.push(node);
        }
      }
    }

    return executable;
  }

  // Validate edge connections based on node types and data compatibility
  validateConnection(sourceId: string, targetId: string, sourceHandle?: string, targetHandle?: string): boolean {
    const sourceNode = this.nodes.get(sourceId);
    const targetNode = this.nodes.get(targetId);

    if (!sourceNode || !targetNode) return false;

    // Prevent self-connections
    if (sourceId === targetId) return false;

    // Check for cycles
    if (this.wouldCreateCycle(sourceId, targetId)) return false;

    // Type-specific validation
    if (this.isAINode(sourceNode.type) && this.isAINode(targetNode.type)) {
      // AI to AI connections are allowed
      return true;
    }

    if (this.isShapeNode(sourceNode.type) && this.isAINode(targetNode.type)) {
      // Shape to AI connections are allowed
      return true;
    }

    if (this.isAINode(sourceNode.type) && this.isShapeNode(targetNode.type)) {
      // AI to Shape connections are allowed for output
      return true;
    }

    // Default allow all connections for now
    return true;
  }

  private wouldCreateCycle(sourceId: string, targetId: string): boolean {
    const visited = new Set<string>();
    const stack = [targetId];

    while (stack.length > 0) {
      const currentId = stack.pop()!;
      
      if (currentId === sourceId) {
        return true; // Cycle detected
      }

      if (visited.has(currentId)) {
        continue;
      }

      visited.add(currentId);

      // Add all nodes that this node connects to
      const outgoingEdges = Array.from(this.edges.values())
        .filter(edge => edge.source === currentId);
      
      outgoingEdges.forEach(edge => {
        if (!visited.has(edge.target)) {
          stack.push(edge.target);
        }
      });
    }

    return false;
  }

  private isAINode(nodeType?: string): boolean {
    return ['textai', 'codeai', 'imageai'].includes(nodeType || '');
  }

  private isShapeNode(nodeType?: string): boolean {
    return ['rectangle', 'diamond', 'triangle', 'ellipse', 'heart', 'hexagon', 'star', 'lightning'].includes(nodeType || '');
  }

  // Execute a single node
  async executeNode(nodeId: string, onNodeUpdate: (node: WorkflowNode) => void): Promise<void> {
    const node = this.nodes.get(nodeId);
    if (!node) return;

    // Update node state to running
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        state: 'running' as NodeState,
        progress: 0,
        error: undefined,
        lastExecuted: new Date(),
      }
    };
    this.nodes.set(nodeId, updatedNode);
    onNodeUpdate(updatedNode);

    try {
      const startTime = Date.now();
      
      // Simulate execution time and progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const progressNode = {
          ...updatedNode,
          data: {
            ...updatedNode.data,
            progress,
          }
        };
        this.nodes.set(nodeId, progressNode);
        onNodeUpdate(progressNode);
      }

      // Get input data from connected nodes
      const inputData = this.getNodeInputData(nodeId);

      // Execute node-specific logic
      const output = await this.executeNodeLogic(node, inputData);

      const executionTime = Date.now() - startTime;

      // Update node state to completed
      const completedNode = {
        ...updatedNode,
        data: {
          ...updatedNode.data,
          state: 'completed' as NodeState,
          progress: 100,
          output,
          executionTime,
        }
      };
      this.nodes.set(nodeId, completedNode);
      onNodeUpdate(completedNode);

    } catch (error) {
      // Update node state to error
      const errorNode = {
        ...updatedNode,
        data: {
          ...updatedNode.data,
          state: 'error' as NodeState,
          error: error instanceof Error ? error.message : 'Unknown error',
          progress: 0,
        }
      };
      this.nodes.set(nodeId, errorNode);
      onNodeUpdate(errorNode);
    }
  }

  private getNodeInputData(nodeId: string): any {
    const incomingEdges = Array.from(this.edges.values())
      .filter(edge => edge.target === nodeId);
    
    const inputData: any = {};
    
    incomingEdges.forEach(edge => {
      const sourceNode = this.nodes.get(edge.source);
      if (sourceNode?.data.output) {
        inputData[edge.source] = sourceNode.data.output;
      }
    });

    return inputData;
  }

  private async executeNodeLogic(node: WorkflowNode, inputData: any): Promise<any> {
    switch (node.type) {
      case 'textai':
        return this.executeTextAI(node, inputData);
      case 'codeai':
        return this.executeCodeAI(node, inputData);
      case 'imageai':
        return this.executeImageAI(node, inputData);
      case 'rectangle':

      case 'diamond':
      case 'triangle':
      case 'ellipse':
      case 'heart':
      case 'hexagon':
      case 'star':
      case 'lightning':
        return this.executeShapeNode(node, inputData);
      default:
        return { message: 'Node executed successfully', timestamp: new Date() };
    }
  }

  private async executeTextAI(node: WorkflowNode, inputData: any): Promise<any> {
    // Simulate chaiNNer AI processing based on node context
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const instructions = node.data.instructions || 'AI Processing';
    const context = Object.values(inputData).join(' ');
    
    // Determine processing type based on node label or instructions
    const isUpscaler = instructions.toLowerCase().includes('upscal') || node.data.label?.toLowerCase().includes('upscal');
    const isFrameProcessor = instructions.toLowerCase().includes('frame') || node.data.label?.toLowerCase().includes('frame');
    
    if (isUpscaler) {
      return {
        type: 'image_upscale',
        model: 'ESRGAN-4x',
        content: `Image upscaled 4x using ${instructions}`,
        dimensions: { width: 2048, height: 2048 },
        timestamp: new Date(),
        processingTime: Math.floor(Math.random() * 3000) + 1000,
      };
    }
    
    if (isFrameProcessor) {
      return {
        type: 'video_frame',
        content: `Video frames processed with ${instructions}`,
        frameCount: Math.floor(Math.random() * 1000) + 100,
        timestamp: new Date(),
        processingTime: Math.floor(Math.random() * 5000) + 2000,
      };
    }
    
    return {
      type: 'ai_text',
      content: `AI processed: "${instructions}"${context ? ` with context: ${context}` : ''}`,
      timestamp: new Date(),
      confidence: Math.floor(Math.random() * 30) + 70,
    };
  }

  private async executeCodeAI(node: WorkflowNode, inputData: any): Promise<any> {
    // Simulate AI code generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const language = node.data.language || 'javascript';
    const instructions = node.data.instructions || 'Generate code';
    
    return {
      type: 'code',
      language,
      content: `// Generated ${language} code\n// Based on: ${instructions}\nfunction generatedFunction() {\n  return "Hello, World!";\n}`,
      timestamp: new Date(),
      linesOfCode: Math.floor(Math.random() * 50) + 10,
    };
  }

  private async executeImageAI(node: WorkflowNode, inputData: any): Promise<any> {
    // Simulate chaiNNer image processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const prompt = node.data.prompt || 'Process image';
    const isBackgroundRemoval = prompt.toLowerCase().includes('background') || node.data.label?.toLowerCase().includes('background');
    const isU2Net = prompt.toLowerCase().includes('u2net') || node.data.label?.toLowerCase().includes('u2net');
    
    if (isBackgroundRemoval || isU2Net) {
      return {
        type: 'background_removal',
        model: 'U2Net',
        prompt,
        result: 'Background successfully removed',
        outputFormat: 'PNG with alpha channel',
        timestamp: new Date(),
        confidence: Math.floor(Math.random() * 20) + 80,
      };
    }
    
    return {
      type: 'image_generation',
      prompt,
      url: `https://picsum.photos/512/512?random=${Math.random()}`,
      timestamp: new Date(),
      dimensions: { width: 512, height: 512 },
      model: 'DALL-E',
    };
  }

  private async executeShapeNode(node: WorkflowNode, inputData: any): Promise<any> {
    // Process shape node data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      type: 'shape',
      nodeType: node.type,
      label: node.data.label || 'Shape',
      inputData,
      timestamp: new Date(),
    };
  }

  // Execute entire workflow
  async executeWorkflow(onNodeUpdate: (node: WorkflowNode) => void, onComplete: () => void): Promise<void> {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    try {
      // Reset all node states
      for (const node of this.nodes.values()) {
        const resetNode = {
          ...node,
          data: {
            ...node.data,
            state: 'idle' as NodeState,
            progress: 0,
            error: undefined,
            output: undefined,
          }
        };
        this.nodes.set(node.id, resetNode);
        onNodeUpdate(resetNode);
      }

      // Execute nodes in dependency order
      while (true) {
        const executableNodes = this.getExecutableNodes();
        
        if (executableNodes.length === 0) {
          break; // No more nodes to execute
        }

        // Execute all executable nodes in parallel
        await Promise.all(
          executableNodes.map(node => this.executeNode(node.id, onNodeUpdate))
        );
      }

      onComplete();
    } finally {
      this.isRunning = false;
    }
  }

  // Stop workflow execution
  stopWorkflow(): void {
    this.isRunning = false;
    this.executionQueue = [];
  }

  // Get workflow statistics
  getWorkflowStats(): {
    totalNodes: number;
    completedNodes: number;
    errorNodes: number;
    runningNodes: number;
    totalEdges: number;
  } {
    const nodes = Array.from(this.nodes.values());
    
    return {
      totalNodes: nodes.length,
      completedNodes: nodes.filter(n => n.data.state === 'completed').length,
      errorNodes: nodes.filter(n => n.data.state === 'error').length,
      runningNodes: nodes.filter(n => n.data.state === 'running').length,
      totalEdges: this.edges.size,
    };
  }
}

// Global workflow engine instance
export const workflowEngine = new WorkflowEngine();
