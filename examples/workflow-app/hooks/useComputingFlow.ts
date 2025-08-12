'use client';

import { useCallback } from 'react';
import { useReactFlow, useNodesData, useNodeConnections } from '@xyflow/react';

export type NodeData = {
  label?: string;
  value?: any;
  result?: any;
  operation?: 'text' | 'uppercase' | 'lowercase' | 'reverse' | 'concat' | 'multiply' | 'add' | 'result';
  inputs?: string[];
  [key: string]: any;
};

export const useComputingFlow = (nodeId: string) => {
  const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections();
  
  // Get data from connected source nodes
  const sourceConnections = connections.filter(connection => connection.type === 'target');
  const sourceNodeIds = sourceConnections.map(connection => connection.source);
  const sourceNodesData = useNodesData(sourceNodeIds);

  // Update node data
  const updateData = useCallback((newData: Partial<NodeData>) => {
    updateNodeData(nodeId, newData);
  }, [nodeId, updateNodeData]);

  // Compute result based on operation and input data
  const computeResult = useCallback((operation: string, inputs: any[]) => {
    switch (operation) {
      case 'uppercase':
        return inputs.map(input => 
          typeof input === 'string' ? input.toUpperCase() : String(input).toUpperCase()
        ).join('');
      
      case 'lowercase':
        return inputs.map(input => 
          typeof input === 'string' ? input.toLowerCase() : String(input).toLowerCase()
        ).join('');
      
      case 'reverse':
        return inputs.map(input => 
          typeof input === 'string' ? input.split('').reverse().join('') : String(input).split('').reverse().join('')
        ).join('');
      
      case 'concat':
        return inputs.map(input => String(input)).join(' ');
      
      case 'add':
        return inputs.reduce((sum, input) => {
          const num = parseFloat(input);
          return sum + (isNaN(num) ? 0 : num);
        }, 0);
      
      case 'multiply':
        return inputs.reduce((product, input) => {
          const num = parseFloat(input);
          return product * (isNaN(num) ? 1 : num);
        }, 1);
      
      case 'result':
        return inputs.join(', ');
      
      default:
        return inputs[0] || '';
    }
  }, []);

  // Get input values from connected nodes
  const getInputValues = useCallback(() => {
    return sourceNodesData.map(nodeData => {
      if (nodeData?.result !== undefined) {
        return nodeData.result;
      }
      if (nodeData?.value !== undefined) {
        return nodeData.value;
      }
      return nodeData?.label || '';
    });
  }, [sourceNodesData]);

  return {
    sourceNodesData,
    connections,
    updateData,
    computeResult,
    getInputValues,
    hasInputs: sourceNodesData.length > 0
  };
};
