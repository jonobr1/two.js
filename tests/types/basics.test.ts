import Two, { type Vector, type Matrix, type Shape } from './setup';

describe('Two.js types', () => {
  test('Two constructor types', () => {
    // Test constructor with empty options
    const two1 = new Two();
    expect(two1).toBeDefined();

    // Test constructor with options
    const two2 = new Two({
      fullscreen: true,
      autostart: true,
      width: 800,
      height: 600,
      type: Two.Types.svg
    });
    expect(two2).toBeDefined();
    expect(two2.width).toBe(800);
    expect(two2.height).toBe(600);
  });

  test('Two static properties', () => {
    // Check basic static properties
    expect(Two.Types).toBeDefined();
    expect(Two.Version).toBeDefined();
    expect(Two.Instances).toBeDefined();
  });

  test('Vector types', () => {
    // We're not testing the actual implementation, just that the types work
    const vector = new Two.Vector(10, 20);
    
    // Type checks (these don't actually run in Jest but help typecheck)
    const testVector: Vector = vector;
    testVector.x = 10;
    testVector.y = 20;
    
    // Methods should exist on the type
    const add = vector.add;
    const sub = vector.sub;
    const dist = Two.Vector.distanceBetween;
    
    expect(vector).toBeDefined();
  });

  test('Matrix types', () => {
    const matrix = new Two.Matrix();
    
    // Type checks
    const testMatrix: Matrix = matrix;
    
    // Methods should exist on the type
    const translate = matrix.translate;
    const scale = matrix.scale;
    const rotate = matrix.rotate;
    
    expect(matrix).toBeDefined();
  });

  test('Shape types', () => {
    const shape = new Two.Shape();
    
    // Type checks
    const testShape: Shape = shape;
    
    // Properties should exist on the type
    const position = shape.position;
    const rotation = shape.rotation;
    const scale = shape.scale;
    const matrix = shape.matrix;
    
    expect(shape).toBeDefined();
  });
});