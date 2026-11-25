const fc = require('fast-check');

const number = fc.oneof(fc.constantFrom(0, -0.1, 0.1, -1, 1, -1000, 1000), fc.integer({ min: -10000, max: 10000 }).map((n) => n / 10));
const point = fc.tuple(number, number);
const command = (letter, count) => fc.tuple(fc.constantFrom(letter, letter.toLowerCase()), fc.array(number, { minLength: count, maxLength: count }));
const segment = fc.oneof(
  command('M', 2), command('L', 2), command('H', 1), command('V', 1),
  command('C', 6), command('S', 4), command('Q', 4), command('T', 2),
  fc.tuple(fc.constantFrom('A', 'a'), fc.tuple(fc.integer({ min: 0, max: 1000 }), fc.integer({ min: 0, max: 1000 }), number, fc.constantFrom(0, 1), fc.constantFrom(0, 1), number, number)),
  fc.constant(['Z', []])
);

const generators = {
  'svg-path': fc.record({ start: point, firstLine: point, segments: fc.array(segment, { maxLength: 20 }) }).map(({ start, firstLine, segments }) => ({ target: 'svg-path', start, segments: [['L', firstLine], ...segments] })),
  'svg-polyline': fc.array(point, { minLength: 2, maxLength: 30 }).map((points) => ({ target: 'svg-polyline', points })),
  geometry: fc.record({ points: fc.array(point, { minLength: 2, maxLength: 30 }), closed: fc.boolean(), t: fc.oneof(fc.constantFrom(0, 0.25, 0.5, 0.75, 1), fc.double({ min: 0, max: 1, noNaN: true })), shift: point, factor: fc.constantFrom(-2, -0.5, 0.5, 2) }).map((value) => ({ target: 'geometry', ...value })),
  transforms: fc.record({ point, shift: point, angle: fc.integer({ min: -31, max: 31 }).map((n) => n / 10), scale: fc.constantFrom(-2, -0.5, 0.5, 2), size: fc.integer({ min: 2, max: 100 }) }).map((value) => ({ target: 'transforms', ...value })),
};

// Exercise every command family before discovery; random sampling alone does not
// guarantee that a bounded CI run visits each one.
const commandSeeds = [
  ['M', [4, 5]], ['L', [20, 30]], ['H', [20]], ['V', [30]],
  ['C', [3, 4, 5, 6, 7, 8]], ['S', [3, 4, 5, 6]],
  ['Q', [3, 4, 5, 6]], ['T', [7, 8]], ['A', [10, 20, 45, 1, 0, 30, 40]], ['Z', []],
].flatMap(([letter, args]) => [letter, letter.toLowerCase()].map((type) => ({ target: 'svg-path', start: [0, 0], segments: [['L', [10, 10]], [type, args]] })));
commandSeeds.push(
  { target: 'svg-path', start: [0, 0], segments: [['M', [0, 0, 10, 10, 20, 0]], ['Z', []], ['m', [5, 5]], ['l', [10, 0, 0, 10]], ['z', []]] },
  { target: 'svg-path', start: [0, 0], segments: [['L', [0, 0]], ['A', [0, 0, 0, 0, 1, 0, 0]]] }
);

module.exports = { generators, commandSeeds };
