import { createInterface } from 'readline';

/**
 * Ask user for confirmation before overwriting existing file
 * @param {string} filename - Name of the file to overwrite
 * @returns {Promise<boolean>} - True if user confirms, false otherwise
 */
export async function askOverwrite(filename) {
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
