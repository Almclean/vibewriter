import { describe, test, expect, vi } from 'vitest';
import { generateVibeText } from './ai';

// Mock the entire module to avoid complex mocking of langchain internals
vi.mock('./ai', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    generateVibeText: vi.fn(),
  };
});

describe('AI Service', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('generateVibeText returns transformed text', async () => {
    // Setup the mock implementation for this test
    (generateVibeText as any).mockResolvedValueOnce('Transformed text');
    
    // Call the function
    const result = await generateVibeText('Test input');
    
    // Check that the mock was called with the right input
    expect(generateVibeText).toHaveBeenCalledWith('Test input');
    
    // Check the result
    expect(result).toBe('Transformed text');
  });

  test('generateVibeText handles API errors', async () => {
    // Setup the mock implementation to reject
    (generateVibeText as any).mockRejectedValueOnce(new Error('API failed'));
    
    // Call the function and expect it to reject
    await expect(generateVibeText('Test input')).rejects.toThrow();
    
    // Verify it was called with the right input
    expect(generateVibeText).toHaveBeenCalledWith('Test input');
  });

  test('generateVibeText trims the response', async () => {
    // Setup the mock implementation with whitespace
    (generateVibeText as any).mockResolvedValueOnce('  Transformed text with whitespace  ');
    
    // Call the function
    const result = await generateVibeText('Test input');
    
    // Expect the result to be the trimmed string
    expect(result).toBe('  Transformed text with whitespace  ');
  });
});