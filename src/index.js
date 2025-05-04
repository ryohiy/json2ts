import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { basename } from 'path';
import { createInterface } from 'readline';
import { convertJsonToTs } from './converter/converter.js';

/**
 * Ask user for confirmation before overwriting existing file
 * @param {string} filename - Name of the file to overwrite
 * @returns {Promise<boolean>} - True if user confirms, false otherwise
 */
async function askForOverwrite(filename) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`${filename} already exists. Do you want to overwrite it?: yes / no\n`, (answer) => {
      rl.close();
      const normalizedAnswer = answer.toLowerCase().trim();
      resolve(normalizedAnswer === 'yes' || normalizedAnswer === 'y');
    });
  });
}

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
      const shouldOverwrite = await askForOverwrite(outputFile);
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
