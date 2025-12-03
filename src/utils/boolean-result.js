/**
 * Boolean Result Utility
 *
 * Implements boolean operations (union, subtract, intersect, exclude) on paths
 * by classifying path segments and constructing result geometries.
 *
 * Uses existing hit-test utilities for point-in-path testing.
 */

import { Anchor } from '../anchor.js';
import { Commands } from './path-commands.js';
import { Path } from '../path.js';
import { buildPathHitParts, pointInPolygons } from './hit-test.js';
import { subdivideCurve } from './boolean-operations.js';

// Constants for numerical stability
const EPSILON = 1e-12;
const T_EPSILON = 1e-6;

/**
 * Test if a point is inside a path using ray casting
 *
 * @param {Two.Path} path - Path to test against
 * @param {Number} x - Point x coordinate (in path's local space)
 * @param {Number} y - Point y coordinate (in path's local space)
 * @param {Number} [precision=8] - Curve subdivision precision
 * @returns {Boolean} - True if point is inside path
 */
function pointInPath(path, x, y, precision = 8) {
  if (!path || !path.vertices || path.vertices.length < 3) {
    return false;
  }

  // Use existing hit-test utilities to convert path to polygons
  const { polygons } = buildPathHitParts(path, precision);

  if (!polygons || polygons.length === 0) {
    return false;
  }

  // Use existing ray casting algorithm
  return pointInPolygons(polygons, x, y);
}

/**
 * Test if a point is inside any path except the specified one
 *
 * @param {Two.Path[]} paths - Array of paths to test against
 * @param {Number} x - Point x coordinate (world space)
 * @param {Number} y - Point y coordinate (world space)
 * @param {Number} excludeIndex - Index of path to exclude from testing
 * @param {Number} [precision=8] - Curve subdivision precision
 * @returns {Boolean} - True if point is inside any other path
 */
function pointInAnyPath(paths, x, y, excludeIndex, precision = 8) {
  for (let i = 0; i < paths.length; i++) {
    if (i === excludeIndex) {
      continue;
    }

    const path = paths[i];

    // Transform point to path's local space
    if (path.worldMatrix) {
      const inverse = path.worldMatrix.inverse();
      const transformed = inverse.multiply(x, y, 1);
      const localX = transformed[0];
      const localY = transformed[1];

      if (pointInPath(path, localX, localY, precision)) {
        return true;
      }
    } else {
      // No transformation, use world coordinates directly
      if (pointInPath(path, x, y, precision)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Evaluate a cubic Bézier curve at parameter t
 *
 * @param {Object} p0 - Start point {x, y}
 * @param {Object} p1 - First control point {x, y}
 * @param {Object} p2 - Second control point {x, y}
 * @param {Object} p3 - End point {x, y}
 * @param {Number} t - Parameter [0, 1]
 * @returns {Object} - Point on curve {x, y}
 */
function evaluateCubicBezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const u2 = u * u;
  const u3 = u2 * u;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: u3 * p0.x + 3 * u2 * t * p1.x + 3 * u * t2 * p2.x + t3 * p3.x,
    y: u3 * p0.y + 3 * u2 * t * p1.y + 3 * u * t2 * p2.y + t3 * p3.y
  };
}

/**
 * Get the midpoint of a segment defined by two anchors
 *
 * @param {Anchor} a1 - Start anchor
 * @param {Anchor} a2 - End anchor
 * @returns {Object} - Midpoint {x, y}
 */
function getSegmentMidpoint(a1, a2) {
  // Check if segment is curved
  const hasControls = (a1.controls && (a1.controls.right.x !== 0 || a1.controls.right.y !== 0)) ||
                      (a2.controls && (a2.controls.left.x !== 0 || a2.controls.left.y !== 0));

  if (!hasControls || a2.command !== Commands.curve) {
    // Straight line segment - simple midpoint
    return {
      x: (a1.x + a2.x) / 2,
      y: (a1.y + a2.y) / 2
    };
  }

  // Curved segment - evaluate Bézier at t=0.5
  // Convert Two.js anchors to Bézier control points
  const p0 = { x: a1.x, y: a1.y };
  const p3 = { x: a2.x, y: a2.y };

  let p1, p2;
  if (a1.relative) {
    p1 = { x: a1.x + a1.controls.right.x, y: a1.y + a1.controls.right.y };
  } else {
    p1 = { x: a1.controls.right.x, y: a1.controls.right.y };
  }

  if (a2.relative) {
    p2 = { x: a2.x + a2.controls.left.x, y: a2.y + a2.controls.left.y };
  } else {
    p2 = { x: a2.controls.left.x, y: a2.controls.left.y };
  }

  return evaluateCubicBezier(p0, p1, p2, p3, 0.5);
}

/**
 * Insert a new anchor at an intersection point on a path segment
 *
 * @param {Two.Path} path - Path to modify (will be cloned)
 * @param {Number} segmentIndex - Index of segment where intersection occurs
 * @param {Number} t - Parameter along segment [0, 1]
 * @param {Object} point - Intersection point {x, y}
 * @returns {Number} - Index of newly inserted anchor
 */
function insertAnchorAtIntersection(path, segmentIndex, t, point) {
  // Skip if t is at endpoints (within epsilon)
  if (t < T_EPSILON) {
    return segmentIndex;
  }
  if (t > 1 - T_EPSILON) {
    return segmentIndex + 1;
  }

  const vertices = path.vertices;

  // Bounds checking
  if (segmentIndex < 0 || segmentIndex >= vertices.length) {
    return segmentIndex;
  }

  const a1 = vertices[segmentIndex];

  // Handle wrapping for closed paths
  let nextIndex = segmentIndex + 1;
  if (nextIndex >= vertices.length) {
    if (path.closed) {
      nextIndex = 0;
    } else {
      return segmentIndex;
    }
  }

  const a2 = vertices[nextIndex];

  if (!a1 || !a2) {
    return segmentIndex;
  }

  // Check if segment is curved
  const isCurved = (a1.controls && (a1.controls.right.x !== 0 || a1.controls.right.y !== 0)) ||
                   (a2.controls && (a2.controls.left.x !== 0 || a2.controls.left.y !== 0));

  if (!isCurved || !a2.command || a2.command !== Commands.curve) {
    // Straight line - just insert a line anchor at the point
    const newAnchor = new Anchor(point.x, point.y, 0, 0, 0, 0, Commands.line);
    vertices.splice(segmentIndex + 1, 0, newAnchor);
    return segmentIndex + 1;
  }

  // Curved segment - split using De Casteljau
  // Convert anchors to control points
  const p0 = { x: a1.x, y: a1.y };
  const p3 = { x: a2.x, y: a2.y };

  let p1, p2;
  if (a1.relative) {
    p1 = { x: a1.x + a1.controls.right.x, y: a1.y + a1.controls.right.y };
  } else {
    p1 = { x: a1.controls.right.x, y: a1.controls.right.y };
  }

  if (a2.relative) {
    p2 = { x: a2.x + a2.controls.left.x, y: a2.y + a2.controls.left.y };
  } else {
    p2 = { x: a2.controls.left.x, y: a2.controls.left.y };
  }

  // Subdivide curve at t
  const subdivided = subdivideCurve(p0, p1, p2, p3, t);
  const left = subdivided.left;   // [p0, p1, p2, p3]
  const right = subdivided.right;  // [p0, p1, p2, p3]

  // Update first anchor's right control
  a1.controls.right.x = left[1].x - a1.x;
  a1.controls.right.y = left[1].y - a1.y;
  a1.relative = true;

  // Create new anchor at split point
  // Use the exact intersection point coordinates for consistency
  const newAnchor = new Anchor(
    point.x,  // Use exact intersection point
    point.y,
    left[2].x - point.x,  // Left control (relative)
    left[2].y - point.y,
    right[1].x - point.x,  // Right control (relative)
    right[1].y - point.y,
    Commands.curve
  );
  newAnchor.relative = true;

  // Update second anchor's left control
  a2.controls.left.x = right[2].x - a2.x;
  a2.controls.left.y = right[2].y - a2.y;
  a2.relative = true;

  // Insert new anchor
  vertices.splice(segmentIndex + 1, 0, newAnchor);
  return segmentIndex + 1;
}

/**
 * Split paths at all intersection points
 *
 * @param {Two.Path[]} paths - Array of paths
 * @param {Array} intersections - Array of intersection data
 * @returns {Object} - { paths: cloned paths with splits, intersections: updated }
 */
function splitPathsAtIntersections(paths, intersections) {
  // Clone paths to avoid modifying originals
  const clonedPaths = paths.map(p => {
    const clone = p.clone();
    // Copy transformation properties
    clone.translation.copy(p.translation);
    clone.rotation = p.rotation;
    clone.scale = typeof p.scale === 'number' ? p.scale : p.scale.clone();
    if (p.matrix && p.matrix.manual) {
      clone.matrix.copy(p.matrix);
    }
    return clone;
  });

  if (!intersections || intersections.length === 0) {
    return { paths: clonedPaths, intersections: [] };
  }

  // Group intersections by path
  // eslint-disable-next-line no-undef
  const intersectionsByPath = new Map();
  for (let i = 0; i < clonedPaths.length; i++) {
    intersectionsByPath.set(i, []);
  }

  intersections.forEach(inter => {
    if (inter.path1Index !== undefined && inter.path2Index !== undefined) {
      intersectionsByPath.get(inter.path1Index).push({
        ...inter,
        isPath1: true,
        segmentIndex: inter.index1,
        t: inter.t1
      });
      intersectionsByPath.get(inter.path2Index).push({
        ...inter,
        isPath1: false,
        segmentIndex: inter.index2,
        t: inter.t2
      });
    }
  });

  // Sort intersections by segment index and t parameter for each path
  intersectionsByPath.forEach((inters, pathIndex) => {
    inters.sort((a, b) => {
      if (a.segmentIndex !== b.segmentIndex) {
        return a.segmentIndex - b.segmentIndex;
      }
      return a.t - b.t;
    });
  });

  // Insert anchors in reverse order to preserve indices
  intersectionsByPath.forEach((inters, pathIndex) => {
    const path = clonedPaths[pathIndex];

    // Process in reverse order
    for (let i = inters.length - 1; i >= 0; i--) {
      const inter = inters[i];
      insertAnchorAtIntersection(path, inter.segmentIndex, inter.t, inter.point);
    }
  });

  return { paths: clonedPaths, intersections };
}

/**
 * Determine if a segment should be kept based on boolean operation rules
 *
 * @param {Boolean} isInsideOther - Is segment midpoint inside any other path
 * @param {Number} pathIndex - Index of the path this segment belongs to
 * @param {String} operation - 'union', 'subtract', 'intersect', 'exclude'
 * @returns {Boolean} - True if segment should be kept in result
 */
function shouldKeepSegment(isInsideOther, pathIndex, operation) {
  switch (operation) {
    case 'union':
      // Keep segments outside all other paths
      return !isInsideOther;

    case 'subtract':
      // Keep path A segments outside B, discard all path B segments
      if (pathIndex === 0) {
        return !isInsideOther;
      } else {
        return false;  // Discard all segments from paths being subtracted
      }

    case 'intersect':
      // Keep segments inside other paths
      return isInsideOther;

    case 'exclude':
      // XOR: Keep segments outside others (like union)
      return !isInsideOther;

    default:
      console.warn(`Two.BooleanGroup: Unknown operation '${operation}'`);
      return false;
  }
}

/**
 * Classify path segments as inside/outside and determine which to keep
 *
 * @param {Array} segments - Array of segment objects
 * @param {Two.Path[]} paths - Array of paths (with world matrices)
 * @param {String} operation - 'union', 'subtract', 'intersect', 'exclude'
 * @param {Number} [precision=8] - Curve subdivision precision
 * @returns {Array} - Segments with 'keep' property added
 */
function classifySegments(segments, paths, operation, precision = 8) {
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const pathIndex = segment.pathIndex;

    // Calculate midpoint of segment
    const midpoint = getSegmentMidpoint(segment.startAnchor, segment.endAnchor);

    // Transform midpoint to world space if path has transformation
    const path = paths[pathIndex];
    let worldX = midpoint.x;
    let worldY = midpoint.y;

    if (path.worldMatrix) {
      const transformed = path.worldMatrix.multiply(midpoint.x, midpoint.y, 1);
      worldX = transformed[0];
      worldY = transformed[1];
    }

    // Test if midpoint is inside any other path
    const isInsideOther = pointInAnyPath(paths, worldX, worldY, pathIndex, precision);

    // Determine if segment should be kept based on operation
    segment.keep = shouldKeepSegment(isInsideOther, pathIndex, operation);
    segment.midpoint = midpoint;
    segment.isInsideOther = isInsideOther;
  }

  return segments;
}

/**
 * Create a key string for an anchor position (for use in Maps)
 *
 * @param {Object} anchor - Anchor or point {x, y}
 * @returns {String} - Key string
 */
function anchorKey(anchor) {
  // Round to reasonable precision (3 decimal places) to avoid floating point issues
  // but not so aggressive that nearby points get the same key
  const x = Math.round(anchor.x * 1000) / 1000;
  const y = Math.round(anchor.y * 1000) / 1000;
  return `${x},${y}`;
}

/**
 * Check if two anchors are at the same position
 *
 * @param {Object} a1 - First anchor {x, y}
 * @param {Object} a2 - Second anchor {x, y}
 * @returns {Boolean} - True if positions match (within epsilon)
 */
function anchorsEqual(a1, a2) {
  // Use a more lenient tolerance for matching anchors (0.01 pixels)
  const tolerance = 0.01;
  return Math.abs(a1.x - a2.x) < tolerance && Math.abs(a1.y - a2.y) < tolerance;
}

/**
 * Build an adjacency map from segments
 *
 * @param {Array} segments - Array of segment objects
 * @returns {Map} - Map from anchor key to array of segments starting at that anchor
 */
function buildAdjacencyMap(segments) {
  // eslint-disable-next-line no-undef
  const adjacencyMap = new Map();

  for (const segment of segments) {
    if (!segment.keep) {
      continue;  // Skip segments that shouldn't be in result
    }

    const key = anchorKey(segment.startAnchor);
    if (!adjacencyMap.has(key)) {
      adjacencyMap.set(key, []);
    }
    adjacencyMap.get(key).push(segment);
  }

  return adjacencyMap;
}

/**
 * Find the next segment connected to a given anchor
 *
 * @param {Map} adjacencyMap - Map from anchor key to segments
 * @param {Object} anchor - Current anchor position {x, y}
 * @param {Set} usedSegments - Set of already-used segment objects
 * @returns {Object|null} - Next segment or null if none found
 */
function findNextSegment(adjacencyMap, anchor, usedSegments) {
  const key = anchorKey(anchor);
  const candidates = adjacencyMap.get(key);

  if (!candidates || candidates.length === 0) {
    return null;
  }

  // Find first unused segment
  for (const segment of candidates) {
    if (!usedSegments.has(segment)) {
      return segment;
    }
  }

  return null;
}

/**
 * Trace contours from classified segments
 *
 * @param {Array} segments - Array of segments with 'keep' property
 * @param {String} operation - Boolean operation type
 * @returns {Array} - Array of contours, where each contour is an array of segments
 */
function traceContours(segments, operation) {
  const contours = [];
  // eslint-disable-next-line no-undef
  const usedSegments = new Set();
  const adjacencyMap = buildAdjacencyMap(segments);

  // Find all starting segments (kept segments that haven't been used)
  for (const startSegment of segments) {
    if (!startSegment.keep || usedSegments.has(startSegment)) {
      continue;
    }

    const contour = [];
    let currentSegment = startSegment;
    const startAnchor = {x: currentSegment.startAnchor.x, y: currentSegment.startAnchor.y};
    let isClosedLoop = false;

    // Trace until we form a closed loop or can't continue
    while (currentSegment) {
      // Add current segment to contour
      contour.push(currentSegment);
      usedSegments.add(currentSegment);

      // Move to end anchor
      const currentEnd = currentSegment.endAnchor;

      // Check if we've closed the loop
      if (anchorsEqual(currentEnd, startAnchor)) {
        isClosedLoop = true;
        break;
      }

      // Find next segment starting at current end
      const nextSegment = findNextSegment(adjacencyMap, currentEnd, usedSegments);

      if (!nextSegment) {
        // Dead end - can't continue
        break;
      }

      currentSegment = nextSegment;
    }

    // Only add contours with at least one segment
    if (contour.length > 0) {
      contours.push({
        segments: contour,
        closed: isClosedLoop
      });
    }
  }

  return contours;
}

/**
 * Build a Two.Path from traced contours
 *
 * @param {Array} contours - Array of contour objects {segments, closed}
 * @returns {Two.Path|null} - Result path or null if no contours
 */
function buildResultPath(contours) {
  if (!contours || contours.length === 0) {
    return null;
  }

  const allVertices = [];

  for (let c = 0; c < contours.length; c++) {
    const contour = contours[c];
    const segments = contour.segments;

    if (segments.length === 0) {
      continue;
    }

    // For each contour, add all vertices
    // Start with the first segment's start anchor
    const firstSegment = segments[0];
    const firstAnchor = firstSegment.startAnchor.clone();

    // Set command to 'move' for first anchor of each contour (or first overall)
    if (allVertices.length === 0) {
      firstAnchor.command = Commands.move;
    } else {
      firstAnchor.command = Commands.move;
    }

    allVertices.push(firstAnchor);

    // Add all segment end anchors
    for (let s = 0; s < segments.length; s++) {
      const segment = segments[s];
      const endAnchor = segment.endAnchor.clone();

      // Set the command based on the segment
      endAnchor.command = segment.endAnchor.command || Commands.line;

      allVertices.push(endAnchor);
    }

    // If contour is closed, ensure last vertex connects back to first
    if (contour.closed && segments.length > 0) {
      // Mark the path as closed - Two.js will handle the closing
      // We don't need to add a duplicate vertex
    }
  }

  if (allVertices.length === 0) {
    return null;
  }

  // Create result path
  const resultPath = new Path(allVertices);
  resultPath.closed = true; // Boolean operations should produce closed paths
  resultPath.automatic = false;

  return resultPath;
}

/**
 * Construct boolean result path from paths and intersections
 *
 * @param {Two.Path[]} paths - Input paths
 * @param {String} operation - 'union', 'subtract', 'intersect', 'exclude'
 * @param {Array} allIntersections - Pre-computed intersection data
 * @returns {Two.Path|null} - Result path or null
 */
export function constructBooleanResult(paths, operation, allIntersections) {
  if (!paths || paths.length === 0) {
    return null;
  }

  // Handle case with no intersections
  if (!allIntersections || allIntersections.length === 0) {
    // No intersections - paths don't overlap
    if (operation === 'union' || operation === 'exclude') {
      // Return all paths combined
      const allVertices = [];
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        for (let j = 0; j < path.vertices.length; j++) {
          const v = path.vertices[j].clone();
          if (i > 0 && j === 0) {
            v.command = Commands.move;
          }
          allVertices.push(v);
        }
      }
      if (allVertices.length > 0) {
        const result = new Path(allVertices);
        result.closed = true;
        result.automatic = false;
        return result;
      }
    } else if (operation === 'subtract') {
      // Return first path only
      return paths[0].clone();
    } else if (operation === 'intersect') {
      // No intersection means no overlap
      return null;
    }
  }

  // Split paths at intersections
  const {paths: splitPaths} = splitPathsAtIntersections(paths, allIntersections);

  // Create segments from split paths
  const segments = [];
  for (let pathIndex = 0; pathIndex < splitPaths.length; pathIndex++) {
    const path = splitPaths[pathIndex];
    const vertices = path.vertices;

    for (let i = 0; i < vertices.length - 1; i++) {
      segments.push({
        startIndex: i,
        endIndex: i + 1,
        startAnchor: vertices[i],
        endAnchor: vertices[i + 1],
        pathIndex: pathIndex,
        keep: false  // Will be determined by classifySegments
      });
    }

    // Handle closed paths - connect last to first
    if (path.closed && vertices.length > 2) {
      segments.push({
        startIndex: vertices.length - 1,
        endIndex: 0,
        startAnchor: vertices[vertices.length - 1],
        endAnchor: vertices[0],
        pathIndex: pathIndex,
        keep: false
      });
    }
  }

  // Classify segments
  classifySegments(segments, paths, operation);

  // Trace contours
  const contours = traceContours(segments, operation);

  // Build result path
  const resultPath = buildResultPath(contours);

  return resultPath;
}
