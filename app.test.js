const { isValidColor, isValidShape, generateSVGForShape } = require('./utility');


// Color validation tests
test('validates color input', () => {
  expect(isValidColor('#FF5733')).toBe(true);
  expect(isValidColor('blue')).toBe(true);
  expect(isValidColor('#XYZ')).toBe(false);
  expect(isValidColor('invalidColorName')).toBe(false);
});

// Shape validation tests
test('validates shape input', () => {
  expect(isValidShape('circle')).toBe(true);
  expect(isValidShape('triangle')).toBe(true);
  expect(isValidShape('square')).toBe(true);
  expect(isValidShape('hexagon')).toBe(false);
});

// SVG generation tests
test('generates SVG for shapes', () => {
  expect(generateSVGForShape('circle', 'red')).toBe('<circle cx="150" cy="100" r="80" fill="red"/>');
  expect(generateSVGForShape('square', 'blue')).toBe('<rect x="75" y="25" width="150" height="150" fill="blue"/>');
  expect(generateSVGForShape('triangle', 'green')).toBe('<polygon points="150,25 75,175 225,175" fill="green"/>');
});