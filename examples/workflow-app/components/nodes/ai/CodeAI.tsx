'use client';

import { useChat } from '@ai-sdk/react';
import { type NodeProps, useReactFlow, getIncomers } from '@xyflow/react';
import { useState, useCallback } from 'react';
import { PlayIcon, SquareIcon, CopyIcon, CodeIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { NodeLayout } from '../../NodeLayout';

type CodeAIData = {
  instructions?: string;
  language?: string;
  generated?: {
    code: string;
    language: string;
  };
};

const languages = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'rust',
  'php',
  'ruby',
  'swift',
  'kotlin'
];

export const CodeAINode = ({ id, data, selected }: NodeProps<CodeAIData>) => {
  const d = (data ?? {}) as CodeAIData;
  const [instructions, setInstructions] = useState(d.instructions ?? '');
  const [language, setLanguage] = useState(d.language ?? 'javascript');
  const { updateNodeData, getNodes, getEdges } = useReactFlow();
  
  const { messages, append, isLoading, stop } = useChat({
    api: '/api/code',
    onFinish: (message) => {
      updateNodeData(id, {
        generated: { 
          code: message.content,
          language 
        }
      });
    },
    onError: (error) => {
      console.error('Code generation error:', error);
      alert('Error generating code: ' + error.message);
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
      if (node.type === 'codeai' && node.data?.generated?.code) {
        texts.push(`${node.data.generated.language}:\n${node.data.generated.code}`);
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

    content.push(`Generate ${language} code for the following requirements:`);

    if (instructions) {
      content.push('Requirements:', instructions);
    }

    if (connectedText) {
      content.push('Additional Context:', connectedText);
    }

    if (!instructions && !connectedText) {
      alert('Please provide instructions or connect input nodes');
      return;
    }

    content.push(`\nPlease provide clean, well-documented ${language} code with comments.`);

    try {
      await append({
        role: 'user',
        content: content.join('\n\n')
      });
    } catch (error) {
      console.error('Generate error:', error);
      alert('Failed to generate code. Please try again.');
    }
  }, [instructions, language, getConnectedText, append]);

  const handleCopy = useCallback(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content) {
      navigator.clipboard.writeText(lastMessage.content);
    }
  }, [messages]);

  const lastMessage = messages[messages.length - 1];
  const hasResponse = lastMessage && lastMessage.role === 'assistant';

  return (
    <NodeLayout id={id} title="Code AI" type="codeai">
      <div className="min-w-[370px] max-w-[620px] space-y-4 text-white">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-3 text-white/90 tracking-wide">
              🚀 Language
            </label>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                updateNodeData(id, { language: e.target.value });
              }}
              className="w-full p-3 glass-panel rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Code Requirements
          </label>
          <textarea
            value={instructions}
            onChange={(e) => {
              setInstructions(e.target.value);
              updateNodeData(id, { instructions: e.target.value });
            }}
            placeholder="Describe what code you want to generate..."
            className="w-full p-2 border border-[#333] rounded bg-[#2a2a2a] text-white placeholder-gray-400 resize-none"
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          {isLoading ? (
            <button
              onClick={stop}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
              <SquareIcon size={14} />
              Stop
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
            >
              <CodeIcon size={14} />
              Generate Code
            </button>
          )}

          {hasResponse && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] hover:bg-[#333] text-white border border-[#333] rounded text-sm"
            >
              <CopyIcon size={14} />
              Copy
            </button>
          )}
        </div>

        {messages.length > 0 && (
          <div className="border-t border-[#333] pt-3">
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded text-sm ${
                    message.role === 'user'
                      ? 'bg-[#2a2a2a] text-white'
                      : 'bg-[#333] text-white'
                  }`}
                >
                  <div className="font-medium mb-2 text-xs uppercase tracking-wide text-gray-400 flex items-center gap-2">
                    {message.role === 'user' ? (
                      'User'
                    ) : (
                      <>
                        <CodeIcon size={12} />
                        AI Code
                      </>
                    )}
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        code: ({ className, children, ...props }) => (
                          <code
                            className={`${className} bg-[#1a1a1a] px-1 py-0.5 rounded text-xs`}
                            {...props}
                          >
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-[#1a1a1a] p-3 rounded overflow-x-auto text-xs border border-[#333]">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="p-3 bg-[#333] rounded text-sm text-white">
                  <div className="font-medium mb-2 text-xs uppercase tracking-wide text-gray-400 flex items-center gap-2">
                    <CodeIcon size={12} />
                    AI Code
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                    <span>Generating code...</span>
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

export default CodeAINode;
