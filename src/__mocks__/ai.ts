export const generateVibeText = vi.fn().mockImplementation(async (input: string) => {
  // Return a mock response based on the input
  if (!input.trim()) {
    throw new Error('Input text cannot be empty');
  }
  return `This is a mock vibe transformation of: "${input}"`;
});