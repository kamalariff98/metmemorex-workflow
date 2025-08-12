# Mind Map Maker

A React-based interactive mind mapping application built with React Flow, similar to tools like Mapify and Draw.io. Create, customize, and manage visual mind maps with an intuitive drag-and-drop interface.

## Features

- **Interactive Node Management**: Create, edit, and connect nodes with drag-and-drop functionality
- **Visual Hierarchy**: Automatic styling based on node hierarchy (central, main branch, regular nodes)
- **Color Customization**: 6 predefined colors plus reset option for node styling
- **Theme Support**: Dark/light mode switching
- **File Operations**: Export/import mind maps as JSON format
- **Navigation Controls**: Zoom, pan, and mini-map for easy navigation
- **Smooth Animations**: 60fps performance with smooth transitions

## Technology Stack

- **React 18+** - Modern React with hooks
- **React Flow** - Diagram and flowchart library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mindmap-maker

# Install dependencies
npm install

# Start development server
npm start
```

### Development Commands

```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
npm run lint   # Run linting
```

## Usage

### Basic Operations

- **Create Nodes**: Double-click on canvas or drag from existing node handles
- **Edit Text**: Double-click on any node to edit text in-place
- **Move Nodes**: Drag nodes to reposition them
- **Connect Nodes**: Drag from node handles to create connections
- **Delete Nodes**: Select nodes and press delete (central node cannot be deleted)

### Navigation

- **Zoom**: Mouse wheel or zoom controls
- **Pan**: Drag on empty canvas area
- **Mini-map**: Use the mini-map for overview and quick navigation

### Customization

- **Colors**: Select from 6 predefined colors or reset to default
- **Themes**: Toggle between dark and light modes
- **Node Hierarchy**: Automatic styling based on distance from central node

### File Operations

- **Export**: Save your mind map as JSON file
- **Import**: Load existing mind map from JSON file
- **Error Handling**: Graceful handling of invalid file formats

## Node Hierarchy

- **Central Node**: Blue, larger, bold text (main topic)
- **Main Branch Nodes**: Green, medium size, semi-bold (primary topics)
- **Regular Nodes**: White/gray, normal size (sub-topics)

## Performance

- Optimized for 100+ nodes
- Maintains 60fps animations
- Sub-100ms interaction response time
- Efficient JSON file sizes

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license information here]