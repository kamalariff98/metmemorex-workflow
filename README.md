# 🌊 Terworkflow - Advanced Workflow Ecosystem

A comprehensive ecosystem of workflow tools and applications, featuring a sophisticated node-based workflow app and reusable component packages for building canvas-based applications.

## 🎯 Project Overview

Terworkflow consists of two main components:

### 🚀 **Workflow App** (`examples/workflow-app/`)
A full-featured workflow application built with React Flow, Next.js, and advanced node mechanics.

**Key Features:**
- Advanced node-based workflow editor
- AI integration (Text, Code, Image generation)
- 14 enhanced edge types with animations
- Dynamic handles and real-time data flow
- Glass UI design with responsive layout

### 🛠️ **Workflow Tools Package** (`packages/workflow-tools/`)
A reusable, canvas-agnostic React package for building workflow UIs.

**Key Features:**
- ToolsWidget component for any canvas
- Enhanced edge types and styling
- TypeScript support with full type definitions
- Works with React Flow, Konva, Canvas API, etc.

## 🚀 Quick Start

### Option 1: Full Workflow App
```bash
# Navigate to the workflow app
cd examples/workflow-app

# Install and run
pnpm install
pnpm dev -p 3040

# Visit: http://localhost:3040/workflow
```

### Option 2: Tools Package Only
```bash
# Install the tools package
pnpm add @terworkflow/workflow-tools

# Use in your React app
import { ToolsWidget, EnhancedEdgeProvider } from '@terworkflow/workflow-tools';
```

## 📁 Project Structure

```
terworkflow/
├── examples/
│   ├── workflow-app/           # Main workflow application
│   │   ├── app/               # Next.js pages and API routes
│   │   ├── components/        # React components
│   │   ├── lib/              # Workflow engine and utilities
│   │   └── hooks/            # Custom React hooks
│   └── tersa/                # Additional example (existing)
├── packages/
│   └── workflow-tools/        # Reusable tools package
│       ├── src/              # Source code
│       ├── dist/             # Built files
│       └── example.tsx       # Usage example
└── README.md                 # This file
```

## 🎮 Live Demos

Once the workflow app is running:

- **Main Workflow Editor**: http://localhost:3040/workflow
- **Tools Package Demo**: http://localhost:3040/tools-demo  
- **Functionality Test**: http://localhost:3040/tools-test

## ✨ Features Comparison

| Feature | Workflow App | Tools Package |
|---------|-------------|---------------|
| **Canvas** | React Flow | Canvas-agnostic |
| **Nodes** | Full workflow nodes | Rectangle tool |
| **Edges** | 14 enhanced types | 14 enhanced types |
| **AI Integration** | ✅ Full | ❌ Not included |
| **Dynamic Handles** | ✅ Advanced | ❌ Not included |
| **Workflow Engine** | ✅ Complete | ❌ Not included |
| **TypeScript** | ✅ Full support | ✅ Full support |
| **Styling** | ✅ Glass UI | ✅ Glass components |
| **Reusable** | ❌ Full app | ✅ Package |

## 🔧 Use Cases

### For Full Workflow Applications
Use the **Workflow App** if you need:
- Complete workflow editor out-of-the-box
- AI-powered node processing
- Advanced workflow execution engine
- Pre-built showcases and examples
- Full-featured canvas with all bells and whistles

### For Custom Canvas Integration
Use the **Tools Package** if you need:
- Workflow tools in existing applications
- Canvas-agnostic components
- Custom canvas implementations (Konva, Canvas API, etc.)
- Lightweight integration without full React Flow
- Reusable components across multiple projects

## 📚 Documentation

### Main Documentation
- **[Workflow App README](examples/workflow-app/README.md)** - Complete app documentation
- **[Tools Package README](packages/workflow-tools/README.md)** - Package API and usage

### Quick Links
- **Installation Guides** - Both READMEs include detailed setup instructions
- **API Reference** - Full TypeScript definitions and examples
- **Integration Examples** - React Flow, Konva, Canvas API examples
- **Troubleshooting** - Common issues and solutions

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Workspace Setup
```bash
# Clone the repository
git clone <repository-url>
cd terworkflow

# Install all dependencies (workspace)
pnpm install

# Build tools package
cd packages/workflow-tools
pnpm build

# Run workflow app
cd ../../examples/workflow-app  
pnpm dev -p 3040
```

### Package Development
```bash
# Tools package development
cd packages/workflow-tools
pnpm dev          # Watch mode
pnpm build        # Production build
pnpm test         # Run tests

# Workflow app development  
cd examples/workflow-app
pnpm dev -p 3040  # Development server
pnpm build        # Production build
```

## 🎨 Architecture

### Design Philosophy
- **Modularity** - Separate concerns between full app and reusable tools
- **Canvas-Agnostic** - Tools work with any canvas implementation
- **Type Safety** - Full TypeScript support throughout
- **Performance** - Optimized for large workflows and real-time updates
- **Developer Experience** - Comprehensive documentation and examples

### Technology Stack
- **Frontend**: React 18, Next.js 15, TypeScript
- **Canvas**: React Flow (app), Canvas-agnostic (tools)
- **Styling**: Tailwind CSS, Glassmorphism effects
- **Build**: Turbopack (app), tsup (package)
- **State**: React Context API, hooks
- **AI**: OpenAI API integration

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes in appropriate directory (`examples/workflow-app/` or `packages/workflow-tools/`)
4. Test changes thoroughly
5. Update relevant documentation
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open Pull Request

### Contribution Areas
- **New Node Types** - Add to workflow app
- **Edge Enhancements** - Improve edge types and animations
- **Canvas Integrations** - Add examples for other canvas libraries
- **Performance** - Optimize for large workflows
- **Documentation** - Improve guides and examples
- **Testing** - Add comprehensive test coverage

## 📊 Roadmap

### Short Term
- [ ] Add TypeScript definitions to tools package build
- [ ] Create more canvas library integration examples
- [ ] Add comprehensive test suite
- [ ] Performance optimizations for large workflows

### Medium Term  
- [ ] Plugin system for custom nodes
- [ ] Workflow templates and marketplace
- [ ] Real-time collaboration features
- [ ] Advanced analytics and workflow insights

### Long Term
- [ ] Visual workflow builder
- [ ] Cloud workflow execution
- [ ] Enterprise features and SSO
- [ ] Mobile workflow editing

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[React Flow](https://reactflow.dev/)** - Powerful React library for building node-based UIs
- **[Next.js](https://nextjs.org/)** - React framework for production applications  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Lucide](https://lucide.dev/)** - Beautiful and consistent icon system
- **[OpenAI](https://openai.com/)** - AI API for intelligent workflow processing

## 🔗 Links

- **Live Demo**: http://localhost:3040/workflow (after setup)
- **Package Demo**: http://localhost:3040/tools-demo
- **Issues**: Create GitHub issues for bug reports and feature requests
- **Discussions**: Use GitHub discussions for questions and ideas

---

**Built with ❤️ for the workflow automation community. Empowering developers to create amazing node-based applications.**
