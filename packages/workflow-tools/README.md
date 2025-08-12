# 🛠️ @terworkflow/workflow-tools

A powerful, canvas-agnostic React package providing reusable workflow tools and components for node-based applications. Extract the power of advanced workflow UIs without being tied to any specific canvas library.

## ✨ Features

### 🎯 **Core Components**
- **ToolsWidget** - Complete toolbar with shape tools and edge type selector
- **EnhancedEdgeProvider** - React Context provider for managing edge types and styles
- **EnhancedEdgeSelector** - Beautiful dropdown component for selecting edge types
- **useEnhancedEdge** - React hook for accessing edge context

### 🎨 **14 Enhanced Edge Types**
- **Basic**: Default, Straight, Step, Smooth Step
- **Styled**: Animated, Crowsfoot, Dashed, Thick  
- **Advanced**: Main Point (animated), Sub Point (dashed)
- **Special**: Hierarchy, Dependency (breathing), Flow (glowing), Feedback (dotted)

### 🔧 **Technical Features**
- **Canvas-Agnostic** - Works with React Flow, Konva, Canvas API, or any canvas library
- **TypeScript Support** - Full type definitions included
- **ESM + CJS** - Modern module formats supported
- **Peer Dependencies** - No bloat, uses your existing React setup
- **CSS Animations** - Built-in keyframes for special effects
- **Glass UI** - Beautiful glassmorphism design system

## Installation

```bash
npm install @terworkflow/workflow-tools
# or
pnpm add @terworkflow/workflow-tools
```

## Peer Dependencies

```bash
npm install react react-dom lucide-react
```

## Usage

### Basic Setup

```tsx
import {
  ToolsWidget,
  EnhancedEdgeProvider,
  EnhancedEdgeType,
  getEdgeStyle,
  defaultStyles
} from '@terworkflow/workflow-tools';

// Add the default styles to your CSS (optional)
// Or provide your own glass effect styles

function MyCanvasApp() {
  const [edgeType, setEdgeType] = useState<EnhancedEdgeType>('default');

  const handleAddRectangle = () => {
    // Your logic to add a rectangle node to your canvas
    addNode({ 
      type: 'rectangle', 
      position: { x: 100, y: 100 },
      data: { label: 'Rectangle' }
    });
  };

  const handleEdgeTypeChange = (type: EnhancedEdgeType) => {
    setEdgeType(type);
    // Apply the edge style to your canvas connections
    const style = getEdgeStyle(type);
    updateCanvasEdgeStyle(style);
  };

  return (
    <EnhancedEdgeProvider 
      onChange={handleEdgeTypeChange}
      defaultType="default"
    >
      <div className="canvas-container">
        {/* Your existing canvas component */}
        <YourCanvasComponent />
        
        {/* Add the tools widget */}
        <ToolsWidget
          onAddRectangle={handleAddRectangle}
          onEdgeTypeChange={handleEdgeTypeChange}
        />
      </div>
    </EnhancedEdgeProvider>
  );
}
```

### Individual Components

```tsx
import { 
  EnhancedEdgeSelector, 
  EnhancedEdgeProvider,
  useEnhancedEdge 
} from '@terworkflow/workflow-tools';

// Use just the edge selector
function MyToolbar() {
  return (
    <EnhancedEdgeProvider onChange={(type) => console.log(type)}>
      <div className="toolbar">
        <button onClick={addNode}>Add Node</button>
        <EnhancedEdgeSelector />
      </div>
    </EnhancedEdgeProvider>
  );
}

// Access edge context in child components
function MyCanvasControls() {
  const { currentEdgeType, setCurrentEdgeType, getEdgeStyle } = useEnhancedEdge();
  
  const currentStyle = getEdgeStyle(currentEdgeType);
  
  return (
    <div>
      Current edge: {currentEdgeType}
      <button onClick={() => setCurrentEdgeType('animated')}>
        Use Animated
      </button>
    </div>
  );
}
```

## Edge Types

The package supports 14 different edge types:

- `default` - Standard connection
- `straight` - Direct straight line
- `step` - Step connection
- `smoothstep` - Smooth step connection
- `animated` - Animated dashed line
- `crowsfoot` - Database-style connection
- `dashed` - Dashed line
- `thick` - Thick solid line
- `main-point` - Primary connection (animated)
- `sub-point` - Secondary connection (dashed)
- `hierarchy` - Organizational structure
- `dependency` - Required relationship (breathing animation)
- `flow` - General process flow (glowing effect)
- `feedback` - Feedback loop (dotted)

## CSS Animations

The package includes CSS keyframes for special effects. Add these to your global CSS:

```css
@keyframes dash {
  to {
    stroke-dashoffset: -20;
  }
}

@keyframes breathing {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes glowing {
  0%, 100% { 
    filter: drop-shadow(0 0 6px currentColor);
  }
  50% { 
    filter: drop-shadow(0 0 12px currentColor);
  }
}
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { 
  EnhancedEdgeType, 
  EdgeStyle, 
  ToolsWidgetProps,
  EnhancedEdgeContextType 
} from '@terworkflow/workflow-tools';
```

## 🎮 Live Demo

Check out the tools in action:
- **Main Demo**: [Terworkflow App](http://localhost:3040/workflow)
- **Tools Test**: [Interactive Test Page](http://localhost:3040/tools-test)
- **Package Demo**: [Package Information](http://localhost:3040/tools-demo)

## 🏗️ Architecture

### Package Structure
```
workflow-tools/
├── src/
│   ├── components/
│   │   ├── ToolsWidget.tsx          # Main toolbar component
│   │   ├── EnhancedEdgeProvider.tsx # Context provider
│   │   └── EnhancedEdgeSelector.tsx # Edge type dropdown
│   ├── types/
│   │   └── index.ts                 # TypeScript definitions
│   ├── utils/
│   │   └── edgeStyles.ts           # Edge styling utilities
│   └── index.ts                    # Main exports
├── dist/                           # Built files (ESM + CJS)
├── example.tsx                     # Usage example
└── README.md                       # This file
```

### Design Principles
- **Canvas-Agnostic**: Works with any canvas library or custom implementation
- **Callback-Based**: Integration through simple callback functions
- **Context-Driven**: React Context API for state management
- **Type-Safe**: Full TypeScript support with exported types
- **Modular**: Import only what you need

## 🔧 Advanced Usage

### Custom Styling

Override the default glass effect styles:

```tsx
import { ToolsWidget, defaultStyles } from '@terworkflow/workflow-tools';

// Option 1: Use provided default styles
const MyApp = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: defaultStyles }} />
    <ToolsWidget />
  </>
);

// Option 2: Custom CSS classes
const CustomToolsWidget = () => (
  <ToolsWidget className="my-custom-toolbar" />
);
```

```css
/* Custom styling */
.my-custom-toolbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 16px;
}

.my-custom-toolbar .glass-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
}
```

### Edge Style Customization

```tsx
import { getEdgeStyle, EnhancedEdgeType } from '@terworkflow/workflow-tools';

const MyCanvas = () => {
  const applyEdgeStyle = (type: EnhancedEdgeType) => {
    const style = getEdgeStyle(type);
    
    // Apply to React Flow
    setConnectionLineStyle(style);
    
    // Apply to Konva
    line.stroke(style.stroke);
    line.strokeWidth(style.strokeWidth);
    
    // Apply to Canvas API
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = style.strokeWidth;
    
    // Apply CSS animations
    if (style.animation) {
      element.style.animation = style.animation;
    }
  };
};
```

### Integration with Popular Canvas Libraries

#### React Flow
```tsx
import { ReactFlow } from '@xyflow/react';
import { ToolsWidget, EnhancedEdgeProvider } from '@terworkflow/workflow-tools';

const ReactFlowApp = () => {
  const { addNodes, setConnectionLineStyle } = useReactFlow();

  return (
    <EnhancedEdgeProvider onChange={(type) => {
      const style = getEdgeStyle(type);
      setConnectionLineStyle(style);
    }}>
      <ReactFlow nodes={nodes} edges={edges} />
      <ToolsWidget 
        onAddRectangle={() => addNodes({
          id: 'new-rect',
          type: 'default',
          position: { x: 100, y: 100 },
          data: { label: 'Rectangle' }
        })}
      />
    </EnhancedEdgeProvider>
  );
};
```

#### Konva.js
```tsx
import { Stage, Layer, Rect, Line } from 'react-konva';
import { ToolsWidget, EnhancedEdgeProvider } from '@terworkflow/workflow-tools';

const KonvaApp = () => {
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);

  return (
    <EnhancedEdgeProvider onChange={(type) => {
      const style = getEdgeStyle(type);
      setLines(prev => prev.map(line => ({
        ...line,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth
      })));
    }}>
      <Stage width={800} height={600}>
        <Layer>
          {shapes.map(shape => <Rect key={shape.id} {...shape} />)}
          {lines.map(line => <Line key={line.id} {...line} />)}
        </Layer>
      </Stage>
      <ToolsWidget 
        onAddRectangle={() => setShapes(prev => [...prev, {
          id: Date.now(),
          x: 100,
          y: 100,
          width: 100,
          height: 50,
          fill: '#f0f0f0'
        }])}
      />
    </EnhancedEdgeProvider>
  );
};
```

#### HTML5 Canvas
```tsx
import { useRef, useEffect } from 'react';
import { ToolsWidget, EnhancedEdgeProvider } from '@terworkflow/workflow-tools';

const CanvasApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentEdgeStyle, setCurrentEdgeStyle] = useState(getEdgeStyle('default'));

  const drawLine = (ctx: CanvasRenderingContext2D, x1, y1, x2, y2) => {
    ctx.strokeStyle = currentEdgeStyle.stroke;
    ctx.lineWidth = currentEdgeStyle.strokeWidth;
    if (currentEdgeStyle.strokeDasharray) {
      ctx.setLineDash(currentEdgeStyle.strokeDasharray.split(',').map(Number));
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  return (
    <EnhancedEdgeProvider onChange={(type) => {
      setCurrentEdgeStyle(getEdgeStyle(type));
    }}>
      <canvas ref={canvasRef} width={800} height={600} />
      <ToolsWidget 
        onAddRectangle={() => {
          const ctx = canvasRef.current?.getContext('2d');
          if (ctx) {
            ctx.fillRect(100, 100, 100, 50);
          }
        }}
      />
    </EnhancedEdgeProvider>
  );
};
```

## 🎨 Edge Types Reference

### Basic Edge Types
| Type | Description | Color | Width | Animation |
|------|-------------|-------|-------|-----------|
| `default` | Standard connection | #94a3b8 | 2px | None |
| `straight` | Direct straight line | #94a3b8 | 2px | None |
| `step` | Step connection | #94a3b8 | 2px | None |
| `smoothstep` | Smooth step connection | #94a3b8 | 2px | None |

### Styled Edge Types
| Type | Description | Color | Width | Special |
|------|-------------|-------|-------|---------|
| `animated` | Dashed animation | #3b82f6 | 3px | Dash animation |
| `crowsfoot` | Database-style | #10b981 | 2px | Custom dash pattern |
| `dashed` | Simple dashed | #f59e0b | 2px | Dash pattern |
| `thick` | Thick solid line | #ef4444 | 4px | None |

### Advanced Edge Types
| Type | Description | Color | Width | Animation |
|------|-------------|-------|-------|-----------|
| `main-point` | Primary connection | #8b5cf6 | 3px | Dash animation |
| `sub-point` | Secondary connection | #06b6d4 | 2px | None |
| `hierarchy` | Organizational | #84cc16 | 2px | Custom pattern |
| `dependency` | Required relationship | #f97316 | 2px | Breathing |
| `flow` | Process flow | #ec4899 | 3px | Glowing |
| `feedback` | Feedback loop | #64748b | 2px | None |

## 🧪 Testing

### Run Package Tests
```bash
# Build the package
pnpm build

# Test exports (Node.js)
node -e "console.log(Object.keys(require('./dist/index.js')))"

# Test in development
pnpm dev
```

### Integration Testing
```bash
# Add to your project
pnpm add @terworkflow/workflow-tools

# Test import
import { ToolsWidget } from '@terworkflow/workflow-tools';
```

## 🤝 Contributing

### Development Setup
```bash
# Clone the repository
git clone <repo-url>
cd packages/workflow-tools

# Install dependencies
pnpm install

# Build in watch mode
pnpm dev

# Build for production
pnpm build
```

### Adding New Edge Types
1. Add the type to `EnhancedEdgeType` in `src/types/index.ts`
2. Add styling logic in `src/utils/edgeStyles.ts`
3. Update the options in `EnhancedEdgeSelector.tsx`
4. Add CSS animations if needed
5. Update documentation

### Code Style
- Use TypeScript for all new code
- Follow React best practices
- Add JSDoc comments for public APIs
- Test with multiple canvas libraries
- Update README for new features

## 📚 API Reference

### Types

```typescript
type EnhancedEdgeType = 
  | 'default' | 'straight' | 'step' | 'smoothstep'
  | 'animated' | 'crowsfoot' | 'dashed' | 'thick'
  | 'main-point' | 'sub-point' | 'hierarchy' 
  | 'dependency' | 'flow' | 'feedback';

interface EdgeStyle {
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  opacity?: number;
  animation?: string;
  filter?: string;
}

interface ToolsWidgetProps {
  onAddRectangle?: () => void;
  onEdgeTypeChange?: (type: EnhancedEdgeType) => void;
  className?: string;
}
```

### Functions

```typescript
// Get styling for an edge type
getEdgeStyle(type: EnhancedEdgeType): EdgeStyle

// React hook for edge context
useEnhancedEdge(): {
  currentEdgeType: EnhancedEdgeType;
  setCurrentEdgeType: (type: EnhancedEdgeType) => void;
  getEdgeStyle: (type: EnhancedEdgeType) => EdgeStyle;
}
```

## 🐛 Troubleshooting

### Common Issues

**Import Errors**
```bash
# Make sure peer dependencies are installed
pnpm add react react-dom lucide-react
```

**TypeScript Errors**
```typescript
// Import types explicitly
import type { EnhancedEdgeType } from '@terworkflow/workflow-tools';
```

**Styling Issues**
```tsx
// Make sure to include the CSS animations
import { defaultStyles } from '@terworkflow/workflow-tools';
```

**Context Errors**
```tsx
// Always wrap with provider
<EnhancedEdgeProvider>
  <YourComponent />
</EnhancedEdgeProvider>
```

## 📊 Performance

### Bundle Size
- **ESM**: ~6.7 KB
- **CJS**: ~8.3 KB
- **Peer Dependencies**: React, ReactDOM, Lucide React
- **Zero Dependencies**: No additional dependencies

### Optimization Tips
- Import only needed components
- Use React.memo for expensive renders
- Debounce edge type changes if needed
- Consider virtualization for large canvases

## 🔗 Related Projects

- **[Terworkflow App](../examples/workflow-app/)** - Main workflow application
- **[React Flow](https://reactflow.dev/)** - React library for node-based UIs
- **[Konva.js](https://konvajs.org/)** - 2D canvas library
- **[Fabric.js](http://fabricjs.com/)** - Interactive canvas library

## 📄 License

MIT License - see [LICENSE](../../LICENSE) file for details.

## 🙏 Acknowledgments

- **React Flow Team** - Inspiration for node-based UIs
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon system
- **TypeScript** - Type safety and developer experience

---

**Made with ❤️ for the React community. Canvas-agnostic workflow tools for everyone!**
