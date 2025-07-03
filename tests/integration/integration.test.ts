import { describe, it, expect } from 'vitest';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { formatSumResponse } from '../../src/tools.js';

describe('MCP Server Integration Tests', () => {
  it('should be able to create an MCP server instance', () => {
    const server = new McpServer({
      name: "mcp-typescript-starter",
      version: "1.0.0",
    });
    
    expect(server).toBeDefined();
    expect(server).toBeInstanceOf(McpServer);
  });

  it('should be able to register a tool without throwing an error', () => {
    const server = new McpServer({
      name: "mcp-typescript-starter",
      version: "1.0.0",
    });

    expect(() => {
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
    }).not.toThrow();
  });

  it('should be able to directly test the tool handler function', async () => {
    const toolHandler = async ({ a, b }: { a: number; b: number }) => {
      return formatSumResponse(a, b);
    };

    const result = await toolHandler({ a: 5, b: 3 });
    
    expect(result).toBeDefined();
    expect(result.content).toHaveLength(1);
    expect(result.content[0]?.type).toBe("text");
    expect(result.content[0]?.text).toBe("a + b = 8");
  });

  it('should correctly validate the zod schema', () => {
    const schema = z.object({
      a: z.number().describe("The first number"),
      b: z.number().describe("The second number"),
    });

    // Valid inputs
    expect(() => schema.parse({ a: 5, b: 3 })).not.toThrow();
    expect(() => schema.parse({ a: -5, b: 10 })).not.toThrow();
    expect(() => schema.parse({ a: 1.5, b: 2.5 })).not.toThrow();

    // Invalid inputs
    expect(() => schema.parse({ a: "not a number", b: 5 })).toThrow();
    expect(() => schema.parse({ a: 5 })).toThrow();
    expect(() => schema.parse({ a: 5, b: 3, c: "extra" })).not.toThrow(); // zod allows extra properties by default
  });
}); 