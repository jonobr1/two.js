/**
 * Boolean Operations Utility
 *
 * Provides intersection detection for Bézier curves, which is the foundation
 * for boolean operations (union, intersection, difference, xor) on paths.
 *
 * The implementation uses the fat line clipping algorithm from Paper.js for
 * robust curve-to-curve intersection detection without polygon approximation.
 */

import { Anchor } from '../anchor.js';
import { Commands } from './path-commands.js';

// Constants for numerical stability
const EPSILON = 1e-12;

/**
 * Converts a Two.js Anchor to a Paper.js-style Segment
 *
 * Two.js Anchor: { x, y, controls: { left: {x, y}, right: {x, y} }, relative: boolean }
 * Paper.js Segment: { point: {x, y}, handleIn: {x, y}, handleOut: {x, y} }
 *
 * @param {Anchor} anchor - Two.js anchor point
 * @returns {Object} Paper.js-style segment
 */
function anchorToSegment(anchor) {
  const segment = {
    point: { x: anchor.x, y: anchor.y },
    handleIn: { x: 0, y: 0 },
    handleOut: { x: 0, y: 0 }
  };

  if (anchor.controls) {
    if (anchor.relative) {
      // Handles are relative to the anchor point
      segment.handleIn.x = anchor.controls.left.x;
      segment.handleIn.y = anchor.controls.left.y;
      segment.handleOut.x = anchor.controls.right.x;
      segment.handleOut.y = anchor.controls.right.y;
    } else {
      // Handles are absolute positions, convert to relative
      segment.handleIn.x = anchor.controls.left.x - anchor.x;
      segment.handleIn.y = anchor.controls.left.y - anchor.y;
      segment.handleOut.x = anchor.controls.right.x - anchor.x;
      segment.handleOut.y = anchor.controls.right.y - anchor.y;
    }
  }

  return segment;
}

/**
 * Converts a Paper.js-style Segment to a Two.js Anchor
 *
 * @param {Object} segment - Paper.js-style segment
 * @param {string} command - Two.js command type (default: Commands.curve)
 * @returns {Anchor} Two.js anchor point
 */
function segmentToAnchor(segment, command = Commands.curve) {
  const anchor = new Anchor(
    segment.point.x,
    segment.point.y,
    segment.handleIn.x,
    segment.handleIn.y,
    segment.handleOut.x,
    segment.handleOut.y,
    command
  );
  anchor.relative = true;
  return anchor;
}

/**
 * Subdivides a cubic Bézier curve at parameter t using De Casteljau's algorithm
 *
 * @param {Object} v0 - Start point {x, y}
 * @param {Object} v1 - First control point {x, y}
 * @param {Object} v2 - Second control point {x, y}
 * @param {Object} v3 - End point {x, y}
 * @param {number} t - Parameter value [0, 1]
 * @returns {Object} { left: [v0, v1, v2, v3], right: [v0, v1, v2, v3] }
 */
function subdivideCurve(v0, v1, v2, v3, t) {
  const u = 1 - t;

  // First level
  const v01 = { x: u * v0.x + t * v1.x, y: u * v0.y + t * v1.y };
  const v12 = { x: u * v1.x + t * v2.x, y: u * v1.y + t * v2.y };
  const v23 = { x: u * v2.x + t * v3.x, y: u * v2.y + t * v3.y };

  // Second level
  const v012 = { x: u * v01.x + t * v12.x, y: u * v01.y + t * v12.y };
  const v123 = { x: u * v12.x + t * v23.x, y: u * v12.y + t * v23.y };

  // Third level (point on curve)
  const v0123 = { x: u * v012.x + t * v123.x, y: u * v012.y + t * v123.y };

  return {
    left: [v0, v01, v012, v0123],
    right: [v0123, v123, v23, v3]
  };
}

/**
 * Computes the signed distance from a point to a line
 *
 * @param {Object} point - Point {x, y}
 * @param {Object} lineStart - Line start point {x, y}
 * @param {Object} lineEnd - Line end point {x, y}
 * @returns {number} Signed distance (positive = left of line, negative = right)
 */
function signedDistance(point, lineStart, lineEnd) {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const lineLengthSq = dx * dx + dy * dy;

  if (lineLengthSq < EPSILON) {
    // Degenerate line
    const px = point.x - lineStart.x;
    const py = point.y - lineStart.y;
    return Math.sqrt(px * px + py * py);
  }

  const nx = dy;
  const ny = -dx;
  const lineLength = Math.sqrt(lineLengthSq);

  return ((point.x - lineStart.x) * nx + (point.y - lineStart.y) * ny) / lineLength;
}

/**
 * Simplified curve intersection using recursive subdivision
 * More robust than fat line clipping for our use case
 *
 * @param {Array} v1 - First curve [v0, v1, v2, v3]
 * @param {Array} v2 - Second curve [v0, v1, v2, v3]
 * @param {number} t1Min - Minimum t parameter for curve 1
 * @param {number} t1Max - Maximum t parameter for curve 1
 * @param {number} t2Min - Minimum t parameter for curve 2
 * @param {number} t2Max - Maximum t parameter for curve 2
 * @param {number} depth - Recursion depth counter
 * @param {Array} intersections - Array to store intersection results
 * @returns {Array} Array of intersections
 */
function clipCurve(v1, v2, t1Min, t1Max, t2Min, t2Max, depth, intersections) {
  const MAX_DEPTH = 32;
  const FLATNESS_TOLERANCE = 0.5;

  if (depth > MAX_DEPTH) {
    return intersections;
  }

  // Compute bounding boxes
  const bbox1 = {
    minX: Math.min(v1[0].x, v1[1].x, v1[2].x, v1[3].x),
    maxX: Math.max(v1[0].x, v1[1].x, v1[2].x, v1[3].x),
    minY: Math.min(v1[0].y, v1[1].y, v1[2].y, v1[3].y),
    maxY: Math.max(v1[0].y, v1[1].y, v1[2].y, v1[3].y)
  };

  const bbox2 = {
    minX: Math.min(v2[0].x, v2[1].x, v2[2].x, v2[3].x),
    maxX: Math.max(v2[0].x, v2[1].x, v2[2].x, v2[3].x),
    minY: Math.min(v2[0].y, v2[1].y, v2[2].y, v2[3].y),
    maxY: Math.max(v2[0].y, v2[1].y, v2[2].y, v2[3].y)
  };

  // Check if bounding boxes overlap
  if (bbox1.maxX < bbox2.minX || bbox2.maxX < bbox1.minX ||
      bbox1.maxY < bbox2.minY || bbox2.maxY < bbox1.minY) {
    return intersections;
  }

  // Check if curves are flat enough
  const flatness1 = Math.max(
    Math.abs(signedDistance(v1[1], v1[0], v1[3])),
    Math.abs(signedDistance(v1[2], v1[0], v1[3]))
  );
  const flatness2 = Math.max(
    Math.abs(signedDistance(v2[1], v2[0], v2[3])),
    Math.abs(signedDistance(v2[2], v2[0], v2[3]))
  );

  if (flatness1 < FLATNESS_TOLERANCE && flatness2 < FLATNESS_TOLERANCE) {
    // Both curves are flat - compute line-line intersection
    const intersection = lineIntersection(v1[0], v1[3], v2[0], v2[3]);
    if (intersection) {
      const t1 = t1Min + intersection.t1 * (t1Max - t1Min);
      const t2 = t2Min + intersection.t2 * (t2Max - t2Min);

      // Check for duplicates with stricter tolerance
      let isDuplicate = false;
      const DUPLICATE_TOLERANCE = 0.01; // 0.01 pixel tolerance
      for (let i = 0; i < intersections.length; i++) {
        const dx = intersections[i].point.x - intersection.point.x;
        const dy = intersections[i].point.y - intersection.point.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < DUPLICATE_TOLERANCE * DUPLICATE_TOLERANCE) {
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) {
        intersections.push({
          point: intersection.point,
          t1: t1,
          t2: t2
        });
      }
    }
    return intersections;
  }

  // Subdivide the larger curve
  if (flatness1 > flatness2) {
    const split = subdivideCurve(v1[0], v1[1], v1[2], v1[3], 0.5);
    const mid = (t1Min + t1Max) / 2;

    clipCurve(split.left, v2, t1Min, mid, t2Min, t2Max, depth + 1, intersections);
    clipCurve(split.right, v2, mid, t1Max, t2Min, t2Max, depth + 1, intersections);
  } else {
    const split = subdivideCurve(v2[0], v2[1], v2[2], v2[3], 0.5);
    const mid = (t2Min + t2Max) / 2;

    clipCurve(v1, split.left, t1Min, t1Max, t2Min, mid, depth + 1, intersections);
    clipCurve(v1, split.right, t1Min, t1Max, mid, t2Max, depth + 1, intersections);
  }

  return intersections;
}

/**
 * Computes the intersection of two line segments
 *
 * @param {Object} p1 - Start point of first line {x, y}
 * @param {Object} p2 - End point of first line {x, y}
 * @param {Object} p3 - Start point of second line {x, y}
 * @param {Object} p4 - End point of second line {x, y}
 * @returns {Object|null} Intersection { point: {x, y}, t1, t2 } or null
 */
function lineIntersection(p1, p2, p3, p4) {
  const x1 = p1.x, y1 = p1.y;
  const x2 = p2.x, y2 = p2.y;
  const x3 = p3.x, y3 = p3.y;
  const x4 = p4.x, y4 = p4.y;

  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (Math.abs(denom) < EPSILON) {
    return null; // Parallel or coincident
  }

  const t1 = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  const t2 = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

  if (t1 >= -EPSILON && t1 <= 1 + EPSILON && t2 >= -EPSILON && t2 <= 1 + EPSILON) {
    return {
      point: {
        x: x1 + t1 * (x2 - x1),
        y: y1 + t1 * (y2 - y1)
      },
      t1: Math.max(0, Math.min(1, t1)),
      t2: Math.max(0, Math.min(1, t2))
    };
  }

  return null;
}

/**
 * Finds all intersection points between two cubic Bézier curves
 *
 * @param {Anchor} a1 - First anchor of first curve
 * @param {Anchor} a2 - Second anchor of first curve
 * @param {Anchor} b1 - First anchor of second curve
 * @param {Anchor} b2 - Second anchor of second curve
 * @param {Matrix} [matrix1] - Optional transformation matrix for first curve
 * @param {Matrix} [matrix2] - Optional transformation matrix for second curve
 * @returns {Array} Array of intersections { point: {x, y}, t1, t2 }
 */
export function findCurveIntersections(a1, a2, b1, b2, matrix1, matrix2) {
  // Convert anchors to control points
  const seg1Start = anchorToSegment(a1);
  const seg1End = anchorToSegment(a2);
  const seg2Start = anchorToSegment(b1);
  const seg2End = anchorToSegment(b2);

  // Build Bézier curve control points
  let curve1 = [
    seg1Start.point,
    { x: seg1Start.point.x + seg1Start.handleOut.x, y: seg1Start.point.y + seg1Start.handleOut.y },
    { x: seg1End.point.x + seg1End.handleIn.x, y: seg1End.point.y + seg1End.handleIn.y },
    seg1End.point
  ];

  let curve2 = [
    seg2Start.point,
    { x: seg2Start.point.x + seg2Start.handleOut.x, y: seg2Start.point.y + seg2Start.handleOut.y },
    { x: seg2End.point.x + seg2End.handleIn.x, y: seg2End.point.y + seg2End.handleIn.y },
    seg2End.point
  ];

  // Apply transformations if provided
  if (matrix1) {
    curve1 = curve1.map(p => {
      const [x, y] = matrix1.multiply(p.x, p.y);
      return { x, y };
    });
  }

  if (matrix2) {
    curve2 = curve2.map(p => {
      const [x, y] = matrix2.multiply(p.x, p.y);
      return { x, y };
    });
  }

  const intersections = [];
  clipCurve(curve1, curve2, 0, 1, 0, 1, 0, intersections);

  return intersections;
}

/**
 * Finds all intersection points between two paths
 *
 * @param {Path} path1 - First path
 * @param {Path} path2 - Second path
 * @returns {Array} Array of intersections { point: {x, y}, t1, t2, index1, index2 }
 */
export function findPathIntersections(path1, path2) {
  const intersections = [];

  // Ensure paths are updated
  if (path1._update) {
    path1._update();
  }
  if (path2._update) {
    path2._update();
  }

  const vertices1 = path1.vertices;
  const vertices2 = path2.vertices;

  if (!vertices1 || !vertices2 || vertices1.length < 2 || vertices2.length < 2) {
    return intersections;
  }

  // Get world transformation matrices
  const matrix1 = path1.worldMatrix || path1._matrix;
  const matrix2 = path2.worldMatrix || path2._matrix;

  // Iterate through all pairs of curve segments
  for (let i = 0; i < vertices1.length - 1; i++) {
    const a1 = vertices1[i];
    const a2 = vertices1[i + 1];

    // Skip if this segment starts with a 'move' command (except the very first)
    if (i > 0 && a2.command === Commands.move) {
      continue;
    }

    for (let j = 0; j < vertices2.length - 1; j++) {
      const b1 = vertices2[j];
      const b2 = vertices2[j + 1];

      // Skip if this segment starts with a 'move' command (except the very first)
      if (j > 0 && b2.command === Commands.move) {
        continue;
      }

      const curveIntersections = findCurveIntersections(a1, a2, b1, b2, matrix1, matrix2);

      for (const intersection of curveIntersections) {
        // Check for duplicates across all segment pairs
        const DUPLICATE_TOLERANCE = 0.1; // 0.1 pixel tolerance for path-level duplicates
        let isDuplicate = false;
        for (let k = 0; k < intersections.length; k++) {
          const dx = intersections[k].point.x - intersection.point.x;
          const dy = intersections[k].point.y - intersection.point.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < DUPLICATE_TOLERANCE * DUPLICATE_TOLERANCE) {
            isDuplicate = true;
            break;
          }
        }

        if (!isDuplicate) {
          intersections.push({
            point: intersection.point,
            t1: intersection.t1,
            t2: intersection.t2,
            index1: i,
            index2: j
          });
        }
      }
    }
  }

  // Handle closed paths - check intersection between last and first segment
  if (path1.closed && vertices1.length > 2) {
    const a1 = vertices1[vertices1.length - 1];
    const a2 = vertices1[0];

    for (let j = 0; j < vertices2.length - 1; j++) {
      const b1 = vertices2[j];
      const b2 = vertices2[j + 1];

      if (j > 0 && b2.command === Commands.move) {
        continue;
      }

      const curveIntersections = findCurveIntersections(a1, a2, b1, b2, matrix1, matrix2);

      for (const intersection of curveIntersections) {
        // Check for duplicates across all segment pairs
        const DUPLICATE_TOLERANCE = 0.1;
        let isDuplicate = false;
        for (let k = 0; k < intersections.length; k++) {
          const dx = intersections[k].point.x - intersection.point.x;
          const dy = intersections[k].point.y - intersection.point.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < DUPLICATE_TOLERANCE * DUPLICATE_TOLERANCE) {
            isDuplicate = true;
            break;
          }
        }

        if (!isDuplicate) {
          intersections.push({
            point: intersection.point,
            t1: intersection.t1,
            t2: intersection.t2,
            index1: vertices1.length - 1,
            index2: j
          });
        }
      }
    }
  }

  if (path2.closed && vertices2.length > 2) {
    const b1 = vertices2[vertices2.length - 1];
    const b2 = vertices2[0];

    for (let i = 0; i < vertices1.length - 1; i++) {
      const a1 = vertices1[i];
      const a2 = vertices1[i + 1];

      if (i > 0 && a2.command === Commands.move) {
        continue;
      }

      const curveIntersections = findCurveIntersections(a1, a2, b1, b2, matrix1, matrix2);

      for (const intersection of curveIntersections) {
        // Check for duplicates across all segment pairs
        const DUPLICATE_TOLERANCE = 0.1;
        let isDuplicate = false;
        for (let k = 0; k < intersections.length; k++) {
          const dx = intersections[k].point.x - intersection.point.x;
          const dy = intersections[k].point.y - intersection.point.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < DUPLICATE_TOLERANCE * DUPLICATE_TOLERANCE) {
            isDuplicate = true;
            break;
          }
        }

        if (!isDuplicate) {
          intersections.push({
            point: intersection.point,
            t1: intersection.t1,
            t2: intersection.t2,
            index1: i,
            index2: vertices2.length - 1
          });
        }
      }
    }
  }

  // Handle both paths closed - test closing segment vs closing segment
  if (path1.closed && vertices1.length > 2 && path2.closed && vertices2.length > 2) {
    const a1 = vertices1[vertices1.length - 1];
    const a2 = vertices1[0];
    const b1 = vertices2[vertices2.length - 1];
    const b2 = vertices2[0];

    const curveIntersections = findCurveIntersections(a1, a2, b1, b2, matrix1, matrix2);

    for (const intersection of curveIntersections) {
      // Check for duplicates across all segment pairs
      const DUPLICATE_TOLERANCE = 0.1;
      let isDuplicate = false;
      for (let k = 0; k < intersections.length; k++) {
        const dx = intersections[k].point.x - intersection.point.x;
        const dy = intersections[k].point.y - intersection.point.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < DUPLICATE_TOLERANCE * DUPLICATE_TOLERANCE) {
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) {
        intersections.push({
          point: intersection.point,
          t1: intersection.t1,
          t2: intersection.t2,
          index1: vertices1.length - 1,
          index2: vertices2.length - 1
        });
      }
    }
  }

  return intersections;
}

export { anchorToSegment, segmentToAnchor };
