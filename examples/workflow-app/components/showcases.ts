import type { Edge, Node } from '@xyflow/react';

export type Flow = { nodes: Node[]; edges: Edge[] };

export const strelkaUI: Flow = {
  nodes: [
    // File Input & Authentication
    { id: 'file_upload', type: 'rectangle', position: { x: 50, y: 50 }, data: { label: 'File Upload' } },
    { id: 'auth_check', type: 'rectangle', position: { x: 250, y: 50 }, data: { label: 'Authentication' } },
    { id: 'file_validation', type: 'rectangle', position: { x: 450, y: 50 }, data: { label: 'File Validation' } },
    
    // File Analysis Pipeline
    { id: 'mime_detection', type: 'rectangle', position: { x: 50, y: 200 }, data: { label: 'MIME Detection' } },
    { id: 'priority_queue', type: 'rectangle', position: { x: 250, y: 200 }, data: { label: 'Priority Queue' } },
    { id: 'strelka_scanner', type: 'textai', position: { x: 450, y: 200 }, data: { 
      label: 'Strelka Scanner',
      instructions: 'File analysis and threat detection'
    }},
    
    // Threat Analysis
    { id: 'yara_scanning', type: 'rectangle', position: { x: 50, y: 350 }, data: { label: 'YARA Rules' } },
    { id: 'behavior_analysis', type: 'rectangle', position: { x: 250, y: 350 }, data: { label: 'Behavior Analysis' } },
    { id: 'virustotal_check', type: 'imageai', position: { x: 450, y: 350 }, data: { 
      label: 'VirusTotal Check',
      prompt: 'Hash-based threat intelligence lookup'
    }},
    
    // Results & Storage
    { id: 'results_aggregation', type: 'rectangle', position: { x: 250, y: 500 }, data: { label: 'Results Aggregation' } },
    { id: 'database_storage', type: 'rectangle', position: { x: 450, y: 500 }, data: { label: 'Database Storage' } },
    { id: 's3_backup', type: 'rectangle', position: { x: 650, y: 500 }, data: { label: 'S3 Backup' } },
    
    // Output & Reporting
    { id: 'insights_generation', type: 'codeai', position: { x: 250, y: 650 }, data: { 
      label: 'Insights Engine',
      language: 'python',
      instructions: 'Generate security insights and IOC extraction'
    }},
    { id: 'report_generation', type: 'rectangle', position: { x: 450, y: 650 }, data: { label: 'Report Generation' } },
    { id: 'api_response', type: 'rectangle', position: { x: 650, y: 650 }, data: { label: 'API Response' } },
  ],
  edges: [
    // File Processing Flow
    { id: 'upload-auth', source: 'file_upload', target: 'auth_check', type: 'smoothstep' },
    { id: 'auth-validation', source: 'auth_check', target: 'file_validation', type: 'dashed' },
    { id: 'validation-mime', source: 'file_validation', target: 'mime_detection', type: 'smoothstep' },
    { id: 'mime-priority', source: 'mime_detection', target: 'priority_queue', type: 'animated' },
    { id: 'priority-scanner', source: 'priority_queue', target: 'strelka_scanner', type: 'thick' },
    
    // Analysis Branches
    { id: 'scanner-yara', source: 'strelka_scanner', target: 'yara_scanning', type: 'smoothstep' },
    { id: 'scanner-behavior', source: 'strelka_scanner', target: 'behavior_analysis', type: 'smoothstep' },
    { id: 'scanner-vt', source: 'strelka_scanner', target: 'virustotal_check', type: 'dashed' },
    
    // Results Processing
    { id: 'yara-results', source: 'yara_scanning', target: 'results_aggregation', type: 'straight' },
    { id: 'behavior-results', source: 'behavior_analysis', target: 'results_aggregation', type: 'straight' },
    { id: 'vt-results', source: 'virustotal_check', target: 'results_aggregation', type: 'straight' },
    
    // Storage & Backup
    { id: 'results-db', source: 'results_aggregation', target: 'database_storage', type: 'smoothstep' },
    { id: 'results-s3', source: 'results_aggregation', target: 's3_backup', type: 'dashed' },
    
    // Final Output
    { id: 'db-insights', source: 'database_storage', target: 'insights_generation', type: 'animated' },
    { id: 'insights-report', source: 'insights_generation', target: 'report_generation', type: 'thick' },
    { id: 'insights-api', source: 'insights_generation', target: 'api_response', type: 'smoothstep' },
    
    // Feedback Loops
    { id: 'report-feedback', source: 'report_generation', target: 'results_aggregation', type: 'step' },
    { id: 'api-feedback', source: 'api_response', target: 'database_storage', type: 'crowsfoot' },
  ],
};

export const aiWorkflow: Flow = {
  nodes: [
    // Input
    { id: 'input', type: 'rectangle', position: { x: 50, y: 150 }, data: { label: 'Input Data' } },
    
    // Main AI Processing
    { id: 'text_ai', type: 'textai', position: { x: 250, y: 100 }, data: { 
      label: 'Text AI (Main)',
      instructions: 'Primary text processing with AI'
    }},
    
    // Sub AI Processing
    { id: 'code_ai', type: 'codeai', position: { x: 250, y: 200 }, data: { 
      label: 'Code AI (Sub)',
      language: 'python',
      instructions: 'Secondary code generation'
    }},
    { id: 'image_ai', type: 'imageai', position: { x: 250, y: 300 }, data: { 
      label: 'Image AI (Sub)',
      prompt: 'Supporting image generation'
    }},
    
    // Hierarchy & Dependencies
    { id: 'hierarchy', type: 'rectangle', position: { x: 450, y: 100 }, data: { label: 'Hierarchy Level' } },
    { id: 'dependency', type: 'rectangle', position: { x: 450, y: 200 }, data: { label: 'Dependency Check' } },
    
    // Flow & Feedback
    { id: 'flow', type: 'rectangle', position: { x: 650, y: 100 }, data: { label: 'Flow Control' } },
    { id: 'feedback', type: 'rectangle', position: { x: 650, y: 200 }, data: { label: 'Feedback Loop' } },
    
    // Output
    { id: 'output', type: 'rectangle', position: { x: 850, y: 150 }, data: { label: 'Final Output' } },
  ],
  edges: [
    // Main Point Connections (thick blue)
    { id: 'input-text', source: 'input', target: 'text_ai', type: 'enhanced', data: { edgeType: 'main-point' } },
    { id: 'text-hierarchy', source: 'text_ai', target: 'hierarchy', type: 'enhanced', data: { edgeType: 'main-point' } },
    { id: 'hierarchy-flow', source: 'hierarchy', target: 'flow', type: 'enhanced', data: { edgeType: 'main-point' } },
    { id: 'flow-output', source: 'flow', target: 'output', type: 'enhanced', data: { edgeType: 'main-point' } },
    
    // Sub Point Connections (thin dashed gray)
    { id: 'input-code', source: 'input', target: 'code_ai', type: 'enhanced', data: { edgeType: 'sub-point' } },
    { id: 'input-image', source: 'input', target: 'image_ai', type: 'enhanced', data: { edgeType: 'sub-point' } },
    
    // Hierarchy Connections (green)
    { id: 'code-dependency', source: 'code_ai', target: 'dependency', type: 'enhanced', data: { edgeType: 'hierarchy' } },
    { id: 'image-dependency', source: 'image_ai', target: 'dependency', type: 'enhanced', data: { edgeType: 'hierarchy' } },
    
    // Dependency Connections (orange animated)
    { id: 'dependency-feedback', source: 'dependency', target: 'feedback', type: 'enhanced', data: { edgeType: 'dependency' } },
    
    // Flow Connections (purple)
    { id: 'feedback-flow', source: 'feedback', target: 'flow', type: 'enhanced', data: { edgeType: 'flow' } },
    
    // Feedback Connections (red dotted)
    { id: 'output-feedback', source: 'output', target: 'feedback', type: 'enhanced', data: { edgeType: 'feedback' } },
  ],
};

// Computing Flow Showcase - demonstrates data processing between nodes
export const computingFlow: Showcase = {
  name: "Computing Flow",
  description: "Demonstrates data processing and transformation between nodes",
  nodes: [
    {
      id: '1',
      type: 'rectangle',
      position: { x: 100, y: 100 },
      data: { 
        label: 'Hello', 
        operation: 'text',
        value: 'Hello'
      },
    },
    {
      id: '2',
      type: 'rectangle',
      position: { x: 100, y: 200 },
      data: { 
        label: 'World', 
        operation: 'text',
        value: 'World'
      },
    },
    {
      id: '3',
      type: 'rectangle',
      position: { x: 300, y: 100 },
      data: { 
        label: 'Uppercase', 
        operation: 'uppercase'
      },
    },
    {
      id: '4',
      type: 'rectangle',
      position: { x: 500, y: 150 },
      data: { 
        label: 'Result', 
        operation: 'result'
      },
    },
  ],
  edges: [
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'enhanced',
      data: { edgeType: 'main-point' }
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      type: 'enhanced',
      data: { edgeType: 'flow' }
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      type: 'enhanced',
      data: { edgeType: 'sub-point' }
    },
  ],
};

export const showcases: Showcase[] = [
  computingFlow,
  aiWorkflow,
  strelkaUI,
];

