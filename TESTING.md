# Test Documentation

## 📋 Test Overview

This project uses **Vitest** as the test framework, providing comprehensive test coverage, including unit and integration tests.

### 🎯 Test Statistics
- **Test files**: 3
- **Test cases**: 47
- **Coverage**: 100%

## 🗂️ Test Structure

```
src/                    # Source code (pure business logic)
├── index.ts           # Main program (excluded from coverage)
└── tools.ts           # MCP utility functions

tests/                  # Test files (separated from source code)
├── unit/              # Unit tests
│   └── tools.test.ts  # Unit tests for tools.ts (17 tests)
└── integration/       # Integration tests
    └── integration.test.ts # MCP server integration tests (4 tests)
```

## 🧪 Test Types

### 1. Unit Tests

#### `tests/unit/tools.test.ts` - MCP Utility Function Tests
- **sum function** (10 tests)
  - Basic operations: positive, negative, zero
  - Edge cases: very small numbers, infinity, NaN
  - Precision tests: decimals, scientific notation
  
- **formatSumResponse function** (7 tests)
  - Formatting: different number combinations
  - Special value handling: Infinity, NaN
  - Structure validation: response object format

### 2. Integration Tests

#### `tests/integration/integration.test.ts` - MCP Server Integration Tests
- MCP server creation
- Tool registration
- Tool handler function tests
- Zod schema validation

## 🎯 Test Organization Principles

### 1. Separation Principle
- **Source code** (`src/`) contains only business logic
- **Test code** (`tests/`) is completely separated to avoid confusion
- **Grouped by type**: unit and integration tests are organized separately

### 2. Naming Convention
```
tests/
├── unit/              # Unit tests: test single functions or classes
│   ├── [module].test.ts
│   └── ...
├── integration/       # Integration tests: test component collaboration
│   ├── [feature].test.ts
│   └── ...
└── e2e/              # E2E tests (may be added in the future)
    └── ...
```

### 3. Import Paths
```typescript
// Unit tests: import from src/ in tests/unit/
import { functionName } from '../../src/module.js';

// Integration tests: import from src/ in tests/integration/
import { functionName } from '../../src/module.js';
```

## 🛠️ Testing Best Practices

### 1. Test Naming
```typescript
describe('function name', () => {
  it('should do something', () => {
    // test logic
  });
});
```

### 2. Test Classification
- **Normal cases**: expected input and output
- **Edge cases**: extreme values, nulls, special values
- **Error cases**: invalid input, exception handling

### 3. Assertion Strategy
```typescript
// Exact comparison
expect(result).toBe(expected);

// Floating-point comparison
expect(result).toBeCloseTo(expected, precision);

// Object property check
expect(result).toHaveProperty('property', value);

// Error handling
expect(() => functionCall()).toThrow(errorMessage);
```

### 4. Test Data Design
- **Equivalence partitioning**: divide input into valid and invalid categories
- **Boundary value analysis**: test boundary and near-boundary values
- **Error guessing**: guess possible errors based on experience

## 🚀 Running Tests

### Basic Commands
```bash
# Run all tests
pnpm test:run

# Watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Verbose report
pnpm test:run --reporter=verbose

# Run only unit tests
pnpm test:run tests/unit

# Run only integration tests
pnpm test:run tests/integration
```

### Coverage Thresholds
```typescript
// vitest.config.ts
coverage: {
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## 📊 Test Coverage

Currently achieving **100%** test coverage:
- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

### Coverage Reports
- **Text report**: terminal output
- **JSON report**: `coverage/coverage-final.json`
- **HTML report**: `coverage/index.html`

## 🔧 Test Configuration

### Vitest Config (`vitest.config.ts`)
```typescript
export default defineConfig({
  test: {
    globals: true,           // Global API
    environment: 'node',     // Node.js environment
    coverage: {
      provider: 'v8',        // Coverage engine
      reporter: ['text', 'json', 'html'],
      exclude: [
        'tests/',            // Exclude test files themselves
        'src/index.ts',      // Exclude entry file
        // ... other exclusions
      ],
    },
    include: [
      'tests/unit/**/*.test.ts',        // Unit tests
      'tests/integration/**/*.test.ts', // Integration tests
    ],
  },
});
```

## 🎯 Test Strategy

### 1. Test Pyramid
```
    /\
   /  \  E2E Tests (few)
  /____\
 /      \ Integration Tests (moderate)
/__________\
Unit Tests (many)
```

### 2. Test-Driven Development (TDD)
1. **Red**: Write a failing test
2. **Green**: Write the minimum code to pass the test
3. **Refactor**: Improve code quality

### 3. Continuous Integration
- GitHub Actions automatically run tests
- Supports multiple Node.js versions (18.x, 20.x, 22.x)
- Coverage report generation

## 📝 Test Checklist

### When adding new features
- [ ] Write unit tests for new functions (`tests/unit/`)
- [ ] Add integration tests if needed (`tests/integration/`)
- [ ] Cover normal, edge, and error cases
- [ ] Ensure coverage meets the threshold
- [ ] Run all tests to ensure no regressions

### When modifying existing features
- [ ] Update related tests
- [ ] Ensure tests still pass
- [ ] Check if coverage is affected

### Pre-release checklist
- [ ] Run the full test suite
- [ ] Check coverage report
- [ ] Ensure CI/CD passes

## 🔍 Debugging Tests

### Common Debugging Techniques
```typescript
// Use console.log for debugging
it('test name', () => {
  const result = functionCall();
  console.log('Result:', result);
  expect(result).toBe(expected);
});

// Use .only to run a single test
it.only('run only this test', () => {
  // test logic
});

// Skip a test
it.skip('skip this test', () => {
  // test logic
});
```

## 📚 References

- [Vitest Official Docs](https://vitest.dev/)
- [Jest Compatibility API](https://vitest.dev/guide/migration.html)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices) 