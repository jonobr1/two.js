# Two.js TypeScript Type Definitions Tests

This directory contains tests for the Two.js TypeScript type definitions (found in `types.d.ts`). These tests ensure that the TypeScript type definitions are accurate and work as expected.

## Running the Tests

1. First, install the dependencies:

```bash
cd tests/types
npm install
```

2. Run the tests:

```bash
npm test
```

3. Run the tests with coverage:

```bash
npm run test:coverage
```

4. Run the tests in watch mode:

```bash
npm run test:watch
```

## Test Structure

The tests are organized by concept:

- `basics.test.ts` - Tests for basic Two.js constructs like the main Two class, Vector, Matrix, and Shape
- `paths.test.ts` - Tests for Path and path-related shapes like Rectangle, Circle, Ellipse, etc.
- `groups.test.ts` - Tests for Group functionality and structure
- `effects.test.ts` - Tests for effects like gradients, textures, sprites, and image sequences
- `renderers.test.ts` - Tests for the different renderers (SVG, Canvas, WebGL)
- `utils.test.ts` - Tests for utility functions

## How It Works

The tests don't test the actual behavior of Two.js, but rather test that the TypeScript type definitions are correct. This is done by:

1. Creating a mock implementation of the Two.js API in `setup.ts`
2. Importing this mock implementation in each test file
3. Using TypeScript type annotations to verify that the types match the expected API

The tests validate that:
- All exported types exist and have the correct structure
- Properties have the correct types
- Methods have the correct parameter and return types
- All commonly used functionality is properly typed

## Purpose

These tests serve multiple purposes:

1. **Type checking** - The TypeScript compiler will check that the types defined in `types.d.ts` match the usage in the tests
2. **Documentation** - The tests demonstrate how to use Two.js with TypeScript
3. **Regression testing** - The tests will catch any breaking changes to the type definitions

## Contributing

When adding new features to Two.js, please also update the type definitions in `types.d.ts` and add corresponding tests in this directory. The test framework is designed to be easy to extend, so you can simply add a new test case to the appropriate test file.