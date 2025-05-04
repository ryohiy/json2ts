import { convertJsonToTs } from './converter.js';
import { describe, test, expect } from 'vitest';

describe('Basic JSON conversion', () => {
  test('converts simple JSON object', () => {
    const input = '{"name": "John", "age": 30}';
    const filename = 'test.json';
    const expected = 'const TEST = {\n    "name": "John",\n    "age": 30\n} as const;';
    expect(convertJsonToTs(input, filename)).toBe(expected);
  });
});
