#!/usr/bin/env node

import { processJsonFile } from '../src/index.js';

async function main() {
  // Get the input file from command line arguments
  const inputFile = process.argv[2];

  if (!inputFile) {
    console.error('Please provide a JSON file path.');
    process.exit(1);
  }

  await processJsonFile(inputFile);
}

main().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
