
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

test('Rectangle Getters and Setters', function() {

  var rect = two.makeRectangle(hw, hh, qh, qh)
    .fill(1.0, 0, 0);

  console.log(rect.width, qh, rect);

  ok(rect.width === qh, 'Passed!');
  // ok(rect.height === qh);

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
