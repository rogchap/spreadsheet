import path from 'path';
import fs from 'fs';
import readline from 'readline';

import Spreadsheet from './Spreadsheet';

const args = process.argv.slice(2);

const inputFile = args[0];
const outputFile = args[1];

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
});

const rawData = [];
rl.on('line', row => {
  // This is super simplistic! Could this break??
  rawData.push(row.split(/,/));
})

rl.on('close', () => {
  const spreadsheet = new Spreadsheet(rawData);
  const computedData = spreadsheet.computeData();
  const outputStream = fs.createWriteStream(outputFile);
  computedData.forEach(row => {
    outputStream.write(row.join(',')+ '\n');
  });
  outputStream.end();
})
