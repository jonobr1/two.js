import Two from 'two.js';
import { Arc } from 'two.js/extras/jsm/arc';
import { ZUI } from 'two.js/extras/jsm/zui';
import { Renderer as CanvasRenderer } from 'two.js/src/renderers/canvas';
import { Renderer as SVGRenderer } from 'two.js/src/renderers/svg';
import { Renderer as WebGLRenderer } from 'two.js/src/renderers/webgl';

const two = new Two({
  fullscreen: true,
  autostart: false,
});

let path;

path = new Two.Line(5, 5, 10, 10);
two.add(path);

const group = new Two.Group(path);
two.add(group);

const gradient = Two.Gradient.fromObject({
  stops: [{ offset: 0, color: '#fff', opacity: 1 }],
});
gradient.stops[0].color = '#000';

const polygon = new Two.Polygon(30, 30, 5, 7);
polygon.radius = 10;

const registry = new Two.Registry();
registry.add('polygon', polygon);
const hasPolygon: boolean = registry.contains('polygon');

const releasedPolygon = two.release(polygon);
releasedPolygon.radius = 5;
const releasedScene = two.release();
releasedScene.add(new Two.Circle());
two.release(undefined).add(new Two.Rectangle());

two.makeTexture();

new Two.ArcSegment().clone().startAngle = 0;
new Two.Circle().clone().radius = 10;
new Two.ImageSequence().clone().frameRate = 24;
new Two.Points().clone().size = 2;
new Two.Polygon().clone().radius = 10;
new Two.Rectangle().clone().width = 10;
new Two.Star().clone().innerRadius = 5;
new Two.Text().clone().value = 'clone';
new Two.Image().clone().mode = 'fit';
new Two.Ellipse().clone().width = 10;
new Two.RoundedRectangle().clone().radius = 5;

const zui = new ZUI(group);
zui.addLimits(0.1, 10);
zui.clientToSurface(10, 20);
zui.surfaceToClient(10, 20, 1);
// @ts-expect-error addLimits only accepts minimum and maximum scale.
zui.addLimits(0.1, 10, 1);

const arc = new Arc(0, 0, 20, 10, 0, Math.PI);
arc.clone().endAngle = Math.PI * 2;

new CanvasRenderer({});
new SVGRenderer({});
new WebGLRenderer({});
// @ts-expect-error Renderer constructors require a parameter object.
new CanvasRenderer();
// @ts-expect-error Renderer constructors require a parameter object.
new SVGRenderer();
// @ts-expect-error Renderer constructors require a parameter object.
new WebGLRenderer();

void hasPolygon;
void releasedScene;

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
