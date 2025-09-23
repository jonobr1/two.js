# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Two.js is a renderer-agnostic 2D drawing API for modern browsers. It provides a unified interface for creating graphics across multiple rendering contexts: WebGL, Canvas2D, and SVG.

## Core Architecture

### Main Entry Point
- `src/two.js` - Main Two.js class and entry point that imports all modules
- The Two class extends Events and provides factory methods for creating shapes

### Rendering System
- **Multi-renderer architecture**: Canvas, SVG, and WebGL renderers in `src/renderers/`
- **Scene graph**: Hierarchical structure using Groups and Elements
- **Automatic renderer selection**: Based on domElement type or explicit type specification

### Core Classes
- `Element` - Base class for all drawable objects
- `Shape` - Extended Element with transformation and styling
- `Group` - Container for organizing and transforming multiple objects
- `Path` - Complex shapes defined by anchor points and curves
- `Vector` - 2D vector mathematics
- `Matrix` - 2D transformation matrices
- `Anchor` - Control points for paths with B�zier curve handles

### Shape Library
Located in `src/shapes/`:
- Basic shapes: Rectangle, Circle, Ellipse, Line, Star, Polygon
- Complex shapes: ArcSegment, RoundedRectangle, Points
- All shapes inherit from Path or Shape classes

### Effects System
Located in `src/effects/`:
- Gradients: LinearGradient, RadialGradient with Stop objects
- Images: Texture, Sprite, ImageSequence for bitmap rendering
- All effects can be applied as fill or stroke to shapes

## Build System

### Commands
- `npm run build` - Build all versions (UMD, ESM, minified) using esbuild
- `npm run dev` - Development server with esbuild on port 8080
- `npm run lint` - ESLint with auto-fix
- `npm run docs:generate` - Generate documentation from JSDoc comments
- `npm run docs:dev` - Local documentation server with Vuepress
- `npm run docs:build` - Build static documentation site

### Build Configuration
- Build script: `utils/build.js`
- Uses esbuild for fast bundling and minification
- Outputs: `build/two.js` (UMD), `build/two.module.js` (ESM), `build/two.min.js` (minified)
- Includes license header and module.exports compatibility

## Development Patterns

### Factory Methods
The Two class provides factory methods for creating and adding objects to the scene:
- `makeRectangle()`, `makeCircle()`, `makeText()`, etc.
- All factory methods automatically add objects to the scene
- Return the created object for further manipulation

### Event System
- All objects inherit from Events class
- Common events: update, render, resize, play, pause
- Use `bind()`, `unbind()`, `trigger()` for event handling

### Coordinate System
- Origin (0,0) at top-left by default
- Positive Y axis points down
- Transformations applied via translation, rotation, scale properties

### Memory Management
- Use `release()` method to unbind events and free memory
- Automatically handles nested objects, vertices, and effects
- Important for preventing memory leaks in long-running applications

## Testing

### Test Structure
- Tests located in `tests/` directory
- Test suites in `tests/suite/` organized by functionality
- HTML test runners: `tests/index.html`, `tests/noWebGL.html`
- TypeScript compilation tests in `tests/typescript/` with `index.ts` that imports and uses Two.js API

### Running Tests
- Manual browser testing via HTML files: `tests/index.html` and `tests/noWebGL.html`
- TypeScript compilation testing: `cd tests/typescript && npx tsc index.ts` to verify types work correctly

## Key Files to Understand

- `src/two.js` - Main class with factory methods and core logic
- `src/constants.js` - Global constants, types, and configuration
- `src/utils/interpret-svg.js` - SVG parsing and import functionality
- `utils/build.js` - Build system configuration
- `types.d.ts` - TypeScript definitions for the entire library

## Dependencies

Production: None (library designed to be dependency-free)
Development: esbuild, ESLint, TypeScript, Vuepress for documentation

## Browser Compatibility

Designed for modern browsers with ES6+ support. Uses feature detection for renderer capabilities.

## Development Workflow

- Always run `npm run build && npm run lint` before committing
- Test changes in `tests/index.html` for visual verification
- Use `npm run dev` for development server on port 8080
- Check TypeScript types with `npm run types`
- Test across all three renderers (Canvas, SVG, WebGL) for compatibility

## Code Style and Conventions

- Use ES6+ features consistently
- Prefer `const` over `let` where possible
- Factory methods should always return the created object
- All classes should extend appropriate base classes (Element, Shape, etc.)
- Use JSDoc comments for public API methods
- Use 2-space indentation for JavaScript files
- Place new components in appropriate src/ subdirectories

## Architecture Patterns

- All shapes inherit from Path or Shape classes
- Use factory methods (makeRectangle, makeCircle) instead of direct constructors
- Effects (gradients, textures) are applied via fill/stroke properties
- Memory management: always call release() for complex objects
- Event binding: use bind/unbind pattern, avoid anonymous functions
- Factory methods automatically add objects to the scene

## Common Issues and Solutions

- When adding new shapes, ensure they extend the correct base class
- WebGL renderer has different capabilities than Canvas/SVG
- Always test across all three renderers for compatibility
- SVG imports may need manual matrix calculations
- Memory leaks: unbind events in cleanup using release() method
- Coordinate system: origin (0,0) at top-left, positive Y axis points down

## Testing Guidelines

- Open `tests/index.html` in browser for manual testing
- Test new features across Canvas, SVG, and WebGL renderers
- Check `tests/noWebGL.html` for fallback scenarios
- TypeScript compilation tests: Run `cd tests/typescript && npx tsc index.ts` to verify TypeScript definitions work correctly
- Manual browser testing required - no automated test runner

## File Organization Rules

- New shapes go in `src/shapes/` and follow existing naming pattern
- Effects belong in `src/effects/`
- Utilities in `src/utils/` should be pure functions
- Export new classes in `src/two.js` main file
- Add TypeScript definitions to `types.d.ts`
- Renderers are in `src/renderers/` - modify with caution

## Performance Guidelines

- Minimize object creation in animation loops
- Use object pooling for frequently created/destroyed objects
- Batch DOM updates when possible
- Prefer transform operations over position updates
- Use release() method to prevent memory leaks in long-running applications

## Integration Patterns

- Node.js: Requires canvas polyfill for headless rendering
- TypeScript: Import specific modules for tree-shaking
- Bundlers: ESM build recommended for modern bundlers
- Browser: UMD build for direct script inclusion

### Nota Bene
- All visual tests run in the browser via HTML files
- TypeScript tests verify that the type definitions work correctly by compiling sample code – this is work in progress
- Manual testing approach - no automated test runners or CI integration