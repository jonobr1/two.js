import Two, { type Matrix, type Shape, type Vector, type Anchor, 
  type Registry, type TwoError } from './setup';

describe('Two.js Utils types', () => {
  test('Math utility types', () => {
    // Test decomposeMatrix
    const matrix = new Two.Matrix();
    
    // Function types should exist
    const decomposeMatrix = Two.Utils.decomposeMatrix;
    const getComputedMatrix = Two.Utils.getComputedMatrix;
    const lerp = Two.Utils.lerp;
    const mod = Two.Utils.mod;
    const toFixed = Two.Utils.toFixed;
    
    // Test function calls to check types
    Two.Utils.decomposeMatrix(matrix);
    Two.Utils.decomposeMatrix(1, 0, 0, 1, 0, 0);
    
    const shape = new Two.Shape();
    Two.Utils.getComputedMatrix(shape);
    
    Two.Utils.lerp(0, 10, 0.5);
    Two.Utils.mod(5, 3);
    Two.Utils.toFixed(1.2345);
    
    expect(Two.Utils).toBeDefined();
  });
  
  test('Curve utility types', () => {
    // Function types should exist
    const getComponentOnCubicBezier = Two.Utils.getComponentOnCubicBezier;
    const subdivide = Two.Utils.subdivide;
    const getCurveLength = Two.Utils.getCurveLength;
    const getCurveBoundingBox = Two.Utils.getCurveBoundingBox;
    const getControlPoints = Two.Utils.getControlPoints;
    const getReflection = Two.Utils.getReflection;
    
    // Test function calls to check types
    Two.Utils.getComponentOnCubicBezier(0.5, 0, 1, 1, 2);
    Two.Utils.subdivide(0, 0, 1, 1, 2, 2, 3, 3);
    Two.Utils.getCurveLength(0, 0, 1, 1, 2, 2, 3, 3);
    Two.Utils.getCurveBoundingBox(0, 0, 1, 1, 2, 2, 3, 3);
    
    const anchor1 = new Two.Anchor(0, 0);
    const anchor2 = new Two.Anchor(1, 1);
    const anchor3 = new Two.Anchor(2, 0);
    Two.Utils.getControlPoints(anchor1, anchor2, anchor3);
    
    const vec1 = new Two.Vector(0, 0);
    const vec2 = new Two.Vector(1, 1);
    Two.Utils.getReflection(vec1, vec2);
    
    expect(Two.Utils).toBeDefined();
  });
  
  test('Device pixel ratio utility', () => {
    // Function type should exist
    const getRatio = Two.Utils.getRatio;
    
    expect(Two.Utils).toBeDefined();
  });
  
  test('Error utility', () => {
    // Class should exist
    const Error = Two.Utils.Error;
    
    // Create an instance
    const error = new Two.Utils.Error('Test error');
    
    // Type check
    type TestError = typeof Two.Utils.Error;
    
    expect(Two.Utils).toBeDefined();
    expect(error).toBeDefined();
  });
  
  test('Registry utility', () => {
    const registry = new Two.Registry();
    
    // Type check
    const testRegistry: Registry = registry;
    
    // Method types should exist
    const add = registry.add;
    const remove = registry.remove;
    const get = registry.get;
    const contains = registry.contains;
    
    // Test methods
    registry.add('test', { value: 'test' });
    registry.get('test');
    registry.contains('test');
    registry.remove('test');
    
    expect(registry).toBeDefined();
  });
});