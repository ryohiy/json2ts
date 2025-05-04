import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { convertJsonToTs } from './converter.js';

/**
 * Process the JSON file and convert it to TypeScript
 * @param {string} inputFile - Path to the JSON file
 */
export async function processJsonFile(inputFile) {
  try {
    // Check if file exists
    if (!existsSync(inputFile)) {
      console.error(`${inputFile} is not found`);
      process.exit(1);
    }

    // Read JSON file
    const jsonContent = await readFile(inputFile, 'utf-8');

    // Convert to TypeScript
    const tsContent = convertJsonToTs(jsonContent);

    // Generate output file path (same directory, .ts extension)
    const outputFile = inputFile.replace(/\.json$/, '.ts');

    // Write TypeScript file
    await writeFile(outputFile, tsContent);

    console.log(`Successfully created ${outputFile}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
