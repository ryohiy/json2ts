/**
 * Convert JSON content to TypeScript type definition
 * @param {string} jsonContent - The JSON content to convert
 * @returns {string} The TypeScript type definition
 */
export function convertJsonToTs(jsonContent) {
  try {
    // Parse JSON to ensure it's valid
    const jsonObject = JSON.parse(jsonContent);
    
    // Convert JSON to TypeScript
    const tsContent = `const TEST = ${JSON.stringify(jsonObject, null, 4)} as const;`;
    
    return tsContent;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
}
