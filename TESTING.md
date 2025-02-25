# VibeWriter Testing Guide

This document outlines the testing approach and tools used for the VibeWriter application.

## Testing Stack

- **Vitest**: The testing framework of choice, compatible with Vite
- **Testing Library**: For rendering and querying React components
- **happy-dom**: Lightweight DOM implementation for the test environment
- **@vitest/coverage-v8**: For generating test coverage reports

## Test Files

The project includes the following test files:

1. `src/VibeWriter.test.tsx` - Tests for the main VibeWriter component
2. `src/services/ai.test.ts` - Tests for the AI service that handles text transformations
3. `src/CoffeeButton.test.tsx` - Tests for the donation button component

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Generate a coverage report
npm run test:coverage
```

## Mocking Strategy

- **AI Service**: The `generateVibeText` function is mocked to avoid real API calls during testing
- **CoffeeButton**: Component is mocked to prevent issues with external scripts and DOM manipulation

## Test Coverage

The tests cover:

1. **Core functionality**:
   - Text input and transformation
   - Loading states
   - Error handling
   - UI interaction (palette picker)

2. **Component rendering**:
   - Initial state rendering
   - Dynamic UI updates

## Extending Tests

When adding new features, please also add appropriate tests. Follow these guidelines:

1. Create test files with the naming pattern `*.test.tsx` or `*.test.ts`
2. Mock external dependencies
3. Test both happy and error paths
4. Aim for high coverage of critical application logic

## Known Issues

- Some unhandled errors may appear in the console during testing due to the external Buy Me a Coffee script. These are expected and don't affect test results.