#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { formatSumResponse } from "./tools.js";

// Create an instance of the MCP server
const server = new McpServer({
  name: "mcp-typescript-starter",
  version: "1.0.0",
});

// Register the sum tool
server.tool(
  "sum",
  "Calculate the sum of a + b",
  {
    a: z.number().describe("The first number"),
    b: z.number().describe("The second number"),
  },
  async ({ a, b }) => {
    return formatSumResponse(a, b);
  },
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Typescript Starter Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});