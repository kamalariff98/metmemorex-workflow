'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, Activity, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Panel } from '@xyflow/react';
import { workflowEngine, NodeState } from '../lib/workflow-engine';

interface WorkflowControlsProps {
  onExecute: () => void;
  onStop: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export default function WorkflowControls({ 
  onExecute, 
  onStop, 
  onReset, 
  isRunning 
}: WorkflowControlsProps) {
  const [stats, setStats] = useState({
    totalNodes: 0,
    completedNodes: 0,
    errorNodes: 0,
    runningNodes: 0,
    totalEdges: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      setStats(workflowEngine.getWorkflowStats());
    };

    // Update stats every second when running
    const interval = setInterval(updateStats, 1000);
    updateStats(); // Initial update

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <Panel position="top-right" className="m-6">
      <div className="glass-panel rounded-2xl p-4 min-w-[280px] space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Activity className="text-blue-400" size={20} />
          <h3 className="text-white font-semibold">Workflow Controls</h3>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button
              onClick={onExecute}
              disabled={stats.totalNodes === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              <Play size={16} />
              Execute
            </button>
          ) : (
            <button
              onClick={onStop}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Square size={16} />
              Stop
            </button>
          )}

          <button
            onClick={onReset}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 glass-button text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* Statistics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Total Nodes:</span>
            <span className="text-white font-medium">{stats.totalNodes}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300 flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              Completed:
            </span>
            <span className="text-green-400 font-medium">{stats.completedNodes}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300 flex items-center gap-2">
              <Clock size={14} className="text-blue-400" />
              Running:
            </span>
            <span className="text-blue-400 font-medium">{stats.runningNodes}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300 flex items-center gap-2">
              <XCircle size={14} className="text-red-400" />
              Errors:
            </span>
            <span className="text-red-400 font-medium">{stats.errorNodes}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Total Edges:</span>
            <span className="text-white font-medium">{stats.totalEdges}</span>
          </div>
        </div>

        {/* Progress Bar */}
        {stats.totalNodes > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-300">
              <span>Progress</span>
              <span>{Math.round((stats.completedNodes / stats.totalNodes) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(stats.completedNodes / stats.totalNodes) * 100}%`
                }}
              />
            </div>
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${
            isRunning 
              ? 'bg-blue-400 animate-pulse' 
              : stats.errorNodes > 0 
                ? 'bg-red-400' 
                : stats.completedNodes === stats.totalNodes && stats.totalNodes > 0
                  ? 'bg-green-400'
                  : 'bg-gray-400'
          }`} />
          <span className="text-gray-300">
            {isRunning 
              ? 'Executing...' 
              : stats.errorNodes > 0 
                ? 'Has Errors' 
                : stats.completedNodes === stats.totalNodes && stats.totalNodes > 0
                  ? 'Completed'
                  : 'Ready'
            }
          </span>
        </div>
      </div>
    </Panel>
  );
}

