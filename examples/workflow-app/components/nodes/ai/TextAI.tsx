'use client';

import { useChat } from '@ai-sdk/react';
import { type NodeProps, useReactFlow, getIncomers } from '@xyflow/react';
import { useState, useCallback, useEffect } from 'react';
import { PlayIcon, SquareIcon, CopyIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { NodeLayout } from '../../NodeLayout';

type TextAIData = {
  instructions?: string;
  generated?: {
    text: string;
  };
};

export const TextAINode = ({ id, data, selected }: NodeProps<TextAIData>) => {
  const d = (data ?? {}) as TextAIData;
  const [instructions, setInstructions] = useState(d.instructions ?? '');
  const { updateNodeData, getNodes, getEdges } = useReactFlow();
  
  const { messages, append, isLoading, stop } = useChat({
    api: '/api/chat',
    onFinish: (message) => {
      updateNodeData(id, {
        generated: { text: message.content }
      });
    },
    onError: (error) => {
      console.error('Chat error:', error);
      alert('Error generating text: ' + error.message);
    },
  });

  // Get text from connected nodes
  const getConnectedText = useCallback(() => {
    const incomers = getIncomers({ id }, getNodes(), getEdges());
    const texts: string[] = [];
    
    incomers.forEach(node => {
      if (node.type === 'textai' && node.data?.generated?.text) {
        texts.push(node.data.generated.text);
      }
      if (node.data?.label) {
        texts.push(node.data.label);
      }
    });
    
    return texts.join('\n\n');
  }, [id, getNodes, getEdges]);

  const handleGenerate = useCallback(async () => {
    if (!append || typeof append !== 'function') {
      alert('AI service not properly initialized. Please refresh the page.');
      return;
    }

    const connectedText = getConnectedText();
    const content: string[] = [];

    if (instructions) {
      content.push('Instructions:', instructions);
    }

    if (connectedText) {
      content.push('Context:', connectedText);
    }

    if (content.length === 0) {
      alert('Please provide instructions or connect input nodes');
      return;
    }

    try {
      await append({
        role: 'user',
        content: content.join('\n\n')
      });
    } catch (error) {
      console.error('Generate error:', error);
      alert('Failed to generate text. Please try again.');
    }
  }, [instructions, getConnectedText, append]);

  const handleCopy = useCallback(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content) {
      navigator.clipboard.writeText(lastMessage.content);
    }
  }, [messages]);

  const lastMessage = messages[messages.length - 1];
  const hasResponse = lastMessage && lastMessage.role === 'assistant';

  return (
    <NodeLayout id={id} title="Text AI" type="textai">
      <div className="min-w-[320px] max-w-[520px] space-y-4 text-white">
        <div>
          <label className="block text-sm font-semibold mb-3 text-white/90 tracking-wide">
            ✨ Instructions
          </label>
          <textarea
            value={instructions}
            onChange={(e) => {
              setInstructions(e.target.value);
              updateNodeData(id, { instructions: e.target.value });
            }}
            placeholder="Enter your instructions for the AI..."
            className="w-full p-4 glass-panel rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          {isLoading ? (
            <button
              onClick={stop}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <SquareIcon size={16} />
              Stop
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <PlayIcon size={16} />
              Generate
            </button>
          )}

          {hasResponse && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 px-6 py-3 glass-button text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CopyIcon size={16} />
              Copy
            </button>
          )}
        </div>

        {messages.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <div className="max-h-[320px] overflow-y-auto space-y-3 custom-scrollbar">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-sm transition-all duration-300 ${
                    message.role === 'user'
                      ? 'glass-panel border-l-4 border-blue-400'
                      : 'glass-panel border-l-4 border-green-400'
                  }`}
                >
                  <div className="font-medium mb-1 text-xs uppercase tracking-wide text-gray-400">
                    {message.role === 'user' ? 'User' : 'AI'}
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="p-2 bg-[#333] rounded text-sm text-white">
                  <div className="font-medium mb-1 text-xs uppercase tracking-wide text-gray-400">
                    AI
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>Generating response...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </NodeLayout>
  );
};

export default TextAINode;
