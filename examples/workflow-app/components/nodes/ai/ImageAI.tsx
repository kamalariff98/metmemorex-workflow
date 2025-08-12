'use client';

import { type NodeProps, useReactFlow, getIncomers } from '@xyflow/react';
import { useState, useCallback } from 'react';
import { PlayIcon, ImageIcon, CopyIcon, DownloadIcon } from 'lucide-react';
import { NodeLayout } from '../../NodeLayout';

type ImageAIData = {
  prompt?: string;
  generated?: {
    imageUrl: string;
    mimeType: string;
  };
};

export const ImageAINode = ({ id, data, selected }: NodeProps<ImageAIData>) => {
  const d = (data ?? {}) as ImageAIData;
  const [prompt, setPrompt] = useState(d.prompt ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const { updateNodeData, getNodes, getEdges } = useReactFlow();

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
    
    return texts.join(', ');
  }, [id, getNodes, getEdges]);

  const handleGenerate = useCallback(async () => {
    const connectedText = getConnectedText();
    let finalPrompt = prompt;

    if (connectedText && prompt) {
      finalPrompt = `${prompt}. Additional context: ${connectedText}`;
    } else if (connectedText && !prompt) {
      finalPrompt = connectedText;
    }

    if (!finalPrompt) {
      alert('Please provide a prompt or connect input nodes');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const result = await response.json();

      if (result.success) {
        updateNodeData(id, {
          generated: {
            imageUrl: result.imageUrl,
            mimeType: result.mimeType
          }
        });
      } else {
        alert('Failed to generate image: ' + result.error);
      }
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, getConnectedText, updateNodeData, id]);

  const handleCopyPrompt = useCallback(() => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
    }
  }, [prompt]);

  const handleDownload = useCallback(() => {
    if (d.generated?.imageUrl) {
      const link = document.createElement('a');
      link.href = d.generated.imageUrl;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [d.generated?.imageUrl]);

  return (
    <NodeLayout id={id} title="Image AI" type="imageai">
      <div className="min-w-[320px] max-w-[420px] space-y-4 text-white">
        <div>
          <label className="block text-sm font-semibold mb-3 text-white/90 tracking-wide">
            🎨 Image Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              updateNodeData(id, { prompt: e.target.value });
            }}
            placeholder="Describe the image you want to generate..."
            className="w-full p-4 glass-panel rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded text-sm"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <ImageIcon size={14} />
            )}
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>

          {prompt && (
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] hover:bg-[#333] text-white border border-[#333] rounded text-sm"
            >
              <CopyIcon size={14} />
              Copy Prompt
            </button>
          )}
        </div>

        {d.generated?.imageUrl && (
          <div className="border-t border-[#333] pt-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Generated Image</span>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-2 py-1 bg-[#2a2a2a] hover:bg-[#333] text-white border border-[#333] rounded text-xs"
                >
                  <DownloadIcon size={12} />
                  Download
                </button>
              </div>
              <div className="relative">
                <img
                  src={d.generated.imageUrl}
                  alt="Generated image"
                  className="w-full rounded border border-[#333] max-h-[300px] object-contain bg-[#2a2a2a]"
                />
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="border-t border-[#333] pt-3">
            <div className="flex items-center justify-center p-8">
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                <p className="text-sm text-gray-400">Generating your image...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </NodeLayout>
  );
};

export default ImageAINode;
