import Two, { type Stop, type LinearGradient, type RadialGradient, 
  type Texture, type Sprite, type ImageSequence } from './setup';

describe('Two.js Effects types', () => {
  test('Gradient types', () => {
    // Create stops
    const stop1 = new Two.Stop(0, 'red', 1);
    const stop2 = new Two.Stop(1, 'blue', 1);
    
    // Type checks
    const testStop: Stop = stop1;
    
    // Properties should exist on the type
    stop1.offset = 0.2;
    stop1.color = 'green';
    stop1.opacity = 0.5;
    
    // Test LinearGradient
    const linearGradient = new Two.LinearGradient(0, 0, 100, 100, [stop1, stop2]);
    
    // Type checks
    const testLinearGradient: LinearGradient = linearGradient;
    
    // Properties should exist on the type
    const left = linearGradient.left;
    const right = linearGradient.right;
    const stops = linearGradient.stops;
    
    linearGradient.left.set(10, 10);
    
    // Test RadialGradient
    const radialGradient = new Two.RadialGradient(0, 0, 50, [stop1, stop2]);
    
    // Type checks
    const testRadialGradient: RadialGradient = radialGradient;
    
    // Properties should exist on the type
    const center = radialGradient.center;
    const radius = radialGradient.radius;
    
    radialGradient.center.set(10, 10);
    radialGradient.radius = 75;
    
    expect(stop1).toBeDefined();
    expect(linearGradient).toBeDefined();
    expect(radialGradient).toBeDefined();
  });
  
  test('Texture types', () => {
    // Create a texture
    const texture = new Two.Texture();
    
    // Type checks
    const testTexture: Texture = texture;
    
    // Properties should exist on the type
    texture.loaded;
    texture.offset.set(10, 10);
    texture.repeat = 'repeat';
    
    // Test clone method
    const clone = texture.clone();
    
    expect(texture).toBeDefined();
    expect(clone).toBeDefined();
  });
  
  test('Sprite types', () => {
    // Create a sprite
    const sprite = new Two.Sprite();
    
    // Type checks
    const testSprite: Sprite = sprite;
    
    // Properties should exist on the type
    sprite.columns = 4;
    sprite.rows = 3;
    sprite.texture;
    sprite.index;
    
    // Method types should exist
    const play = sprite.play;
    const pause = sprite.pause;
    const stop = sprite.stop;
    
    // Test play method
    sprite.play(0, 5, () => {});
    sprite.pause();
    sprite.stop();
    
    expect(sprite).toBeDefined();
  });
  
  test('ImageSequence types', () => {
    // Create textures
    const texture1 = new Two.Texture();
    const texture2 = new Two.Texture();
    
    // Create an image sequence
    const imageSequence = new Two.ImageSequence();
    
    // Type checks
    const testImageSequence: ImageSequence = imageSequence;
    
    // Properties should exist on the type
    imageSequence.frameRate = 60;
    
    // Method types should exist
    const play = imageSequence.play;
    const pause = imageSequence.pause;
    const stop = imageSequence.stop;
    
    // Test methods
    imageSequence.play(0, 1, () => {});
    imageSequence.pause();
    imageSequence.stop();
    
    expect(imageSequence).toBeDefined();
  });
  
  test('Applying effects to shapes', () => {
    const two = new Two();
    const circle = two.makeCircle(0, 0, 50);
    
    // Create a linear gradient
    const stop1 = new Two.Stop(0, 'red', 1);
    const stop2 = new Two.Stop(1, 'blue', 1);
    const linearGradient = two.makeLinearGradient(0, 0, 100, 0, stop1, stop2);
    
    // Apply gradient to fill
    circle.fill = linearGradient;
    
    // Create a radial gradient
    const radialGradient = two.makeRadialGradient(0, 0, 50, stop1, stop2);
    
    // Apply radial gradient to stroke
    circle.stroke = radialGradient;
    
    // Apply texture
    const texture = new Two.Texture();
    circle.fill = texture;
    
    expect(circle).toBeDefined();
    expect(linearGradient).toBeDefined();
    expect(radialGradient).toBeDefined();
    expect(texture).toBeDefined();
  });
});