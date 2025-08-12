# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based mind mapping application built with React Flow, similar to tools like Mapify and Draw.io. The application enables users to create interactive mind maps with node management, visual customization, and file operations.

## Technology Stack

- **Frontend**: React 18.2+ with hooks and functional components
- **Build Tool**: Vite 4.4+ for fast development and building
- **UI Framework**: React Flow 11.10+ for interactive diagrams
- **Styling**: Tailwind CSS 3.3+ with PostCSS and Autoprefixer
- **Icons**: Lucide React 0.263+
- **Color Picker**: react-color 2.19+ for advanced color selection
- **State Management**: React built-in state (useState, useCallback, useRef, useEffect)

## Architecture & Key Components

The application is structured around a main App.jsx component that manages global state and renders specialized components:

### Core Components
- **App.jsx**: Main component with React Flow integration, state management, and event handling
- **CustomNode**: Base node component with in-place text editing
- **AdvancedToolbar**: Main toolbar with node creation, file operations, and settings
- **CustomizationPanel**: Side panel for node/edge property editing
- **ColorPalette**: Quick color selection for selected nodes
- **ShapeSelectionModal**: Modal for choosing node shapes
- **O4MiniAI**: AI-powered mind map generation panel

### Node Shape Components
Located in `src/components/shapes/`:
- CircleNode, RectangleNode, DiamondNode, EllipseNode
- HexagonNode, StarNode, HeartNode, LightningNode, TriangleNode

### Edge Types
Custom edge components in `AdvancedEdges.jsx`:
- AnimatedEdge, CrowsFootEdge, DashedEdge, ThickEdge, StepEdge, StraightEdge, SmoothStepEdge

### Node Hierarchy
- **Central Node**: Blue, larger, bold (main topic)
- **Main Branch Nodes**: Green, medium, semi-bold (primary topics)  
- **Regular Nodes**: White/gray, normal (sub-topics)

## Key Features to Implement

### Node Management
- Double-click for in-place text editing
- Drag from node handles to create connections
- Delete selected nodes (except central node)
- Automatic styling based on hierarchy

### Visual System
- 6 predefined colors plus reset option
- Smooth curved connections with arrow markers
- SmoothStep edge types with varying thickness
- Smooth transitions and scaling animations

### File Operations
- Export/import as JSON format
- Preserve node relationships and styling
- Error handling for invalid formats

### Navigation
- Mouse wheel zoom, drag to pan
- Mini-map with colored node indicators
- Background dotted grid for reference

## Development Commands

```bash
# Development server (uses Vite, runs on port 3000)
npm run dev

# Production build
npm run build

# Preview production build locally  
npm run preview

# Linting (not currently configured)
npm run lint
```

## Performance Considerations

- Target smooth rendering of 100+ nodes
- Maintain 60fps animations
- Keep interaction response time under 100ms
- Optimize JSON export file sizes

## User Interaction Patterns

- **Double-click**: Edit node text
- **Single-click**: Select node  
- **Drag**: Move nodes or pan canvas
- **Mouse wheel**: Zoom in/out
- **Drag from edge**: Create connections

## Testing Strategy

Focus testing on:
- Component rendering and React Flow integration
- Node creation and connection workflows
- File import/export operations
- Theme switching consistency
- Cross-browser compatibility

## Implementation Notes

- **State Management**: Uses React hooks extensively (useState, useCallback, useRef, useEffect)
- **Node Management**: Central node cannot be deleted; automatic positioning for main branches using polar coordinates
- **File Processing**: Client-side JSON export/import with error handling for invalid formats
- **Theme System**: CSS class-based dark mode switching with Tailwind classes
- **Performance**: Optimized with useCallback for event handlers to prevent unnecessary re-renders
- **React Flow Integration**: Custom node types, edge types, and connection handling
- **AI Integration**: O4MiniAI component for automated mind map generation from file uploads

## Key State Variables

- `nodes`, `edges`: React Flow state managed with useNodesState/useEdgesState
- `selectedNodes`, `selectedEdges`: Arrays tracking currently selected elements for styling operations
- `isDarkMode`: Boolean controlling theme switching
- `reactFlowInstance`: Reference to React Flow instance for export functionality
- Node data structure includes: `label`, `nodeType` (central/main/regular), `size`, `color`, `onLabelChange`