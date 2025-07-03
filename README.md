# nodejs-typescript-mcp

A simple MCP (Model Context Protocol) server demo built with Node.js and TypeScript. This project demonstrates how to create an MCP server using the official SDK, featuring a `sum` tool for adding two numbers.

## Features

- TypeScript for type safety
- Standard MCP server implementation via the official SDK
- Built-in `sum` tool to calculate a + b
- CLI executable (`node-ts-mcp-demo`)

## Scripts

| Script              | Description                                 |
|---------------------|---------------------------------------------|
| `pnpm dev`          | Compile TypeScript in watch mode            |
| `pnpm build`        | Compile TypeScript and generate executable  |
| `pnpm format`       | Format all files using Prettier             |
| `pnpm format:check` | Check code formatting with Prettier         |
| `pnpm format:src`   | Format only source files in `src` directory |

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
       "node-ts-mcp-demo": {
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

## Project Structure

```
.
├── src/           # Source code
│   └── index.ts   # MCP server entry point
├── dist/          # Compiled output (gitignored)
├── package.json   # Project config and dependencies
├── tsconfig.json  # TypeScript config
├── .prettierrc    # Prettier config
├── .gitignore     # Git ignore list
```

## Development Environment

- Node.js 22.17.0 (recommended: use [Volta](https://volta.sh/))
- TypeScript 5.8.x
- MCP SDK 1.13.x
- Prettier 3.6.x

## Formatting

This project uses Prettier for code formatting. To format all files, run:

```bash
pnpm format
```

## License

ISC License 