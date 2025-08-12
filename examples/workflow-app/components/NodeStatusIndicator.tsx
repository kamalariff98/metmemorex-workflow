'use client';

import { CheckCircle, XCircle, Clock, Play, Pause } from 'lucide-react';
import { NodeState } from '../lib/workflow-engine';

interface NodeStatusIndicatorProps {
  state?: NodeState;
  progress?: number;
  error?: string;
  executionTime?: number;
  className?: string;
}

export default function NodeStatusIndicator({ 
  state = 'idle', 
  progress = 0, 
  error, 
  executionTime,
  className = '' 
}: NodeStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (state) {
      case 'running':
        return {
          icon: <Clock size={12} className="animate-spin" />,
          color: 'text-blue-400',
          bg: 'bg-blue-400/20',
          border: 'border-blue-400/50',
          label: 'Running',
        };
      case 'completed':
        return {
          icon: <CheckCircle size={12} />,
          color: 'text-green-400',
          bg: 'bg-green-400/20',
          border: 'border-green-400/50',
          label: 'Completed',
        };
      case 'error':
        return {
          icon: <XCircle size={12} />,
          color: 'text-red-400',
          bg: 'bg-red-400/20',
          border: 'border-red-400/50',
          label: 'Error',
        };
      case 'waiting':
        return {
          icon: <Pause size={12} />,
          color: 'text-yellow-400',
          bg: 'bg-yellow-400/20',
          border: 'border-yellow-400/50',
          label: 'Waiting',
        };
      default:
        return {
          icon: <Play size={12} />,
          color: 'text-gray-400',
          bg: 'bg-gray-400/20',
          border: 'border-gray-400/50',
          label: 'Ready',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`absolute -top-2 -right-2 ${className}`}>
      <div 
        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${config.bg} ${config.border} ${config.color}`}
        title={error || `${config.label}${executionTime ? ` (${executionTime}ms)` : ''}`}
      >
        {config.icon}
        {state === 'running' && (
          <span className="min-w-[30px]">{progress}%</span>
        )}
        {state === 'completed' && executionTime && (
          <span className="text-xs">{executionTime}ms</span>
        )}
        {state === 'error' && (
          <span className="text-xs">!</span>
        )}
      </div>
      
      {/* Progress bar for running state */}
      {state === 'running' && (
        <div className="absolute top-full left-0 right-0 mt-1">
          <div className="w-full bg-gray-700/50 rounded-full h-1">
            <div
              className="bg-blue-400 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

