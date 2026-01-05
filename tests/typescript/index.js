"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var two_js_1 = require("two.js");
var two = new two_js_1.default({
    fullscreen: true,
    autostart: false,
});
var path;
path = two_js_1.default.Circle.fromObject({
    radius: 5,
    stroke: 'blue',
    fill: 'yellow',
    // position: new Two.Vector(),
    rotation: 5,
    translation: { x: 0, y: 0 },
});
path = new two_js_1.default.Line(5, 5, 10, 10);
two.add(path);
var group = new two_js_1.default.Group(path);
two.add(group);
path = new two_js_1.default.Circle(3, 3, 10);
group.add(path);
path = new two_js_1.default.Rectangle(25, 25, 5, 5);
group.add(path);
path = new two_js_1.default.Polygon(30, 30, 5, 7);
group.add(path);
path = new two_js_1.default.ArcSegment(5, 25, 5, 10, 0, Math.PI);
group.add(path);
path = new two_js_1.default.Ellipse(5, 30, 10, 5);
group.add(path);
path = new two_js_1.default.Star(30, 5, 10, 5);
group.add(path);
path = new two_js_1.default.Points([new two_js_1.default.Anchor(-2, 0), new two_js_1.default.Anchor(2, 0)]);
group.add(path);
path = new two_js_1.default.Path([new two_js_1.default.Anchor(-1, 0), new two_js_1.default.Anchor(1, 0)]);
path.closed = false;
path.automatic = true;
path.position.set(two.width / 2, two.height / 2);
path.scale = new two_js_1.default.Vector(1, 1);
group.add(path);
two.appendTo(document.body);
