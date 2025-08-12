'use client';

import { Handle, Position, useReactFlow } from '@xyflow/react';
import { CopyIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { type ReactNode, useCallback } from 'react';
import { useNodeOperations } from './providers/NodeOperationsProvider';
import NodeStatusIndicator from './NodeStatusIndicator';
import { NodeState } from '../lib/workflow-engine';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './ui/context-menu';

type NodeLayoutProps = {
  children: ReactNode;
  id: string;
  title: string;
  type: string;
  className?: string;
  state?: NodeState;
  progress?: number;
  error?: string;
  executionTime?: number;
};

export const NodeLayout = ({
  children,
  type,
  id,
  title,
  className = '',
  state,
  progress,
  error,
  executionTime,
}: NodeLayoutProps) => {
  const { deleteElements, updateNode, fitView } = useReactFlow();
  const { duplicateNode } = useNodeOperations();

  const handleDelete = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [deleteElements, id]);

  const handleFocus = useCallback(() => {
    updateNode(id, { selected: true });
    fitView({ nodes: [{ id }], duration: 800 });
  }, [updateNode, id, fitView]);

  const handleSelect = useCallback(() => {
    updateNode(id, { selected: true });
  }, [updateNode, id]);

  return (
    <>
      {type !== 'drop' && (
        <Handle type="target" position={Position.Left} />
      )}
      <ContextMenu onOpenChange={handleSelect}>
        <ContextMenuTrigger>
          <div className="relative size-full h-auto w-80">
            {type !== 'drop' && !['rectangle', 'diamond', 'triangle', 'ellipse', 'heart', 'hexagon', 'star', 'lightning'].includes(type) && (
              <div className="-translate-y-full -top-2 absolute right-0 left-0 flex shrink-0 items-center justify-between">
                <p className="font-mono text-white text-xs tracking-tighter">
                  {title}
                </p>
              </div>
            )}
            <div
              className={`node-container flex size-full flex-col divide-y rounded-3xl glass-panel p-4 shadow-2xl transition-all hover:shadow-2xl text-white ${className} relative`}
            >
              <NodeStatusIndicator
                state={state}
                progress={progress}
                error={error}
                executionTime={executionTime}
              />
              <div className="overflow-hidden rounded-2xl bg-transparent">
                {children}
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => duplicateNode(id)}>
            <CopyIcon size={12} />
            <span>Duplicate</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={handleFocus}>
            <EyeIcon size={12} />
            <span>Focus</span>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleDelete} variant="destructive">
            <TrashIcon size={12} />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {type !== 'drop' && (
        <Handle type="source" position={Position.Right} />
      )}
    </>
  );
};
