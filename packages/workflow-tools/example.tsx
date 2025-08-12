import React, { useState } from 'react';
import {
  ToolsWidget,
  EnhancedEdgeProvider,
  EnhancedEdgeType,
  getEdgeStyle,
} from '@terworkflow/workflow-tools';

// Example usage of the workflow tools package
function MyCanvasApp() {
  const [edgeType, setEdgeType] = useState<EnhancedEdgeType>('default');

  const handleAddRectangle = () => {
    // Your logic to add a rectangle node to your canvas
    console.log('Adding rectangle node...');
    // Example: addNode({ type: 'rectangle', position: { x: 100, y: 100 } });
  };

  const handleEdgeTypeChange = (type: EnhancedEdgeType) => {
    setEdgeType(type);
    const style = getEdgeStyle(type);
    console.log('Edge type changed to:', type, 'with style:', style);
    // Apply the edge style to your canvas connections
    // Example: updateCanvasEdgeStyle(style);
  };

  return (
    <div className="canvas-app">
      {/* Your existing canvas component would go here */}
      <div className="canvas-placeholder" style={{ 
        width: '100%', 
        height: '500px', 
        background: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        marginBottom: '20px'
      }}>
        Your Canvas Component Goes Here
      </div>

      {/* Workflow Tools Widget */}
      <EnhancedEdgeProvider 
        onChange={handleEdgeTypeChange}
        defaultType="default"
      >
        <ToolsWidget
          onAddRectangle={handleAddRectangle}
          onEdgeTypeChange={handleEdgeTypeChange}
        />
      </EnhancedEdgeProvider>

      {/* Debug info */}
      <div style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        Current edge type: <strong>{edgeType}</strong>
      </div>
    </div>
  );
}

export default MyCanvasApp;
