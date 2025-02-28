import Two, { type Path, type Rectangle, type RoundedRectangle, type Circle, 
  type Ellipse, type Polygon, type Star, type Line, type Anchor } from './setup';

describe('Two.js Path types', () => {
  test('Path types', () => {
    // Create a path
    const path = new Two.Path([
      new Two.Anchor(0, 0),
      new Two.Anchor(100, 0),
      new Two.Anchor(100, 100)
    ], false, false, true);
    
    // Type checks
    const testPath: Path = path;
    
    // Properties should exist on the type
    path.closed = true;
    path.curved = true;
    path.automatic = false;
    path.fill = 'red';
    path.stroke = '#000';
    path.linewidth = 2;
    path.opacity = 0.5;
    path.visible = true;
    
    expect(path).toBeDefined();
  });
  
  test('Rectangle types', () => {
    const rect = new Two.Rectangle(10, 20, 100, 50);
    
    // Type checks
    const testRect: Rectangle = rect;
    
    // Properties should exist on the type
    rect.width = 200;
    rect.height = 150;
    
    expect(rect).toBeDefined();
    
    // RoundedRectangle
    const roundedRect = new Two.RoundedRectangle(10, 20, 100, 50, 10);
    
    // Type checks
    const testRoundedRect: RoundedRectangle = roundedRect;
    
    // Properties should exist on the type
    roundedRect.radius = 20;
    
    expect(roundedRect).toBeDefined();
  });
  
  test('Circle types', () => {
    const circle = new Two.Circle(10, 20, 50);
    
    // Type checks
    const testCircle: Circle = circle;
    
    // Properties should exist on the type
    circle.radius = 75;
    
    expect(circle).toBeDefined();
  });
  
  test('Ellipse types', () => {
    const ellipse = new Two.Ellipse(10, 20, 100, 50);
    
    // Type checks
    const testEllipse: Ellipse = ellipse;
    
    // Properties should exist on the type
    ellipse.width = 200;
    ellipse.height = 150;
    
    expect(ellipse).toBeDefined();
  });
  
  test('Polygon types', () => {
    const polygon = new Two.Polygon(10, 20, 50, 6);
    
    // Type checks
    const testPolygon: Polygon = polygon;
    
    // Properties should exist on the type
    polygon.sides = 8;
    
    expect(polygon).toBeDefined();
  });
  
  test('Star types', () => {
    const star = new Two.Star(10, 20, 50, 25, 5);
    
    // Type checks
    const testStar: Star = star;
    
    // Properties should exist on the type
    star.outerRadius = 75;
    star.innerRadius = 35;
    star.sides = 7;
    
    expect(star).toBeDefined();
  });
  
  test('Line types', () => {
    const line = new Two.Line(0, 0, 100, 100);
    
    // Type checks
    const testLine: Line = line;
    
    // Properties should exist on the type
    const left = line.left;
    const right = line.right;
    
    expect(line).toBeDefined();
  });
  
  test('Anchor types', () => {
    const anchor = new Two.Anchor(0, 0, 10, 10, 20, 20);
    
    // Type checks
    const testAnchor: Anchor = anchor;
    
    // Properties should exist on the type
    const controls = anchor.controls;
    const command = anchor.command;
    
    expect(anchor).toBeDefined();
  });
});