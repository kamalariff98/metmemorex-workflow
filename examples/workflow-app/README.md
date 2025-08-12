# 🌊 Terworkflow - Advanced Node-Based Workflow App

A sophisticated, feature-rich workflow application built with React Flow, Next.js, and advanced node mechanics. Create, customize, and execute complex workflows with AI integration, dynamic handles, and enhanced edge types.

## ✨ Features

### 🎯 **Core Workflow Engine**
- **Advanced Node Mechanics** - Node states, validation, execution timing, and progress tracking
- **Dynamic Handles** - Click node borders to add connection points anywhere
- **14 Enhanced Edge Types** - Including animated, breathing, and glowing effects
- **Real-time Data Flow** - Live computation and result display between connected nodes
- **Workflow Execution** - Play, pause, reset workflows with visual feedback

### 🤖 **AI Integration**
- **TextAI Nodes** - Generate text content with custom instructions
- **CodeAI Nodes** - Generate code in multiple programming languages
- **ImageAI Nodes** - Create images using OpenAI DALL-E 3
- **Computing Flow** - Process and transform data between nodes in real-time

### 🎨 **Advanced Customization**
- **Shape Nodes** - Rectangle nodes with monochrome styling
- **Context Menus** - Right-click nodes to set operations (Text, Uppercase, etc.)
- **Enhanced Edges** - Main points, sub points, hierarchy, dependencies, flow, feedback
- **Glass UI** - Modern glassmorphism design with smooth animations
- **Responsive Design** - Works on desktop and mobile devices

### 📋 **Pre-built Showcases**
- **Strelka UI** - File analysis and cybersecurity workflow
- **AI Workflow** - Demonstrates all enhanced edge types and animations
- **Computing Flow** - Real-time data processing and transformation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd terworkflow/examples/workflow-app

# Install dependencies
pnpm install

# Start development server
pnpm dev -p 3040
```

### Access the App
- **Main Workflow**: http://localhost:3040/workflow
- **Tools Demo**: http://localhost:3040/tools-demo
- **Tools Test**: http://localhost:3040/tools-test

## 🎮 Usage Guide

### Creating Workflows

1. **Add Nodes**
   - Click the Rectangle button to add shape nodes
   - Click AI buttons (Text, Code, Image) to add AI processing nodes

2. **Connect Nodes**
   - Click and drag from node handles to create connections
   - Click node borders to add dynamic handles at any position

3. **Configure Nodes**
   - Right-click nodes to access context menu
   - Set operations: Text, Uppercase, Lowercase, etc.
   - For AI nodes, set custom instructions

4. **Select Edge Types**
   - Use the Edge Type dropdown to choose connection styles
   - Available types: Default, Animated, Main Point, Dependency, Flow, etc.

5. **Execute Workflows**
   - Click Play button to start workflow execution
   - Watch nodes change states: idle → running → completed
   - View real-time results and data flow

### Advanced Features

#### Dynamic Handles
```typescript
// Click anywhere on node borders to add handles
// Handles automatically position based on click location
// Connect handles to create custom data flow patterns
```

#### Enhanced Edge Types
- **Main Point** - Primary connections (animated)
- **Sub Point** - Secondary connections (dashed)
- **Dependency** - Required relationships (breathing animation)
- **Flow** - General process flow (glowing effect)
- **Hierarchy** - Organizational structure
- **Feedback** - Feedback loops (dotted)

#### Computing Flow
```typescript
// Nodes automatically process connected data
const result = computeResult(inputValues, operation);
// Results display in real-time as connections change
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **Canvas**: React Flow (XYFlow)
- **Styling**: Tailwind CSS with glassmorphism effects
- **State**: React Context API, useState, useNodesState
- **AI**: OpenAI API integration
- **Build**: Turbopack for fast development

### Project Structure
```
workflow-app/
├── app/                    # Next.js app directory
│   ├── workflow/          # Main workflow page
│   ├── tools-demo/        # Package demo page
│   ├── tools-test/        # Functionality test page
│   └── api/               # API routes (image generation)
├── components/
│   ├── Canvas.tsx         # Main React Flow canvas
│   ├── Toolbar.tsx        # Tools and controls
│   ├── showcases.ts       # Pre-built workflows
│   ├── nodes/             # Node components
│   │   └── shapes/        # Shape node implementations
│   ├── edges/             # Custom edge components
│   └── ui/                # UI components
├── lib/
│   └── workflow-engine.ts # Core workflow logic
└── hooks/                 # Custom React hooks
```

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
OPENAI_API_KEY=your_openai_api_key_here
```

### Customization

#### Adding New Node Types
```typescript
// 1. Create node component in components/nodes/
export const CustomNode = ({ data, id }) => {
  return <div className="custom-node">{data.label}</div>;
};

// 2. Register in components/nodes/index.ts
export const nodeTypes = {
  custom: CustomNode,
  // ... other types
};
```

#### Adding New Edge Types
```typescript
// 1. Add type to EnhancedEdgeType
type EnhancedEdgeType = 'custom' | /* other types */;

// 2. Add styling in getEdgeStyle function
case 'custom':
  return {
    stroke: '#custom-color',
    strokeWidth: 2,
    animation: 'custom-animation'
  };
```

## 🧪 Testing

### Run Tests
```bash
# Development server
pnpm dev -p 3040

# Build for production
pnpm build

# Start production server
pnpm start
```

### Test Pages
- **/workflow** - Main application
- **/tools-demo** - Package information and demo
- **/tools-test** - Interactive functionality testing

## 📦 Packages

This project includes a reusable tools package:

### @terworkflow/workflow-tools
Located in `../../packages/workflow-tools/`, this package provides canvas-agnostic workflow tools that can be used in any React application.

**Features:**
- ToolsWidget component
- EnhancedEdgeProvider context
- 14 edge types with animations
- TypeScript support
- Glass effect styling

**Usage:**
```typescript
import { ToolsWidget, EnhancedEdgeProvider } from '@terworkflow/workflow-tools';

<EnhancedEdgeProvider onChange={handleEdgeChange}>
  <YourCanvas />
  <ToolsWidget onAddRectangle={handleAddNode} />
</EnhancedEdgeProvider>
```

See the [tools package README](../../packages/workflow-tools/README.md) for detailed documentation.

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly using the test pages
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Add JSDoc comments for complex functions
- Test new features using the provided test pages

## 📚 API Reference

### Core Components

#### Canvas
```typescript
interface CanvasProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  className?: string;
}
```

#### ToolsWidget
```typescript
interface ToolsWidgetProps {
  onAddRectangle?: () => void;
  onEdgeTypeChange?: (type: EnhancedEdgeType) => void;
  className?: string;
}
```

### Workflow Engine
```typescript
class WorkflowEngine {
  executeWorkflow(nodes: Node[], edges: Edge[]): Promise<void>;
  stopWorkflow(): void;
  resetWorkflow(): void;
  validateConnection(source: Node, target: Node): boolean;
}
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3040
lsof -ti:3040 | xargs kill -9
pnpm dev -p 3040
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

#### Package Import Issues
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

## 📄 License

MIT License - see [LICENSE](../../LICENSE) file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) - Powerful React library for building node-based UIs
- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- [OpenAI](https://openai.com/) - AI API integration

## 🔗 Links

- **Demo**: http://localhost:3040/workflow
- **Tools Package**: [packages/workflow-tools](../../packages/workflow-tools/)
- **Documentation**: This README and inline code comments
- **Issues**: Create issues for bug reports and feature requests

---

**Built with ❤️ using React Flow, Next.js, and modern web technologies**
