'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EnhancedEdgeType, EnhancedEdgeContextType } from '../types';
import { getEdgeStyle } from '../utils/edgeStyles';

const EnhancedEdgeContext = createContext<EnhancedEdgeContextType | undefined>(undefined);

export interface EnhancedEdgeProviderProps {
  children: ReactNode;
  onChange?: (type: EnhancedEdgeType) => void;
  defaultType?: EnhancedEdgeType;
}

export const EnhancedEdgeProvider: React.FC<EnhancedEdgeProviderProps> = ({ 
  children, 
  onChange,
  defaultType = 'default' 
}) => {
  const [currentEdgeType, setCurrentEdgeType] = useState<EnhancedEdgeType>(defaultType);

  const setEdgeType = (type: EnhancedEdgeType) => {
    setCurrentEdgeType(type);
    onChange?.(type);
  };

  const value: EnhancedEdgeContextType = {
    currentEdgeType,
    setCurrentEdgeType: setEdgeType,
    getEdgeStyle,
  };

  return (
    <EnhancedEdgeContext.Provider value={value}>
      {children}
    </EnhancedEdgeContext.Provider>
  );
};

export const useEnhancedEdge = () => {
  const context = useContext(EnhancedEdgeContext);
  if (context === undefined) {
    throw new Error('useEnhancedEdge must be used within an EnhancedEdgeProvider');
  }
  return context;
};
