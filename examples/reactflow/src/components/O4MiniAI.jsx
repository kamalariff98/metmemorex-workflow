import React, { useState, useRef } from 'react';
import { 
  Brain, 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Loader2, 
  Upload, 
  FileText, 
  Download,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Zap,
  Lightbulb,
  Target,
  TrendingUp
} from 'lucide-react';

const O4MiniAI = ({ isVisible, onClose, onGenerateMindMap }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const predefinedPrompts = [
    "Analyze my project roadmap and create a mind map",
    "Convert my workflow document into a visual mind map",
    "Create a mind map from my business strategy document",
    "Transform my research notes into an organized mind map",
    "Generate a mind map from my meeting notes",
    "Create a project timeline mind map from my documents"
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      content: null,
      uploaded: false
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate file processing
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === newFiles[index].id 
              ? { ...f, content: e.target.result, uploaded: true }
              : f
          )
        );
      };
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() && uploadedFiles.length === 0) return;

    setIsLoading(true);
    try {
      // Simulate O4 mini AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockSuggestions = [
        {
          type: 'node',
          content: 'Project Overview',
          description: 'Main project concept and goals',
          confidence: 0.95
        },
        {
          type: 'node',
          content: 'Key Milestones',
          description: 'Important project milestones and deadlines',
          confidence: 0.88
        },
        {
          type: 'node',
          content: 'Team Structure',
          description: 'Team roles and responsibilities',
          confidence: 0.92
        },
        {
          type: 'connection',
          description: 'Connect related concepts with animated lines',
          confidence: 0.85
        },
        {
          type: 'workflow',
          content: 'Process Flow',
          description: 'Workflow steps and decision points',
          confidence: 0.90
        }
      ];

      setSuggestions(mockSuggestions);
      onGenerateMindMap(mockSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeFiles = async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate file analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis = {
        summary: "Analyzed 3 documents containing project roadmap, workflow processes, and team structure.",
        keyTopics: [
          "Project Management",
          "Team Collaboration", 
          "Process Optimization",
          "Resource Allocation"
        ],
        recommendations: [
          "Create a centralized project hub",
          "Implement agile workflow processes",
          "Establish clear communication channels"
        ],
        confidence: 0.87
      };
      
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing files:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuickPrompt = (quickPrompt) => {
    setPrompt(quickPrompt);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const clearAll = () => {
    setPrompt('');
    setSuggestions([]);
    setUploadedFiles([]);
    setAnalysis(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                O4 Mini AI Assistant
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload files and get AI-powered mind map suggestions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* File Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Upload size={20} />
                Upload Workflow Documents
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".txt,.doc,.docx,.pdf,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <Upload size={32} />
                  <div>
                    <p className="font-medium">Click to upload files</p>
                    <p className="text-sm">Supports: TXT, DOC, DOCX, PDF, MD</p>
                  </div>
                </button>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Uploaded Files:</h4>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-500" />
                        <span className="text-sm font-medium">{file.name}</span>
                        {file.uploaded && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Ready
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={handleAnalyzeFiles}
                    disabled={isAnalyzing}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Analyzing Files...
                      </>
                    ) : (
                      <>
                        <Brain size={16} />
                        Analyze Files
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Prompt Input */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <MessageSquare size={20} />
                AI Prompt
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Describe your workflow or project:
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Create a mind map for my software development workflow..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || (!prompt.trim() && uploadedFiles.length === 0)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Generating Mind Map...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Generate Mind Map
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Quick Prompts:</h4>
              <div className="flex flex-wrap gap-2">
                {predefinedPrompts.map((quickPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(quickPrompt)}
                    className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    {quickPrompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* File Analysis */}
            {analysis && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <Target size={20} />
                  File Analysis
                </h3>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">Summary</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400">{analysis.summary}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">Key Topics</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysis.keyTopics.map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">Recommendations</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 mt-1">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lightbulb size={12} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-green-700 dark:text-green-400">
                      Confidence: {Math.round(analysis.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <Sparkles size={20} />
                  AI Suggestions
                </h3>
                
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {suggestion.type === 'node' ? (
                            <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          ) : suggestion.type === 'connection' ? (
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                          ) : (
                            <div className="w-3 h-3 bg-purple-500 rounded-full" />
                          )}
                          <span className="font-medium text-gray-800 dark:text-white">
                            {suggestion.content || suggestion.type}
                          </span>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {Math.round(suggestion.confidence * 100)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {suggestion.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw size={16} />
                Clear All
              </button>
              
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Download size={16} />
                Apply to Mind Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default O4MiniAI; 