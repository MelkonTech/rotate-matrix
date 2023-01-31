/**
 * Rotates input array (of integers) and returns a new array containing rotated array
 * Assumptions:
 * - the input data is valid "square" containing NxN array
 *
 * @example
 *
 * // This will import rotate function
 * // convert input array into matrix
 * // rotate the matrix
 * // using recursion loop over internal edges
 * // convert matrix into standard array
 * // return output into output variable
 * import rotate from './rotate.js';
 * const output = rotate([1,2,3,4,5,6,7,8,9])
 */


type row = number[];
type Matrix = row[];

const convertArrayToMatrix = (array: row) => {
  const matrix: Matrix = [];
  let sqrt = Math.sqrt(array.length);

  for (let i = 0; i < sqrt; i++) {
    matrix[i] = [];

    for (let j = 0; j < sqrt; j++) {
      matrix[i]![j] = array[i * sqrt + j] || 0;
    }
  }

  return matrix;
}

const convertMatrixToArray = (matrix: Matrix) => {
  const array = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      array.push(matrix[i]![j]);
    }
  }

  return array;
}

const rotateMatrix = (input: Matrix, end: number, start = 0, output = JSON.parse(JSON.stringify(input))) => {
  // for the first row
  let i = start;
  for (let j = start; j < end - 1; j++) {
    output[i][j + 1] = input[i]![j];
  }

  // for the right top to bottom
  let j = end - 1;
  for (let i = start; i < end - 1; i++) {
    output[i + 1][j] = input[i]![j];
  }

  // for the top left to right
  i = end - 1;
  for (let j = start + 1; j < end; j++) {
    output[i][j - 1] = input[i]![j];
  }

  // for the top left to right
  j = start;
  for (let i = start + 1; i < end; i++) {
    output[i - 1][j] = input[i]![j];
  }

  let new_sqrt = end - 2;
  start++;
  end--;

  // for the case of odd sqrt
  if (new_sqrt > 1) rotateMatrix(input, end, start, output);

  return output;
}

export default (input: row) => convertMatrixToArray(rotateMatrix(convertArrayToMatrix(input), Math.sqrt(input.length)));
