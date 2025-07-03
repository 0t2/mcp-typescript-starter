
# mcp-typescript-starter



## How to use this template

To fully utilize this template for your own project:

1. Use `git clone` to copy this repo locally.
2. Rename the project folder and update the `name` field in `package.json` to your new project name.
3. Run `pnpm install` to install all dependencies.
4. Start developing your MCP server by modifying the source code in the `src/` directory.
5. Use the built-in scripts (e.g., `pnpm dev`, `pnpm test`) for development and testing.
6. (Optional) Remove the existing git history by deleting the `.git` folder and re-initialize with `git init` for a fresh start.

This approach ensures your new project is independent and clean, without any fork or commit history from the template.

A simple MCP (Model Context Protocol) server demo built with Node.js and TypeScript. This project demonstrates how to create an MCP server using the official SDK, featuring a `sum` tool for adding two numbers.

## Features

- TypeScript for type safety
- Standard MCP server implementation via the official SDK
- Built-in `sum` tool to calculate a + b
- CLI executable (`mcp-typescript-starter`)
- Comprehensive test suite with Vitest
- Test coverage reporting
- GitHub Actions CI/CD

## Scripts

| Script              | Description                                 |
|---------------------|---------------------------------------------|
| `pnpm dev`          | Compile TypeScript in watch mode            |
| `pnpm build`        | Compile TypeScript and generate executable  |
| `pnpm format`       | Format all files using Prettier             |
| `pnpm format:check` | Check code formatting with Prettier         |
| `pnpm format:src`   | Format only source files in `src` directory |
| `pnpm test`         | Run tests in watch mode                     |
| `pnpm test:run`     | Run tests once                              |
| `pnpm test:watch`   | Run tests in watch mode                     |
| `pnpm test:coverage`| Run tests with coverage report              |

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. The test suite includes:

- **Unit tests** for individual functions (`src/tools.test.ts`)
- **Integration tests** for MCP server functionality (`tests/integration.test.ts`)
- **Coverage reporting** with threshold enforcement

### Running Tests

```bash
# Run tests once
pnpm test:run

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Test Coverage

The project maintains high test coverage with the following thresholds:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

Coverage reports are generated in HTML format in the `coverage/` directory.

## Usage

1. Build the project:

   ```bash
   pnpm build
   ```

2. **Integrate with Claude for Desktop**

   To use this MCP server with Claude for Desktop, add your server to the Claude configuration file:

   - Open (or create) `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS/Linux.
   - Add the following configuration (replace `/ABSOLUTE/PATH/TO/PROJECT` with your project path):

   ```json
   {
     "mcpServers": {
       "mcp-typescript-starter": {
         "command": "node",
         "args": [
           "/ABSOLUTE/PATH/TO/PROJECT/dist/index.js"
         ]
       }
     }
   }
   ```

   - Save the file and restart Claude for Desktop.
   - The MCP server and its tools (e.g., `sum`) will now be available in Claude for Desktop's tool menu.

3. **Tool details**

   - Tool name: `sum`
   - Parameters:
     - `a`: The first number
     - `b`: The second number
   - Returns: `a + b = result`

### Global Linking (npm link)

Run the following command in the project root to create a symbolic link, which makes the command specified in the `bin` field of `package.json` available globally:

```bash
npm link
```

After running this, you can use `mcp-typescript-starter` (or the name specified in the `bin` field) directly in your terminal to start the MCP server.

## Project Structure

```
.
├── src/                   # Source code
│   ├── index.ts          # MCP server entry point
│   └── tools.ts          # Tool implementations
├── tests/                # Test files (separated from source)
│   ├── unit/             # Unit tests
│   │   ├── tools.test.ts # Unit tests for tools.ts
│   └── integration/      # Integration tests
│       └── integration.test.ts # MCP server integration tests
├── .github/              # GitHub Actions workflows
│   └── workflows/
│       └── test.yml      # CI/CD pipeline
├── dist/                 # Compiled output (gitignored)
├── coverage/             # Test coverage reports (gitignored)
├── package.json          # Project config and dependencies
├── tsconfig.json         # TypeScript config
├── vitest.config.ts      # Vitest configuration
├── TESTING.md            # Detailed testing documentation
├── .prettierrc           # Prettier config
└── .gitignore            # Git ignore list
```

## Development Environment

- Node.js 22.17.0 (recommended: use [Volta](https://volta.sh/))
- TypeScript 5.8.x
- MCP SDK 1.13.x
- Prettier 3.6.x
- Vitest 2.1.x

## Continuous Integration

This project uses GitHub Actions for CI/CD:

- Runs tests on Node.js 18.x, 20.x, and 22.x
- Generates coverage reports
- Runs on push to `main` and `develop` branches
- Runs on pull requests to `main`

## Formatting

This project uses Prettier for code formatting. To format all files, run:

```bash
pnpm format
```

## License

ISC License 