/**
 * Calculate the sum of two numbers
 * @param a The first number
 * @param b The second number
 * @returns The sum of the two numbers
 */
export function sum(a: number, b: number): number {
  return a + b;
}

/**
 * Format the response of the sum tool
 * @param a The first number
 * @param b The second number
 * @returns The formatted response object
 */
export function formatSumResponse(a: number, b: number) {
  const result = sum(a, b);
  return {
    content: [
      {
        type: "text" as const,
        text: `a + b = ${result}`,
      },
    ],
  };
} 