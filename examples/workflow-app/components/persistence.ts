'use client';

import { useEffect } from 'react';
import { useReactFlow } from '@xyflow/react';

const STORAGE_KEY = 'workflow-app:flow';

export function useLocalStoragePersistence() {
  const { toObject, setNodes, setEdges } = useReactFlow();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const flow = JSON.parse(raw);
      if (flow?.nodes && flow?.edges) {
        setNodes(flow.nodes);
        setEdges(flow.edges);
      }
    } catch {}
  }, [setNodes, setEdges]);

  useEffect(() => {
    const save = () => {
      const flow = toObject();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
    };
    const id = setInterval(save, 1000);
    return () => clearInterval(id);
  }, [toObject]);
}

export function exportFlow(toObject: () => unknown) {
  const dataStr = JSON.stringify(toObject(), null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', 'workflow.json');
  link.click();
}


