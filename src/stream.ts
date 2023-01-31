import fs from 'node:fs';
import csv from 'csv-parser';
import rotate from './rotate.js';

// Array to store the output rows
type OutputRows = {
  id: string,
  json: string,
  is_valid: boolean
}[];

const outputRows: OutputRows = [];

export const matrixStream = (inputFile: string) => fs
  .createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    // Decode the JSON data
    let data = JSON.parse(row.json);

    // Verify that the data is valid
    let isValid = Number.isInteger(Math.sqrt(data.length));

    // Rotate the data if it is valid
    isValid ? data = rotate(data) : data = []; // Set the data to an empty array if it is invalid

    // Add the row to the output array
    outputRows.push({
      id: row.id,
      json: JSON.stringify(data),
      is_valid: isValid
    });
  }).on('end', () => {
    // Output the rows as a CSV string
    console.log('id,json,is_valid');
    outputRows.forEach(row => console.log(`${ row.id },"${ row.json }",${ row.is_valid }`));
  });