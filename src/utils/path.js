import { lerp, mod } from './math.js';
import { Commands } from './path-commands.js';

import { Vector } from '../vector.js';
import { Anchor } from '../anchor.js';

const EPSILON = Number.EPSILON;

function isRelativeAnchor(anchor) {
  return !(typeof anchor.relative === 'boolean') || !!anchor.relative;
}

function setHandleComponent(anchor, side, dx, dy) {
  const controls = anchor.controls;
  if (!controls || !controls[side]) {
    return;
  }

  if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
    if (isRelativeAnchor(anchor)) {
      controls[side].clear();
    } else {
      controls[side].set(anchor.x, anchor.y);
    }
    return;
  }

  if (isRelativeAnchor(anchor)) {
    controls[side].set(dx, dy);
  } else {
    controls[side].set(anchor.x + dx, anchor.y + dy);
  }
}

function clearHandleComponent(anchor, side) {
  setHandleComponent(anchor, side, 0, 0);
}

function getHandleOffset(anchor, side) {
  const controls = anchor.controls;
  if (!controls || !controls[side]) {
    return { x: 0, y: 0 };
  }

  if (isRelativeAnchor(anchor)) {
    return { x: controls[side].x, y: controls[side].y };
  }

  return {
    x: controls[side].x - anchor.x,
    y: controls[side].y - anchor.y,
  };
}

function hasNonZeroHandle(anchor, side) {
  const offset = getHandleOffset(anchor, side);
  return Math.abs(offset.x) > EPSILON || Math.abs(offset.y) > EPSILON;
}

function updateAnchorCommand(anchor) {
  if (anchor.command === Commands.move || anchor.command === Commands.close) {
    return;
  }

  anchor.command =
    hasNonZeroHandle(anchor, 'left') || hasNonZeroHandle(anchor, 'right')
      ? Commands.curve
      : Commands.line;
}

function inheritRelative(anchor, reference) {
  if (typeof reference.relative === 'boolean') {
    anchor.relative = reference.relative;
  }
}

function isSegmentCurved(a, b) {
  return (
    hasNonZeroHandle(b, 'right') ||
    hasNonZeroHandle(a, 'left') ||
    hasNonZeroHandle(a, 'right') ||
    hasNonZeroHandle(b, 'left') ||
    a.command === Commands.curve ||
    b.command === Commands.curve
  );
}

function lerpPoint(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
  };
}

function getAbsoluteHandle(anchor, side) {
  const controls = anchor.controls && anchor.controls[side];
  if (!controls) {
    return { x: anchor.x, y: anchor.y };
  }
  if (isRelativeAnchor(anchor)) {
    return { x: anchor.x + controls.x, y: anchor.y + controls.y };
  }
  return { x: controls.x, y: controls.y };
}

function splitSubdivisionSegment(start, end, t) {
  const right = start.controls && start.controls.right;
  const left = end.controls && end.controls.left;

  const p0 = { x: start.x, y: start.y };
  const p1 = right ? getAbsoluteHandle(start, 'right') : { ...p0 };
  const p3 = { x: end.x, y: end.y };
  const p2 = left ? getAbsoluteHandle(end, 'left') : { ...p3 };

  const q0 = lerpPoint(p0, p1, t);
  const q1 = lerpPoint(p1, p2, t);
  const q2 = lerpPoint(p2, p3, t);

  const r0 = lerpPoint(q0, q1, t);
  const r1 = lerpPoint(q1, q2, t);

  const point = lerpPoint(r0, r1, t);

  const anchor = new Anchor(point.x, point.y);
  inheritRelative(anchor, start);
  setHandleComponent(anchor, 'left', r0.x - point.x, r0.y - point.y);
  setHandleComponent(anchor, 'right', r1.x - point.x, r1.y - point.y);
  anchor.command = Commands.curve;

  return {
    anchor,
    startOut: q0,
    endIn: q2,
  };
}

function applyGlobalSmooth(vertices, from, to, closed, loop, asymmetric) {
  const length = vertices.length;
  const amount = to - from + 1;
  let n = amount - 1;
  let padding = loop ? Math.min(amount, 4) : 1;
  let paddingLeft = padding;
  let paddingRight = padding;

  if (!closed) {
    paddingLeft = Math.min(1, from);
    paddingRight = Math.min(1, length - to - 1);
  }

  n += paddingLeft + paddingRight;
  if (n <= 1) {
    return;
  }

  const knots = new Array(n + 1);
  for (let i = 0, j = from - paddingLeft; i <= n; i += 1, j += 1) {
    const index = mod(j, length);
    knots[i] = vertices[index];
  }

  let x = knots[0].x + 2 * knots[1].x;
  let y = knots[0].y + 2 * knots[1].y;
  let f = 2;
  const n1 = n - 1;
  const rx = [x];
  const ry = [y];
  const rf = [f];
  const px = new Array(n + 1);
  const py = new Array(n + 1);

  for (let i = 1; i < n; i += 1) {
    const internal = i < n1;
    const a = internal ? 1 : asymmetric ? 1 : 2;
    const b = internal ? 4 : asymmetric ? 2 : 7;
    const u = internal ? 4 : asymmetric ? 3 : 8;
    const v = internal ? 2 : asymmetric ? 0 : 1;
    const m = a / f;
    f = rf[i] = b - m;
    x = rx[i] = u * knots[i].x + v * knots[i + 1].x - m * x;
    y = ry[i] = u * knots[i].y + v * knots[i + 1].y - m * y;
  }

  px[n1] = rx[n1] / rf[n1];
  py[n1] = ry[n1] / rf[n1];

  for (let i = n - 2; i >= 0; i -= 1) {
    px[i] = (rx[i] - px[i + 1]) / rf[i];
    py[i] = (ry[i] - py[i + 1]) / rf[i];
  }

  px[n] = (3 * knots[n].x - px[n1]) / 2;
  py[n] = (3 * knots[n].y - py[n1]) / 2;

  const max = n - paddingRight;

  for (let i = paddingLeft, j = from; i <= max; i += 1, j += 1) {
    const index = mod(j, length);
    const anchor = vertices[index];
    const hx = px[i] - anchor.x;
    const hy = py[i] - anchor.y;

    if (loop || i < max) {
      setHandleComponent(anchor, 'right', hx, hy);
    } else {
      clearHandleComponent(anchor, 'right');
    }

    if (loop || i > paddingLeft) {
      setHandleComponent(anchor, 'left', -hx, -hy);
    } else {
      clearHandleComponent(anchor, 'left');
    }

    updateAnchorCommand(anchor);
  }
}

function applyCatmullRom(anchor, prev, next, factor, clampIn, clampOut) {
  const p0 = prev || anchor;
  const p1 = anchor;
  const p2 = next || anchor;
  const d1 = Vector.distanceBetween(p0, p1);
  const d2 = Vector.distanceBetween(p1, p2);
  const a = factor === undefined ? 0.5 : factor;
  const d1a = Math.pow(d1, a);
  const d2a = Math.pow(d2, a);
  const d1_2a = d1a * d1a;
  const d2_2a = d2a * d2a;

  if (!clampIn && prev) {
    const A = 2 * d2_2a + 3 * d2a * d1a + d1_2a;
    const N = 3 * d2a * (d2a + d1a);
    if (N !== 0) {
      const hx = (d2_2a * p0.x + A * p1.x - d1_2a * p2.x) / N - p1.x;
      const hy = (d2_2a * p0.y + A * p1.y - d1_2a * p2.y) / N - p1.y;
      setHandleComponent(anchor, 'left', hx, hy);
    } else {
      clearHandleComponent(anchor, 'left');
    }
  } else {
    clearHandleComponent(anchor, 'left');
  }

  if (!clampOut && next) {
    const A = 2 * d1_2a + 3 * d1a * d2a + d2_2a;
    const N = 3 * d1a * (d1a + d2a);
    if (N !== 0) {
      const hx = (d1_2a * p2.x + A * p1.x - d2_2a * p0.x) / N - p1.x;
      const hy = (d1_2a * p2.y + A * p1.y - d2_2a * p0.y) / N - p1.y;
      setHandleComponent(anchor, 'right', hx, hy);
    } else {
      clearHandleComponent(anchor, 'right');
    }
  } else {
    clearHandleComponent(anchor, 'right');
  }

  updateAnchorCommand(anchor);
}

function applyGeometric(anchor, prev, next, factor, clampIn, clampOut) {
  if (!(prev && next)) {
    if (!prev) {
      clearHandleComponent(anchor, 'left');
    }
    if (!next) {
      clearHandleComponent(anchor, 'right');
    }
    updateAnchorCommand(anchor);
    return;
  }

  const p0 = prev;
  const p1 = anchor;
  const p2 = next;
  const d1 = Vector.distanceBetween(p0, p1);
  const d2 = Vector.distanceBetween(p1, p2);
  const total = d1 + d2;
  const tension = factor === undefined ? 0.4 : factor;
  const vector = { x: p0.x - p2.x, y: p0.y - p2.y };

  if (!clampIn && total !== 0) {
    const k = (tension * d1) / total;
    setHandleComponent(anchor, 'left', vector.x * k, vector.y * k);
  } else {
    clearHandleComponent(anchor, 'left');
  }

  if (!clampOut && total !== 0) {
    const k = (tension * d1) / total - tension;
    setHandleComponent(anchor, 'right', vector.x * k, vector.y * k);
  } else {
    clearHandleComponent(anchor, 'right');
  }

  updateAnchorCommand(anchor);
}

function applyLocalSmooth(vertices, from, to, closed, loop, options) {
  const type = options.type || 'catmull-rom';
  const factor = options.factor;
  const length = vertices.length;

  for (let i = from; i <= to; i += 1) {
    const index = mod(i, length);
    const anchor = vertices[index];

    if (anchor.command === Commands.move) {
      clearHandleComponent(anchor, 'left');
      clearHandleComponent(anchor, 'right');
      continue;
    }

    const prevIndex = i === from && !loop ? null : i - 1;
    const nextIndex = i === to && !loop ? null : i + 1;

    const prev = prevIndex === null ? null : vertices[mod(prevIndex, length)];
    const next = nextIndex === null ? null : vertices[mod(nextIndex, length)];

    const clampIn = prevIndex === null;
    const clampOut = nextIndex === null;

    if (type === 'geometric') {
      applyGeometric(anchor, prev, next, factor, clampIn, clampOut);
    } else {
      applyCatmullRom(anchor, prev, next, factor, clampIn, clampOut);
    }
  }
}

export {
  isRelativeAnchor,
  setHandleComponent,
  clearHandleComponent,
  hasNonZeroHandle,
  updateAnchorCommand,
  inheritRelative,
  isSegmentCurved,
  splitSubdivisionSegment,
  applyGlobalSmooth,
  applyLocalSmooth,
};
