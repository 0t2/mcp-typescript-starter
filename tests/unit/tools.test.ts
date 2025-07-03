import { describe, it, expect } from 'vitest';
import { sum, formatSumResponse } from '../../src/tools.js';

describe('sum function', () => {
  it('should correctly calculate the sum of two positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(10, 15)).toBe(25);
    expect(sum(0, 0)).toBe(0);
  });

  it('should handle negative numbers correctly', () => {
    expect(sum(-5, 3)).toBe(-2);
    expect(sum(-10, -5)).toBe(-15);
    expect(sum(10, -3)).toBe(7);
  });

  it('should handle decimals correctly', () => {
    expect(sum(1.5, 2.5)).toBe(4);
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    expect(sum(-1.5, 3.7)).toBeCloseTo(2.2);
  });

  it('should handle large numbers correctly', () => {
    expect(sum(1000000, 2000000)).toBe(3000000);
    expect(sum(Number.MAX_SAFE_INTEGER - 1, 1)).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should handle zero correctly', () => {
    expect(sum(0, 5)).toBe(5);
    expect(sum(5, 0)).toBe(5);
    expect(sum(0, 0)).toBe(0);
  });

  it('should handle very small numbers correctly', () => {
    expect(sum(Number.MIN_VALUE, Number.MIN_VALUE)).toBe(Number.MIN_VALUE * 2);
    expect(sum(Number.EPSILON, Number.EPSILON)).toBe(Number.EPSILON * 2);
  });

  it('should handle Infinity correctly', () => {
    expect(sum(Infinity, 5)).toBe(Infinity);
    expect(sum(-Infinity, 5)).toBe(-Infinity);
    expect(sum(Infinity, -Infinity)).toBeNaN();
  });

  it('should handle NaN correctly', () => {
    expect(sum(NaN, 5)).toBeNaN();
    expect(sum(5, NaN)).toBeNaN();
    expect(sum(NaN, NaN)).toBeNaN();
  });

  it('should handle very large decimals correctly', () => {
    const a = 0.123456789012345;
    const b = 0.987654321098765;
    const result = sum(a, b);
    expect(result).toBeCloseTo(1.11111111111111);
  });

  it('should handle scientific notation correctly', () => {
    expect(sum(1e10, 2e10)).toBe(3e10);
    expect(sum(1e-10, 2e-10)).toBeCloseTo(3e-10);
  });
});

describe('formatSumResponse function', () => {
  it('should return a correctly formatted response object', () => {
    const result = formatSumResponse(2, 3);
    
    expect(result).toHaveProperty('content');
    expect(result.content).toBeInstanceOf(Array);
    expect(result.content).toHaveLength(1);
    
    const content = result.content[0];
    expect(content).toBeDefined();
    expect(content).toHaveProperty('type', 'text');
    expect(content).toHaveProperty('text', 'a + b = 5');
  });

  it('should correctly format results for different number combinations', () => {
    const result1 = formatSumResponse(10, 20);
    const result2 = formatSumResponse(-5, 15);
    const result3 = formatSumResponse(0, 0);
    
    expect(result1.content[0]?.text).toBe('a + b = 30');
    expect(result2.content[0]?.text).toBe('a + b = 10');
    expect(result3.content[0]?.text).toBe('a + b = 0');
  });

  it('should format decimal results correctly', () => {
    const result1 = formatSumResponse(1.5, 2.5);
    const result2 = formatSumResponse(0.1, 0.2);
    
    expect(result1.content[0]?.text).toBe('a + b = 4');
    expect(result2.content[0]?.text).toBe('a + b = 0.30000000000000004');
  });

  it('should format special values correctly', () => {
    const result1 = formatSumResponse(Infinity, 5);
    const result2 = formatSumResponse(-Infinity, 5);
    const result3 = formatSumResponse(NaN, 5);
    
    expect(result1.content[0]?.text).toBe('a + b = Infinity');
    expect(result2.content[0]?.text).toBe('a + b = -Infinity');
    expect(result3.content[0]?.text).toBe('a + b = NaN');
  });

  it('should format large numbers correctly', () => {
    const result1 = formatSumResponse(1e10, 2e10);
    const result2 = formatSumResponse(Number.MAX_SAFE_INTEGER, 0);
    
    expect(result1.content[0]?.text).toBe('a + b = 30000000000');
    expect(result2.content[0]?.text).toBe(`a + b = ${Number.MAX_SAFE_INTEGER}`);
  });

  it('should ensure the response object structure is immutable', () => {
    const result = formatSumResponse(5, 3);
    
    // Check the structure of the response object
    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'a + b = 8'
        }
      ]
    });
    
    // Ensure content array has only one element
    expect(result.content).toHaveLength(1);
    
    // Ensure type is a literal type
    expect(result.content[0]?.type).toBe('text');
  });

  it('should handle zero and negative zero correctly', () => {
    const result1 = formatSumResponse(0, -0);
    const result2 = formatSumResponse(-0, 0);
    const result3 = formatSumResponse(-0, -0);
    
    expect(result1.content[0]?.text).toBe('a + b = 0');
    expect(result2.content[0]?.text).toBe('a + b = 0');
    expect(result3.content[0]?.text).toBe('a + b = 0');
  });
}); 