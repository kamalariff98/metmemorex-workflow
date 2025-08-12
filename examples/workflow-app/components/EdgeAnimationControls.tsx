'use client';

import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { Play, Pause, RotateCcw, Zap, Activity, Waves, Target } from 'lucide-react';

interface AnimationPreset {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  animation: {
    type: 'animated' | 'dashed' | 'thick';
    style: Record<string, any>;
  };
}

const animationPresets: AnimationPreset[] = [
  {
    id: 'data-flow',
    name: 'Data Flow',
    icon: <Activity size={14} />,
    description: 'Smooth data processing animation',
    color: 'text-green-400',
    animation: {
      type: 'animated',
      style: {
        stroke: '#10b981',
        strokeWidth: 3,
        opacity: 0.9,
        filter: 'url(#glow)'
      }
    }
  },
  {
    id: 'pulse',
    name: 'Pulse',
    icon: <Target size={14} />,
    description: 'Pulsing connection indicator',
    color: 'text-blue-400',
    animation: {
      type: 'thick',
      style: {
        stroke: '#3b82f6',
        strokeWidth: 4,
        opacity: 0.8,
        animation: 'pulse 2s infinite'
      }
    }
  },
  {
    id: 'wave',
    name: 'Wave',
    icon: <Waves size={14} />,
    description: 'Wave-like motion effect',
    color: 'text-purple-400',
    animation: {
      type: 'animated',
      style: {
        stroke: '#8b5cf6',
        strokeWidth: 2,
        opacity: 0.85,
        strokeDasharray: '10,5',
        animation: 'wave 3s infinite linear'
      }
    }
  },
  {
    id: 'electric',
    name: 'Electric',
    icon: <Zap size={14} />,
    description: 'Electric current simulation',
    color: 'text-yellow-400',
    animation: {
      type: 'dashed',
      style: {
        stroke: '#eab308',
        strokeWidth: 2,
        opacity: 0.9,
        strokeDasharray: '5,5',
        animation: 'electric 1s infinite linear'
      }
    }
  }
];

const speedOptions = [
  { label: 'Slow', value: '4s', multiplier: 4 },
  { label: 'Normal', value: '2s', multiplier: 2 },
  { label: 'Fast', value: '1s', multiplier: 1 },
  { label: 'Turbo', value: '0.5s', multiplier: 0.5 }
];

interface EdgeAnimationControlsProps {
  className?: string;
}

export const EdgeAnimationControls: React.FC<EdgeAnimationControlsProps> = ({
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedSpeed, setSelectedSpeed] = useState(1); // Normal speed index
  const { getEdges, setEdges } = useReactFlow();

  const applyAnimation = (preset: AnimationPreset) => {
    const edges = getEdges();
    const speed = speedOptions[selectedSpeed];
    
    const updatedEdges = edges.map(edge => ({
      ...edge,
      type: preset.animation.type,
      style: {
        ...edge.style,
        ...preset.animation.style,
        animationDuration: speed.value,
        animationPlayState: isAnimating ? 'running' : 'paused'
      }
    }));
    setEdges(updatedEdges);
  };

  const toggleAnimation = () => {
    const newState = !isAnimating;
    setIsAnimating(newState);
    
    const edges = getEdges();
    const updatedEdges = edges.map(edge => ({
      ...edge,
      style: {
        ...edge.style,
        animationPlayState: newState ? 'running' : 'paused'
      }
    }));
    setEdges(updatedEdges);
  };

  const resetAnimations = () => {
    const edges = getEdges();
    const updatedEdges = edges.map(edge => ({
      ...edge,
      style: {
        ...edge.style,
        animation: 'none',
        animationPlayState: 'initial'
      }
    }));
    setEdges(updatedEdges);
    setIsAnimating(false);
  };

  const changeSpeed = (speedIndex: number) => {
    setSelectedSpeed(speedIndex);
    const speed = speedOptions[speedIndex];
    
    const edges = getEdges();
    const updatedEdges = edges.map(edge => ({
      ...edge,
      style: {
        ...edge.style,
        animationDuration: speed.value
      }
    }));
    setEdges(updatedEdges);
  };

  return (
    <div className={`glass-panel rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Play size={16} className="text-white" />
          <span className="text-white font-medium">Edge Animations</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAnimation}
            className={`glass-button p-2 rounded-lg hover:scale-105 transition-all duration-300 ${
              isAnimating ? 'text-green-400' : 'text-gray-400'
            }`}
            title={isAnimating ? 'Pause animations' : 'Play animations'}
          >
            {isAnimating ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={resetAnimations}
            className="glass-button p-2 rounded-lg hover:scale-105 transition-all duration-300 text-red-400"
            title="Reset all animations"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Animation Presets */}
      <div className="mb-4">
        <div className="text-white/60 text-xs font-medium mb-2">Animation Presets</div>
        <div className="grid grid-cols-2 gap-2">
          {animationPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyAnimation(preset)}
              className="glass-button rounded-lg p-3 hover:scale-105 transition-all duration-300 group text-left"
              title={preset.description}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`${preset.color} group-hover:scale-110 transition-transform duration-200`}>
                  {preset.icon}
                </span>
                <span className="text-white text-sm font-medium">
                  {preset.name}
                </span>
              </div>
              <div className="text-white/60 text-xs">
                {preset.description}
              </div>
              
              {/* Preview Line */}
              <div className="mt-2 flex justify-center">
                <svg width="40" height="12" className="overflow-visible">
                  <path
                    d="M 2 6 Q 20 3 38 6"
                    fill="none"
                    stroke={preset.animation.style.stroke}
                    strokeWidth="2"
                    strokeDasharray={preset.animation.style.strokeDasharray}
                    opacity={preset.animation.style.opacity || 1}
                    className={`${isAnimating ? 'animate-pulse' : ''}`}
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Speed Control */}
      <div className="mb-4">
        <div className="text-white/60 text-xs font-medium mb-2">
          Animation Speed: {speedOptions[selectedSpeed].label}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {speedOptions.map((speed, index) => (
            <button
              key={speed.label}
              onClick={() => changeSpeed(index)}
              className={`glass-button px-2 py-1.5 rounded-lg text-xs transition-all duration-200 hover:scale-105 ${
                selectedSpeed === index ? 'bg-white/20 ring-1 ring-white/30' : ''
              }`}
            >
              {speed.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="border-t border-white/10 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs">
            Animation Status
          </span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isAnimating ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className="text-white text-xs font-medium">
              {isAnimating ? 'Running' : 'Paused'}
            </span>
          </div>
        </div>
      </div>


    </div>
  );
};

export default EdgeAnimationControls;
