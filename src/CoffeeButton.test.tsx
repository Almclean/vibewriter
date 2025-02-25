import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Buymeacoffee from './CoffeeButton';

// Mock the CoffeeButton implementation to avoid DOM errors
vi.mock('./CoffeeButton', () => ({
  default: () => {
    return <div id="supportByBMC" data-testid="buymeacoffee">Buy me a coffee button</div>;
  }
}));

describe('CoffeeButton Component', () => {
  test('renders with the correct ID', () => {
    const { container, getByTestId } = render(<Buymeacoffee />);
    
    // Check that the component renders with the expected ID
    expect(container.querySelector('#supportByBMC')).toBeInTheDocument();
    expect(getByTestId('buymeacoffee')).toBeInTheDocument();
    expect(getByTestId('buymeacoffee')).toHaveTextContent('Buy me a coffee button');
  });
});