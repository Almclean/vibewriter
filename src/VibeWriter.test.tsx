import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VibeWriter from './VibeWriter';
import { generateVibeText } from './services/ai';

// Mock the AI service
vi.mock('./services/ai');

// Mock the CoffeeButton component to avoid DOM issues
vi.mock('./CoffeeButton', () => ({
  default: () => {
    return <div id="supportByBMC" data-testid="buymeacoffee">Buy me a coffee button</div>;
  }
}));

describe('VibeWriter Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the mocked implementation
    (generateVibeText as any).mockImplementation(async (input: string) => {
      if (!input.trim()) {
        throw new Error('Input text cannot be empty');
      }
      return `This is a mock vibe transformation of: "${input}"`;
    });
  });

  test('renders the component with initial state', () => {
    render(<VibeWriter />);
    
    // Check if the title is present
    expect(screen.getByText('VIBE')).toBeInTheDocument();
    expect(screen.getByText('WRITER')).toBeInTheDocument();
    
    // Check for input and output areas
    expect(screen.getByText('Your Thoughts')).toBeInTheDocument();
    expect(screen.getByText('Composed Text')).toBeInTheDocument();
    
    // Check for placeholder text
    expect(screen.getByPlaceholderText('Enter your stream of consciousness...')).toBeInTheDocument();
    expect(screen.getByText('Your composed text will appear here...')).toBeInTheDocument();
  });

  test('changes gradient when palette is clicked', async () => {
    render(<VibeWriter />);
    
    // Find and click the palette button
    const paletteButton = screen.getByRole('button', { name: '' });
    fireEvent.click(paletteButton);
    
    // Check if gradient options are displayed
    expect(screen.getByText('Classic Synthwave')).toBeInTheDocument();
    expect(screen.getByText('Ocean Dream')).toBeInTheDocument();
    expect(screen.getByText('Neon Sunset')).toBeInTheDocument();
    expect(screen.getByText('Cyber Green')).toBeInTheDocument();
    
    // Select a different gradient
    fireEvent.click(screen.getByText('Ocean Dream'));
    
    // Palette should close after selection
    await waitFor(() => {
      expect(screen.queryByText('Classic Synthwave')).not.toBeInTheDocument();
    });
  });

  test('generates text when user inputs text', async () => {
    render(<VibeWriter />);
    
    // Type in the input field
    const inputField = screen.getByPlaceholderText('Enter your stream of consciousness...');
    fireEvent.change(inputField, { target: { value: 'Hello world' } });
    
    // Wait for the debounced effect to trigger the generation
    await waitFor(() => {
      expect(generateVibeText).toHaveBeenCalledWith('Hello world');
    }, { timeout: 1500 });
    
    // Check that the output is displayed
    await waitFor(() => {
      expect(screen.getByText('This is a mock vibe transformation of: "Hello world"')).toBeInTheDocument();
    });
  });

  test('shows loading state during generation', async () => {
    // Delay the mock implementation to simulate loading
    (generateVibeText as any).mockImplementation(async (input : String) => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return `This is a mock vibe transformation of: "${input}"`;
    });
    
    render(<VibeWriter />);
    
    // Type in the input field
    const inputField = screen.getByPlaceholderText('Enter your stream of consciousness...');
    fireEvent.change(inputField, { target: { value: 'Test loading' } });
    
    // Check for loading spinner instead of exact text
    await waitFor(() => {
      const loadingElement = screen.getByText(/generating vibe/i);
      expect(loadingElement).toBeInTheDocument();
    }, { timeout: 1500 });
    
    // Check that it eventually shows the result
    await waitFor(() => {
      expect(screen.getByText('This is a mock vibe transformation of: "Test loading"')).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  test('shows error state when generation fails', async () => {
    // Make the mock throw an error
    (generateVibeText as any).mockRejectedValueOnce(new Error('API error'));
    
    render(<VibeWriter />);
    
    // Type in the input field
    const inputField = screen.getByPlaceholderText('Enter your stream of consciousness...');
    fireEvent.change(inputField, { target: { value: 'Trigger error' } });
    
    // Check for error message using a regex to find text that includes 'error'
    await waitFor(() => {
      const errorElement = screen.getByText(/api error/i);
      expect(errorElement).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  test('prevents paste in the input field', () => {
    render(<VibeWriter />);
    
    // Get the input field
    const inputField = screen.getByPlaceholderText('Enter your stream of consciousness...');
    
    // Create a paste event
    const pasteEvent = new Event('paste', { bubbles: true });
    
    // Add a preventDefault spy
    const preventDefaultSpy = vi.fn();
    Object.defineProperty(pasteEvent, 'preventDefault', { value: preventDefaultSpy });
    
    // Dispatch the paste event
    inputField.dispatchEvent(pasteEvent);
    
    // Check that preventDefault was called
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});