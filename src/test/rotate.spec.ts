import test from 'ava';
import path from 'node:path';
import { EOL } from 'node:os';
import { createReadStream, readFileSync } from 'node:fs';
import { matrixStream } from '../stream.js';

for (const inputFile of [ 'sample' ]) {
  matrixStream(path.join('fixtures', `${ inputFile }.input`));

  const output = readFileSync(path.join('fixtures', `${ inputFile }.output`), { encoding: 'utf8', flag: 'r' });

  const transformedChunks = await new Promise<readonly string[]>((resolve) => {
      const chunks: string[] = [];
      createReadStream(path.join('output.csv'), { encoding: 'utf8', autoClose: true, flags: 'r' })
        .on('data', (data) => {
          chunks.push(data + EOL);
        })
        .on('end', () => {
          resolve(chunks);
        });
    }
  );

  test(`Data File '${ inputFile }'`, async (t) => {
    t.truthy(output.trim() === transformedChunks.join('').trim());
  });
}
