'use client';

import React, { useState, createContext, useContext } from 'react';
import { useReactFlow } from '@xyflow/react';

// Create context for edge type
const EdgeTypeContext = createContext<{
  currentEdgeType: string;
  setCurrentEdgeType: (type: string) => void;
}>({
  currentEdgeType: 'default',
  setCurrentEdgeType: () => {}
});

export const EdgeTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEdgeType, setCurrentEdgeType] = useState('default');
  
  return (
    <EdgeTypeContext.Provider value={{ currentEdgeType, setCurrentEdgeType }}>
      {children}
    </EdgeTypeContext.Provider>
  );
};

export const useEdgeType = () => useContext(EdgeTypeContext);

const edgeTypes = [
  { value: 'default', label: 'Default' },
  { value: 'animated', label: 'Animated' },
  { value: 'straight', label: 'Straight' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'thick', label: 'Thick' },
  { value: 'step', label: 'Step' },
  { value: 'smoothstep', label: 'Smooth Step' },
  { value: 'crowsfoot', label: 'Crowsfoot' }
];

export const WorkingEdgeSelector = () => {
  const { currentEdgeType, setCurrentEdgeType } = useEdgeType();
  const { getEdges, setEdges } = useReactFlow();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    console.log('Edge type changed to:', newType);
    setCurrentEdgeType(newType);
    
    // Optional: Apply to all existing edges
    const applyToExisting = window.confirm('Apply this edge type to all existing edges?');
    if (applyToExisting) {
      const edges = getEdges();
      const updatedEdges = edges.map(edge => ({
        ...edge,
        type: newType
      }));
      setEdges(updatedEdges);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-white text-sm font-medium">Edge:</label>
      <select
        value={currentEdgeType}
        onChange={handleChange}
        className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ minWidth: '120px' }}
      >
        {edgeTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorkingEdgeSelector;
