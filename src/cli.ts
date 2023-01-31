import { matrixStream } from './stream.js';

// First argument is the input file
if (process.argv.length !== 3) {
  console.error('input file path argument is required.');
  process.exit(1);
}

const inputFile: string = process.argv[2] || '';

matrixStream(inputFile);
