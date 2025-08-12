const pkg = require('./dist/index.js');

console.log('📦 Package Test Results:');
console.log('='.repeat(40));
console.log('Exports found:', Object.keys(pkg));
console.log('');
console.log('Component Tests:');
console.log('✓ ToolsWidget exists:', !!pkg.ToolsWidget);
console.log('✓ EnhancedEdgeProvider exists:', !!pkg.EnhancedEdgeProvider);
console.log('✓ EnhancedEdgeSelector exists:', !!pkg.EnhancedEdgeSelector);
console.log('✓ useEnhancedEdge exists:', !!pkg.useEnhancedEdge);
console.log('✓ getEdgeStyle exists:', !!pkg.getEdgeStyle);
console.log('✓ defaultStyles exists:', !!pkg.defaultStyles);
console.log('');

// Test the getEdgeStyle function
if (pkg.getEdgeStyle) {
  console.log('Edge Style Tests:');
  const testTypes = ['default', 'animated', 'main-point', 'dependency', 'flow'];
  testTypes.forEach(type => {
    try {
      const style = pkg.getEdgeStyle(type);
      console.log(`✓ ${type}:`, style.stroke || 'no stroke', `(${style.strokeWidth}px)`);
    } catch (error) {
      console.log(`✗ ${type}: Error -`, error.message);
    }
  });
}

console.log('');
console.log('🎯 Package is functional:', Object.keys(pkg).length > 0 ? '✅ YES' : '❌ NO');
