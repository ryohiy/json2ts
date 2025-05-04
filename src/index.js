import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { basename } from 'path';
import { convertJsonToTs } from './converter/converter.js';
import { askOverwrite } from './promptHandlers.js';

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

    // Get the base filename
    const filename = basename(inputFile);
    
    // Convert to TypeScript
    const tsContent = convertJsonToTs(jsonContent, filename);

    // Generate output file path (same directory, .ts extension)
    const outputFile = inputFile.replace(/\.json$/, '.ts');

    // Check if output file exists and ask for confirmation
    if (existsSync(outputFile)) {
      const shouldOverwrite = await askOverwrite(outputFile);
      if (!shouldOverwrite) {
        console.log('Operation cancelled');
        process.exit(0);
      }
    }

    // Write TypeScript file
    await writeFile(outputFile, tsContent);

    console.log(`Successfully created ${outputFile}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
