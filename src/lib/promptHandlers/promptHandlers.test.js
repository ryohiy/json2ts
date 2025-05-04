import { describe, test, expect, vi } from 'vitest';
import { createInterface } from 'readline';
import { askOverwrite } from './promptHandlers.js';

// Mock readline
vi.mock('readline', () => ({
  createInterface: vi.fn().mockReturnValue({
    question: vi.fn(),
    close: vi.fn()
  })
}));

describe('promptHandlers', () => {
  test('askOverwrite returns true for "yes" input', async () => {
    const mockRL = {
      question: vi.fn((_, callback) => callback('yes')),
      close: vi.fn()
    };
    createInterface.mockReturnValue(mockRL);

    const result = await askOverwrite('test.ts');
    expect(result).toBe(true);
    expect(mockRL.close).toHaveBeenCalled();
  });

  test('askOverwrite returns true for "y" input', async () => {
    const mockRL = {
      question: vi.fn((_, callback) => callback('y')),
      close: vi.fn()
    };
    createInterface.mockReturnValue(mockRL);

    const result = await askOverwrite('test.ts');
    expect(result).toBe(true);
    expect(mockRL.close).toHaveBeenCalled();
  });

  test('askOverwrite returns false for "no" input', async () => {
    const mockRL = {
      question: vi.fn((_, callback) => callback('no')),
      close: vi.fn()
    };
    createInterface.mockReturnValue(mockRL);

    const result = await askOverwrite('test.ts');
    expect(result).toBe(false);
    expect(mockRL.close).toHaveBeenCalled();
  });

  test('askOverwrite handles mixed case and spaces', async () => {
    const mockRL = {
      question: vi.fn((_, callback) => callback('  Yes  ')),
      close: vi.fn()
    };
    createInterface.mockReturnValue(mockRL);

    const result = await askOverwrite('test.ts');
    expect(result).toBe(true);
    expect(mockRL.close).toHaveBeenCalled();
  });
});
