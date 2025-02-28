import Two, { type Group, type Circle, type Rectangle, type BoundingBox } from './setup';

describe('Two.js Group types', () => {
  test('Group types', () => {
    const group = new Two.Group();
    
    // Type checks
    const testGroup: Group = group;
    
    // Properties should exist on the type
    group.position.set(10, 20);
    group.rotation = Math.PI / 4;
    group.scale = 2;
    
    expect(group).toBeDefined();
    expect(group.children).toBeDefined();
  });
  
  test('Adding children to groups', () => {
    const group = new Two.Group();
    const circle = new Two.Circle(0, 0, 50);
    const rect = new Two.Rectangle(0, 0, 100, 100);
    
    // Test add method types
    const add = group.add;
    
    // Test remove method types
    const remove = group.remove;
    
    // Test getById method types
    const getById = group.getById;
    
    group.add(circle, rect);
    group.remove(circle);
    
    expect(group).toBeDefined();
    expect(circle).toBeDefined();
    expect(rect).toBeDefined();
  });
  
  test('Group styling properties', () => {
    const group = new Two.Group();
    
    // Properties should exist on the type
    group.fill = 'red';
    group.stroke = '#000';
    group.linewidth = 2;
    group.opacity = 0.5;
    group.cap = 'round';
    group.join = 'round';
    group.miter = 10;
    
    expect(group).toBeDefined();
  });
  
  test('Group methods', () => {
    const group = new Two.Group();
    const rect = new Two.Rectangle(0, 0, 100, 100);
    group.add(rect);
    
    // Mask property
    const maskCircle = new Two.Circle(0, 0, 50);
    group.mask = maskCircle;
    
    // getBoundingClientRect method
    const getBoundingClientRect = group.getBoundingClientRect;
    const bbox = group.getBoundingClientRect();
    
    // Type check
    const testBbox: BoundingBox = bbox;
    
    // Corner and center methods
    const center = group.center;
    const corner = group.corner;
    
    group.center();
    group.corner();
    
    expect(group).toBeDefined();
    expect(rect).toBeDefined();
    expect(maskCircle).toBeDefined();
  });
  
  test('Group in Two instance', () => {
    const two = new Two();
    const group = two.makeGroup();
    
    // Add shapes to the group
    const circle = two.makeCircle(0, 0, 50);
    const rect = two.makeRectangle(100, 0, 100, 100);
    
    // Remove from scene and add to group
    two.remove(circle, rect);
    group.add(circle, rect);
    
    expect(group).toBeDefined();
    expect(circle).toBeDefined();
    expect(rect).toBeDefined();
  });
});