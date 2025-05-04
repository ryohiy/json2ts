/**
 * Convert JSON content to TypeScript type definition
 * @param {string} jsonContent - The JSON content to convert
 * @param {string} filename - The original JSON file name
 * @returns {string} The TypeScript type definition
 */
export function convertJsonToTs(jsonContent, filename) {
  try {
    // Get the variable name from filename (without .json extension)
    const varName = filename.replace('.json', '').toUpperCase();
    
    // Parse JSON to ensure it's valid
    const jsonObject = JSON.parse(jsonContent);
    
    // Convert JSON to TypeScript
    const tsContent = `const ${varName} = ${JSON.stringify(jsonObject, null, 4)} as const;`;
    
    return tsContent;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
}
