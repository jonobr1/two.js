
/**
 * Setup our testing environment.
 */

Two.start();

var container = document.getElementById('renderer');

var two = new Two({
    type: Two.TYPES.canvas2d,
    parameters: {
      antialias: true,
      preserveDrawingBuffer: true
    }
  })
  .appendTo(container);

two.domElement.style.border = '1px solid #ccc';

// Make a button and container image for creating references.

var img = document.createElement('img');
img.width = two.width;
img.height = two.height;
img.style.border = '1px solid #ccc';
img.style.verticalAlign = 'top';
img.src = '';

var btn = document.createElement('button');
btn.innerHTML = 'Create Image';
btn.style.verticalAlign = 'top';

container.appendChild(img);
container.appendChild(btn);

btn.addEventListener('click', function(e) {
  e.preventDefault();
  img.src = two.domElement.toDataURL('image/png');
});

// Test each shape

/**
 * Two.Rectangle
 *------------------------------------------------------------------------------
 */

var hw = two.width / 2, hh = two.height / 2, qw = hw / 2, qh = hh / 2;

test('Two.Rectangle Getters and Setters', function() {

  var shape = two.makeRectangle(hw, hh, qh, qh)
    .fill(1.0, 0, 0);

  ok(shape.width === qh, 'Two.Rectangle width getter tested.');
  ok(shape.height === qh, 'Two.Rectangle height getter tested.');

  // Need to back-check against an image.
  shape.width = qw;
  shape.height = qw;
  ok(shape.width === qw, 'Two.Rectangle width setter tested.');
  ok(shape.height === qw, 'Two.Rectangle height setter tested.')

  ok(_.isEqual(shape.fill(), { r: 1.0, g: 0.0, b: 0.0, a: 1.0 }), 'Two.Rectangle fill getter tested.');
  ok(_.isEqual(shape.stroke(), { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }), 'Two.Rectangle stroke getter tested.');

  shape.fill(0, 1.0, 0.0);
  ok(_.isEqual(shape.fill(), { r: 0, g: 1.0, b: 0.0, a: 1.0 }), 'Two.Rectangle fill setter green tested.');
  shape.fill(0, 0, 1.0);
  ok(_.isEqual(shape.fill(), { r: 0, g: 0, b: 1.0, a: 1.0 }), 'Two.Rectangle fill setter blue tested.');
  shape.fill(0, 0, 0, 0.5);
  ok(_.isEqual(shape.fill(), { r: 0, g: 0, b: 0, a: 0.5 }), 'Two.Rectangle fill alpha tested.');

  shape.stroke(0.0, 1.0, 0.0);
  ok(_.isEqual(shape.stroke(), { r: 0, g: 1, b: 0, a: 1 }), 'Two.Rectangle stroke setter green tested.');
  shape.stroke(0, 0, 1);
  ok(_.isEqual(shape.stroke(), { r: 0, g: 0, b: 1, a: 1}), 'Two.Rectangle stroke setter blue tested.');
  shape.stroke(0, 0, 0, 1);
  ok(_.isEqual(shape.stroke(), { r: 0, g: 0, b: 0, a: 1 }), 'Two.Rectangle stroke setter alpha tested.');

  ok(shape.strokeWeight() === 1, 'Two.Rectangle strokeWeight tested.');
  shape.strokeWeight(5);
  ok(shape.strokeWeight() === 5, 'Two.Rectangle strokeWeight tested.');

  ok(shape.zIndex() === 0, 'Two.Rectangle z-index getter tested.');
  shape.zIndex(100);
  ok(shape.zIndex() === 100, 'Two.Rectangle z-index setter tested.');

  shape.noFill();
  ok(_.isEqual(shape.fill(), { r: 0, g: 0, b: 0, a: 0 }), 'Two.Rectangle noFill tested.');
  shape.fill(0, 0, 0, 0.5);
  shape.noStroke();
  ok(_.isEqual(shape.stroke(), { r: 0, g: 0, b: 0, a: 0 }) && !shape.outline.visible, 'Two.Rectangle noStroke tested.');
  shape.stroke(0, 0, 0, 1);

  // TODO: Test getVertices and setVertices...

});

// asyncTest('Draw Rectangle Test', function() {
// 
//   var rect = two.makeRectangle(two.width / 2, two.height / 2, two.height / 4, two.height / 4)
//     .fill(255, 0, 0);
// 
//   var string = toDataURL(two.domElement);
// 
//   imagePathToDataURL('../tests/images/canvas/1.png', function(dataURL) {
// 
//     console.log(string, dataURL);
// 
//     ok(string == dataURL, 'Does image match referenced image?');
// 
//     // Clean up after ourselves
//     // rect.remove();
// 
//     start();
// 
//   });
// 
// });

// Helper functions

function imagePathToDataURL(path, callback) {

  var img = document.createElement('img');
  var canvas = document.createElement('canvas');

  canvas.width = two.width;
  canvas.height = two.height;

  var ctx = canvas.getContext('2d');

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    callback(toDataURL(canvas));
  };

  img.src = path;

  document.body.appendChild(img);

}

function toDataURL(canvas) {
  return canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '')
}
