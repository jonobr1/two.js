import Two from 'two.js';

const two = new Two({
  fullscreen: true,
  autostart: false,
});

let path;

path = Two.Circle.fromObject({
  radius: 5,
  stroke: 'blue',
  fill: 'yellow',
  // position: new Two.Vector(),
  rotation: 5,
  translation: { x: 0, y: 0 },
});

path = new Two.Line(5, 5, 10, 10);
two.add(path);

const group = new Two.Group(path);
two.add(group);

path = new Two.Circle(3, 3, 10);
group.add(path);

path = new Two.Rectangle(25, 25, 5, 5);
group.add(path);

path = new Two.Polygon(30, 30, 5, 7);
group.add(path);

path = new Two.ArcSegment(5, 25, 5, 10, 0, Math.PI);
group.add(path);

path = new Two.Ellipse(5, 30, 10, 5);
group.add(path);

path = new Two.Star(30, 5, 10, 5);
group.add(path);

path = new Two.Points([new Two.Anchor(-2, 0), new Two.Anchor(2, 0)]);
group.add(path);

path = new Two.Path([new Two.Anchor(-1, 0), new Two.Anchor(1, 0)]);
path.closed = false;
path.automatic = true;

path.position.set(two.width / 2, two.height / 2);
path.scale = new Two.Vector(1, 1);
group.add(path);

two.appendTo(document.body);
