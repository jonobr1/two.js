import Two, { type SVGRenderer, type CanvasRenderer, type WebGLRenderer } from './setup';

describe('Two.js Renderer types', () => {
  test('SVGRenderer types', () => {
    const svgRenderer = new Two.SVGRenderer();
    
    // Type checks
    const testRenderer: SVGRenderer = svgRenderer;
    
    // Properties should exist on the type
    const domElement = svgRenderer.domElement;
    const scene = svgRenderer.scene;
    
    // Method types should exist
    const setSize = svgRenderer.setSize;
    const render = svgRenderer.render;
    
    // Test methods
    svgRenderer.setSize(800, 600);
    svgRenderer.render();
    
    expect(svgRenderer).toBeDefined();
  });
  
  test('CanvasRenderer types', () => {
    const canvasRenderer = new Two.CanvasRenderer();
    
    // Type checks
    const testRenderer: CanvasRenderer = canvasRenderer;
    
    // Properties should exist on the type
    const domElement = canvasRenderer.domElement;
    const scene = canvasRenderer.scene;
    const overdraw = canvasRenderer.overdraw;
    
    // Method types should exist
    const setSize = canvasRenderer.setSize;
    const render = canvasRenderer.render;
    
    // Test methods
    canvasRenderer.setSize(800, 600);
    canvasRenderer.render();
    
    expect(canvasRenderer).toBeDefined();
  });
  
  test('WebGLRenderer types', () => {
    const webglRenderer = new Two.WebGLRenderer();
    
    // Type checks
    const testRenderer: WebGLRenderer = webglRenderer;
    
    // Properties should exist on the type
    const domElement = webglRenderer.domElement;
    const scene = webglRenderer.scene;
    const overdraw = webglRenderer.overdraw;
    
    // Method types should exist
    const setSize = webglRenderer.setSize;
    const render = webglRenderer.render;
    
    // Test methods
    webglRenderer.setSize(800, 600);
    webglRenderer.render();
    
    expect(webglRenderer).toBeDefined();
  });
  
  test('Two instance with renderer', () => {
    // Test SVG renderer
    const twoSvg = new Two({
      type: Two.Types.svg,
      width: 800,
      height: 600
    });
    
    // Test Canvas renderer
    const twoCanvas = new Two({
      type: Two.Types.canvas,
      width: 800,
      height: 600
    });
    
    // Test WebGL renderer
    const twoWebGL = new Two({
      type: Two.Types.webgl,
      width: 800,
      height: 600
    });
    
    expect(twoSvg).toBeDefined();
    expect(twoCanvas).toBeDefined();
    expect(twoWebGL).toBeDefined();
  });
});