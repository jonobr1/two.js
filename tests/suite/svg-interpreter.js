/**
 * Tests Two.js Utilities related to Svg Interpretation:
 * + two.interpret()
 * + polygon.subdivide()
 */

(function() {

  module('SvgInterpreter');

  asyncTest('Two.interpret', 7, function(o) {

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      QUnit.Utils.get('./images/interpretation/D.svg', function(resp) {

        var answer = {"children":[{"vertices":[{"x":122.049,"y":350,"command":"M","controls":{"left":{"x":122.049,"y":350},"right":{"x":122.049,"y":350}}},{"x":122.10700000000001,"y":50,"command":"L","controls":{"left":{"x":122.10700000000001,"y":50},"right":{"x":200.00600000000003,"y":50}}},{"x":277.952,"y":118.883,"command":"C","controls":{"left":{"x":277.952,"y":51.528999999999996},"right":{"x":277.952,"y":118.883}}},{"x":277.952,"y":273.965,"command":"C","controls":{"left":{"x":277.952,"y":197.98899999999998},"right":{"x":277.951,"y":349.941}}},{"x":122.049,"y":350,"command":"C","controls":{"left":{"x":200.006,"y":350},"right":{"x":122.049,"y":350}}}],"rotation":0,"scale":1}],"translation":{"x":200,"y":200},"rotation":0,"scale":1};
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).center();

        shape.translation.set(two.width / 2, two.height / 2);

        two.update();

        ok(QUnit.Utils.shapeEquals(answer, shape), 'Two.interpret imports <path> properly.');
        start();

        QUnit.Utils.addElemToTest(o, [two.renderer.domElement, svg]);

      });

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      QUnit.Utils.get('./images/interpretation/K.svg', function(resp) {

        var answer = {"children":[{"vertices":[{"x":0.1419999999999959,"y":-150,"command":"M"},{"x":-0.1419999999999959,"y":150,"command":"L"}],"rotation":0,"scale":1},{"vertices":[{"x":77.44849999999997,"y":-97.33449999999999,"command":"M"},{"x":-77.44849999999997,"y":97.33449999999999,"command":"L"}],"rotation":0,"scale":1},{"vertices":[{"x":-57.42400000000001,"y":-86.08600000000001,"command":"M"},{"x":57.42400000000001,"y":86.08600000000001,"command":"L"}],"rotation":0,"scale":1}],"translation":{"x":200,"y":200},"rotation":0,"scale":1};
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).center();

        shape.translation.set(two.width / 2, two.height / 2);

        two.update();

        ok(QUnit.Utils.shapeEquals(answer, shape), 'Two.interpret imports <line> properly.');
        start();

        QUnit.Utils.addElemToTest(o, [two.renderer.domElement, svg]);

      });

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      QUnit.Utils.get('./images/interpretation/circle.svg', function(resp) {

        var answer = {"children":[{"vertices":[{"x":100,"y":0,"command":"M","controls":{"left":{"x":100,"y":-25.257106536095936},"right":{"x":100,"y":25.25710653609592}}},{"x":70.71067811865476,"y":70.71067811865474,"command":"C","controls":{"left":{"x":88.57014942347925,"y":52.851206813830245},"right":{"x":52.851206813830245,"y":88.57014942347924}}},{"x":6.123031769111886e-15,"y":100,"command":"C","controls":{"left":{"x":25.257106536095932,"y":100},"right":{"x":-25.257106536095915,"y":100}}},{"x":-70.71067811865474,"y":70.71067811865476,"command":"C","controls":{"left":{"x":-52.851206813830245,"y":88.57014942347925},"right":{"x":-88.57014942347924,"y":52.85120681383025}}},{"x":-100,"y":1.2246063538223773e-14,"command":"C","controls":{"left":{"x":-99.99999999999999,"y":25.257106536095936},"right":{"x":-100,"y":-25.257106536095915}}},{"x":-70.71067811865477,"y":-70.71067811865474,"command":"C","controls":{"left":{"x":-88.57014942347926,"y":-52.85120681383024},"right":{"x":-52.85120681383027,"y":-88.57014942347924}}},{"x":-1.836909530733566e-14,"y":-100,"command":"C","controls":{"left":{"x":-25.257106536095943,"y":-100},"right":{"x":25.257106536095908,"y":-100}}},{"x":70.71067811865474,"y":-70.71067811865477,"command":"C","controls":{"left":{"x":52.851206813830245,"y":-88.57014942347928},"right":{"x":88.57014942347925,"y":-52.85120681383026}}}],"rotation":0,"scale":1}],"translation":{"x":200,"y":200},"rotation":0,"scale":1};
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).center();

        shape.translation.set(two.width / 2, two.height / 2);

        two.update();

        ok(QUnit.Utils.shapeEquals(answer, shape), 'Two.interpret imports <circle> properly.');
        start();

        QUnit.Utils.addElemToTest(o, [two.renderer.domElement, svg]);

      });

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      QUnit.Utils.get('./images/interpretation/rect.svg', function(resp) {

        var answer = {"children":[{"vertices":[{"x":100,"y":100,"command":"M"},{"x":-100,"y":100,"command":"L"},{"x":-100,"y":-100,"command":"L"},{"x":100,"y":-100,"command":"L"}],"rotation":0,"scale":1}],"translation":{"x":200,"y":200},"rotation":0,"scale":1};
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).center();

        shape.translation.set(two.width / 2, two.height / 2);

        two.update();

        ok(QUnit.Utils.shapeEquals(answer, shape), 'Two.interpret imports <rect> properly.');
        start();

        QUnit.Utils.addElemToTest(o, [two.renderer.domElement, svg]);

      });

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      QUnit.Utils.get('./images/interpretation/ellipse.svg', function(resp) {

        var answer = {"children":[{"vertices":[{"x":150,"y":0,"command":"M","controls":{"left":{"x":150,"y":-23.068791917986825},"right":{"x":150,"y":23.068791917986818}}},{"x":106.06601717798213,"y":54.374390152901945,"command":"C","controls":{"left":{"x":125.73007811641895,"y":42.31230625480136},"right":{"x":75.56491679098507,"y":73.08399611904339}}},{"x":9.18454765366783e-15,"y":76.897,"command":"C","controls":{"left":{"x":35.78220899030619,"y":76.897},"right":{"x":-35.78220899030618,"y":76.897}}},{"x":-106.06601717798212,"y":54.37439015290195,"command":"C","controls":{"left":{"x":-75.56491679098505,"y":73.0839961190434},"right":{"x":-125.73007811641894,"y":42.31230625480137}}},{"x":-150,"y":9.416855478987935e-15,"command":"C","controls":{"left":{"x":-150,"y":23.06879191798683},"right":{"x":-150,"y":-23.068791917986808}}},{"x":-106.06601717798215,"y":-54.374390152901945,"command":"C","controls":{"left":{"x":-125.73007811641897,"y":-42.31230625480136},"right":{"x":-75.56491679098508,"y":-73.0839961190434}}},{"x":-2.7553642961003488e-14,"y":-76.897,"command":"C","controls":{"left":{"x":-35.78220899030621,"y":-76.897},"right":{"x":35.78220899030616,"y":-76.897}}},{"x":106.0660171779821,"y":-54.37439015290196,"command":"C","controls":{"left":{"x":75.56491679098504,"y":-73.08399611904342},"right":{"x":125.73007811641892,"y":-42.31230625480137}}}],"rotation":0,"scale":1}],"translation":{"x":200,"y":200},"rotation":0,"scale":1};
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).center();

        shape.translation.set(two.width / 2, two.height / 2);

        two.update();

        ok(QUnit.Utils.shapeEquals(answer, shape), 'Two.interpret imports <ellipse> properly.');
        start();

        QUnit.Utils.addElemToTest(o, [two.renderer.domElement, svg]);

      });

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      QUnit.Utils.get('./images/interpretation/polyline.svg', function(resp) {

        var answer = {"children":[{"vertices":[{"x":20.079,"y":104.42,"command":"M"},{"x":47.352,"y":104.42,"command":"L"},{"x":47.352,"y":90.785,"command":"L"},{"x":74.625,"y":90.785,"command":"L"},{"x":74.625,"y":104.42,"command":"L"},{"x":101.897,"y":104.42,"command":"L"},{"x":101.897,"y":70.33,"command":"L"},{"x":129.17,"y":70.33,"command":"L"},{"x":129.17,"y":104.42,"command":"L"},{"x":156.442,"y":104.42,"command":"L"},{"x":156.442,"y":49.875,"command":"L"},{"x":183.715,"y":49.875,"command":"L"},{"x":183.715,"y":104.42,"command":"L"},{"x":210.988,"y":104.42,"command":"L"},{"x":210.988,"y":29.42,"command":"L"},{"x":238.26,"y":29.42,"command":"L"},{"x":238.26,"y":104.42,"command":"L"},{"x":265.534,"y":104.42,"command":"L"},{"x":265.534,"y":8.965,"command":"L"},{"x":292.805,"y":8.965,"command":"L"},{"x":292.805,"y":104.42,"command":"L"},{"x":320.079,"y":104.42,"command":"L"}],"rotation":0,"scale":1}],"translation":{"x":200,"y":200},"rotation":0,"scale":1};
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).center();

        shape.translation.set(two.width / 2, two.height / 2);

        two.update();

        ok(QUnit.Utils.shapeEquals(answer, shape), 'Two.interpret imports <polyline> properly.');
        start();

        QUnit.Utils.addElemToTest(o, [two.renderer.domElement, svg]);

      });

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      QUnit.Utils.get('./images/interpretation/polygon.svg', function(resp) {

        var answer = {"children":[{"vertices":[{"x":99.212,"y":21.26,"command":"M"},{"x":107.433,"y":45.638,"command":"L"},{"x":132.945,"y":45.638,"command":"L"},{"x":112.536,"y":60.945,"command":"L"},{"x":119.905,"y":85.323,"command":"L"},{"x":99.212,"y":70.867,"command":"L"},{"x":78.52,"y":85.323,"command":"L"},{"x":85.89,"y":60.945,"command":"L"},{"x":65.48,"y":45.638,"command":"L"},{"x":90.992,"y":45.638,"command":"L"}],"rotation":0,"scale":1},{"vertices":[{"x":240.945,"y":21.26,"command":"M"},{"x":271.559,"y":38.977,"command":"L"},{"x":271.559,"y":74.41,"command":"L"},{"x":240.945,"y":92.126,"command":"L"},{"x":210.331,"y":74.438,"command":"L"},{"x":210.331,"y":38.977,"command":"L"}],"rotation":0,"scale":1}],"translation":{"x":200,"y":200},"rotation":0,"scale":1};
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).center();

        shape.translation.set(two.width / 2, two.height / 2);

        two.update();

        ok(QUnit.Utils.shapeEquals(answer, shape), 'Two.interpret imports <polygon> properly.');
        start();

        QUnit.Utils.addElemToTest(o, [two.renderer.domElement, svg]);

      });

    })();

  });

  // Use this function to get an answer of interpreted Two.Polygon
  function retrieveObject(shape) {
    var result = shape.toObject();
    result.children = _.toArray(result.children);
    console.log(JSON.stringify(result));
    return result;
  }

})();
