# Feature Request: Add dispose() Method to Two.js Elements

## Summary
Add a `dispose()` method to Two.js Element classes for proper memory management and event cleanup while preserving renderer type for potential re-attachment.

## Motivation
Currently, Two.js provides a `Two.release()` method for cleanup, but it's designed for complete teardown of objects. There's a need for a more granular cleanup method that:
- Cleans up renderer-specific resources
- Unbinds all event listeners
- Preserves the renderer type for potential re-attachment to new renderers
- Provides instance-level cleanup without requiring the Two.js instance

## Implementation Details

### Base Implementation
Added `dispose()` method to `Two.Element` base class that:
- Preserves renderer type information
- Clears renderer object while maintaining essential properties
- Unbinds all event listeners
- Returns the instance for method chaining

### Enhanced Implementations
Extended `dispose()` method for classes requiring additional cleanup:

#### Two.Path
- Unbinds vertices collection events
- Unbinds individual vertex events and control point events
- Unbinds fill/stroke effect events

#### Two.Group
- Recursively disposes all child objects
- Unbinds children collection events

#### Two.Text
- Unbinds fill/stroke effect events

#### Two.Points
- Unbinds vertices collection events
- Unbinds individual vertex events
- Unbinds fill/stroke effect events

#### Two.ImageSequence
- Stops animation if playing
- Clears animation callbacks
- Unbinds textures collection events
- Unbinds individual texture events

## Files Modified

### JavaScript Implementation
- `src/element.js` - Base dispose method
- `src/path.js` - Path-specific dispose method
- `src/group.js` - Group-specific dispose method
- `src/text.js` - Text-specific dispose method
- `src/shapes/points.js` - Points-specific dispose method
- `src/effects/image-sequence.js` - ImageSequence-specific dispose method

### TypeScript Definitions
- `types.d.ts` - Added dispose method signatures for all classes

## API Usage

```javascript
// Basic usage
const rect = two.makeRectangle(0, 0, 100, 100);
rect.dispose(); // Cleans up events and renderer resources

// Group with children
const group = two.makeGroup();
group.add(two.makeCircle(0, 0, 50));
group.dispose(); // Recursively disposes all children

// Re-attachment capability
const path = two.makePath();
path.dispose(); // Clean up current renderer
// path.renderer.type is preserved for re-attachment
```

## Benefits

1. **Memory Management**: Proper cleanup prevents memory leaks in long-running applications
2. **Renderer Flexibility**: Objects can be disposed and re-attached to different renderers
3. **Event Cleanup**: Comprehensive unbinding of all event listeners
4. **Performance**: Better resource management for applications with many objects
5. **TypeScript Support**: Full type definitions for better developer experience

## Backward Compatibility
- All changes are additive - no breaking changes
- Existing `Two.release()` method remains unchanged
- All dispose methods follow consistent patterns

## Documentation
- Complete JSDoc documentation for all methods
- TypeScript definitions with proper return types
- Consistent documentation style matching existing Two.js patterns

This feature provides developers with fine-grained control over resource cleanup while maintaining the flexibility to reuse objects across different rendering contexts.