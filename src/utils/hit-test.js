import { Commands } from './path-commands.js';
import { getSubdivisions } from './shape.js';
import { Constants } from '../constants.js';
import { mod, TWO_PI } from './math.js';

const TRANSPARENT_REGEX = /^(?:none|transparent)$/i;
const DEFAULT_PRECISION = 8;
const EPSILON = Number.EPSILON;

function createPoint(x, y) {
  return { x, y };
}

function pointsEqual(a, b, epsilon = EPSILON) {
  return Math.abs(a.x - b.x) <= epsilon && Math.abs(a.y - b.y) <= epsilon;
}

function svgAngle(ux, uy, vx, vy) {
  const dot = ux * vx + uy * vy;
  const len =
    Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy) || 1e-12;
  let ang = Math.acos(Math.max(-1, Math.min(1, dot / len)));
  if (ux * vy - uy * vx < 0) {
    ang = -ang;
  }
  return ang;
}

function sampleArcPoints(prev, anchor, precision) {
  if (!prev) {
    return [createPoint(anchor.x, anchor.y)];
  }

  let rx = anchor.rx;
  let ry = anchor.ry;

  if (!(rx && ry)) {
    return [createPoint(anchor.x, anchor.y)];
  }

  const xAxisRotation = ((anchor.xAxisRotation || 0) * Math.PI) / 180;
  const largeArcFlag = anchor.largeArcFlag ? 1 : 0;
  const sweepFlag = anchor.sweepFlag ? 1 : 0;

  rx = Math.abs(rx);
  ry = Math.abs(ry);

  const ax = prev.x;
  const ay = prev.y;
  const x = anchor.x;
  const y = anchor.y;

  const dx2 = (ax - x) / 2;
  const dy2 = (ay - y) / 2;

  const cosRot = Math.cos(xAxisRotation);
  const sinRot = Math.sin(xAxisRotation);

  let x1p = cosRot * dx2 + sinRot * dy2;
  let y1p = -sinRot * dx2 + cosRot * dy2;

  let rxs = rx * rx;
  let rys = ry * ry;

  const cr = (x1p * x1p) / rxs + (y1p * y1p) / rys;

  if (cr > 1) {
    const s = Math.sqrt(cr);
    rx *= s;
    ry *= s;
    rxs = rx * rx;
    rys = ry * ry;
  }

  const dq = rxs * y1p * y1p + rys * x1p * x1p;
  const pq = dq === 0 ? 0 : (rxs * rys - dq) / dq;
  let q = Math.sqrt(Math.max(0, pq));

  if (largeArcFlag === sweepFlag) {
    q = -q;
  }

  const cxp = (q * rx * y1p) / ry;
  const cyp = (-q * ry * x1p) / rx;

  const cx = cosRot * cxp - sinRot * cyp + (ax + x) / 2;
  const cy = sinRot * cxp + cosRot * cyp + (ay + y) / 2;

  const startAngle = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  const delta =
    svgAngle(
      (x1p - cxp) / rx,
      (y1p - cyp) / ry,
      (-x1p - cxp) / rx,
      (-y1p - cyp) / ry
    ) % TWO_PI;

  const endAngle = startAngle + delta;
  const clockwise = sweepFlag === 0;

  const angleDelta = (() => {
    const raw = endAngle - startAngle;
    const samePoints = Math.abs(raw) < Number.EPSILON;

    let deltaAngle = mod(raw, TWO_PI);

    if (deltaAngle < Number.EPSILON) {
      deltaAngle = samePoints ? 0 : TWO_PI;
    }

    if (clockwise && !samePoints) {
      deltaAngle = deltaAngle === TWO_PI ? -TWO_PI : deltaAngle - TWO_PI;
    }

    return deltaAngle;
  })();

  const steps = Math.max(Constants.Resolution, Math.max(precision * 2, 1));

  const points = [];

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const angle = startAngle + t * angleDelta;

    let px = cx + rx * Math.cos(angle);
    let py = cy + ry * Math.sin(angle);

    if (xAxisRotation !== 0) {
      const tx = px - cx;
      const ty = py - cy;
      const cosR = Math.cos(xAxisRotation);
      const sinR = Math.sin(xAxisRotation);
      px = tx * cosR - ty * sinR + cx;
      py = tx * sinR + ty * cosR + cy;
    }

    points.push(createPoint(px, py));
  }

  return points;
}

function buildPathHitParts(path, precision = DEFAULT_PRECISION) {
  const polygons = [];
  const segments = [];

  const vertices =
    path._renderer &&
    path._renderer.vertices &&
    path._renderer.vertices.length > 0
      ? path._renderer.vertices
      : path.vertices;

  if (!vertices || vertices.length === 0) {
    return { polygons, segments };
  }

  const limit = Math.max(1, Math.floor(precision));

  let currentPolygon = null;
  let firstPoint = null;
  let lastPoint = null;
  let prevVertex = null;

  const closePolygon = (forceClose = false) => {
    if (!currentPolygon) {
      return;
    }

    if (
      forceClose &&
      firstPoint &&
      lastPoint &&
      !pointsEqual(firstPoint, lastPoint)
    ) {
      const closingPoint = createPoint(firstPoint.x, firstPoint.y);
      segments.push({ a: lastPoint, b: closingPoint });
      currentPolygon.push(closingPoint);
      lastPoint = closingPoint;
    }

    if (
      currentPolygon.length >= 3 &&
      firstPoint &&
      lastPoint &&
      pointsEqual(firstPoint, lastPoint)
    ) {
      polygons.push(currentPolygon);
    }

    currentPolygon = null;
    firstPoint = null;
    lastPoint = null;
  };

  const appendPoint = (pt) => {
    if (!lastPoint) {
      lastPoint = pt;
      if (currentPolygon) {
        currentPolygon.push(pt);
      }
      return;
    }

    if (pointsEqual(lastPoint, pt)) {
      return;
    }

    segments.push({ a: lastPoint, b: pt });
    if (currentPolygon) {
      currentPolygon.push(pt);
    }
    lastPoint = pt;
  };

  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    const command = vertex.command || (i === 0 ? Commands.move : Commands.line);

    if (command === Commands.move) {
      closePolygon(false);
      const pt = createPoint(vertex.x, vertex.y);
      currentPolygon = [pt];
      firstPoint = pt;
      lastPoint = pt;
      prevVertex = vertex;
      continue;
    }

    if (!prevVertex) {
      prevVertex = vertices[Math.max(i - 1, 0)];
    }

    if (command === Commands.line) {
      appendPoint(createPoint(vertex.x, vertex.y));
    } else if (command === Commands.curve) {
      const subdivisions = getSubdivisions(vertex, prevVertex, limit);
      for (let j = 1; j < subdivisions.length; j++) {
        const sv = subdivisions[j];
        appendPoint(createPoint(sv.x, sv.y));
      }
      appendPoint(createPoint(vertex.x, vertex.y));
    } else if (command === Commands.arc) {
      const arcPoints = sampleArcPoints(prevVertex, vertex, limit);
      for (let j = 0; j < arcPoints.length; j++) {
        appendPoint(arcPoints[j]);
      }
    } else if (command === Commands.close) {
      closePolygon(true);
      prevVertex = vertex;
      continue;
    } else {
      appendPoint(createPoint(vertex.x, vertex.y));
    }

    prevVertex = vertex;
  }

  if (currentPolygon) {
    const shouldForceClose =
      !!path._closed ||
      !!path.closed ||
      (firstPoint && lastPoint && !pointsEqual(firstPoint, lastPoint));
    closePolygon(shouldForceClose);
  }

  return { polygons, segments };
}

function pointInPolygons(polygons, x, y) {
  let inside = false;

  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i];
    if (!polygon || polygon.length < 3) {
      continue;
    }

    let lastIndex = polygon.length - 1;

    for (let j = 0; j < polygon.length; j++) {
      const v0 = polygon[lastIndex];
      const v1 = polygon[j];

      const intersects =
        v1.y > y !== v0.y > y &&
        x < ((v0.x - v1.x) * (y - v1.y)) / (v0.y - v1.y || 1e-12) + v1.x;

      if (intersects) {
        inside = !inside;
      }

      lastIndex = j;
    }
  }

  return inside;
}

function distanceToSegmentSquared(x, y, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
    const ddx = x - a.x;
    const ddy = y - a.y;
    return ddx * ddx + ddy * ddy;
  }

  const t = ((x - a.x) * dx + (y - a.y) * dy) / (dx * dx + dy * dy);
  const clamped = Math.max(0, Math.min(1, t));

  const cx = a.x + clamped * dx;
  const cy = a.y + clamped * dy;

  const ddx = x - cx;
  const ddy = y - cy;
  return ddx * ddx + ddy * ddy;
}

function distanceToSegments(segments, x, y) {
  if (!segments || segments.length === 0) {
    return Infinity;
  }

  let minDistance = Infinity;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const distance = distanceToSegmentSquared(x, y, segment.a, segment.b);
    if (distance < minDistance) {
      minDistance = distance;
    }
  }

  return Math.sqrt(minDistance);
}

function hasVisibleFill(shape, override) {
  if (typeof override === 'boolean') {
    return override;
  }

  const fill = shape.fill;

  if (!fill && fill !== 0) {
    return false;
  }

  if (typeof fill === 'string') {
    return !TRANSPARENT_REGEX.test(fill);
  }

  return true;
}

function hasVisibleStroke(shape, override) {
  const linewidth =
    typeof shape.linewidth === 'number'
      ? shape.linewidth
      : shape._linewidth || 0;

  if (typeof override === 'boolean') {
    return override && linewidth > 0;
  }

  if (!(linewidth > 0)) {
    return false;
  }

  const stroke = shape.stroke;

  if (!stroke && stroke !== 0) {
    return false;
  }

  if (typeof stroke === 'string') {
    return !TRANSPARENT_REGEX.test(stroke);
  }

  return true;
}

function boundsContains(rect, x, y, tolerance = 0) {
  if (!rect) {
    return false;
  }

  const left = rect.left - tolerance;
  const right = rect.right + tolerance;
  const top = rect.top - tolerance;
  const bottom = rect.bottom + tolerance;

  return x >= left && x <= right && y >= top && y <= bottom;
}

export {
  buildPathHitParts,
  pointInPolygons,
  distanceToSegments,
  hasVisibleFill,
  hasVisibleStroke,
  boundsContains,
};
